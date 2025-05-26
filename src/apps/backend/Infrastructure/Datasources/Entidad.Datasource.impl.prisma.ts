import { CreateEntidadDto, EntidadDatasource, UpdateEntidadDto } from "../../Application";
import { Entidad } from "../../Core";
import { PrismaAdapter } from "../../Config/Adapters/prisma.adapter";
import { CustomError } from "../../Config";

export class EntidadDatasourceImplPrisma implements EntidadDatasource{
    
    private readonly prisma = PrismaAdapter.crearConexion();

    async save(crearEntidad: CreateEntidadDto): Promise<void> {
        try {
            // Verificar que el proveedor existe
            const proveedorExiste = await this.prisma.proveedores.findUnique({
                where: { id: crearEntidad.idProveedor }
            });

            if (!proveedorExiste) {
                throw CustomError.badRequest('El proveedor especificado no existe');
            }

            await this.prisma.entidades.create({
                data: {
                    id_proveedor: crearEntidad.idProveedor,
                    nombre: crearEntidad.nombre,
                    nit: crearEntidad.nit,
                    telefono: crearEntidad.telefono,
                    descripcion: crearEntidad.descripcion,
                    borrado: crearEntidad.borrado,
                    fec_c: new Date(),
                    fec_u: new Date()
                }
            });
        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.error('Error al crear entidad:', error);
            throw CustomError.internalServer('Error al crear la entidad');
        }
    }

    async update(actualizarEntidad: UpdateEntidadDto, id: number): Promise<Entidad> {
        try {
            // Verificar que la entidad existe
            const entidadExiste = await this.prisma.entidades.findUnique({
                where: { id }
            });

            if (!entidadExiste) {
                throw CustomError.notFound('Entidad no encontrada');
            }

            // Si se va a cambiar el proveedor, verificar que existe
            if (actualizarEntidad.idProveedor) {
                const proveedorExiste = await this.prisma.proveedores.findUnique({
                    where: { id: actualizarEntidad.idProveedor }
                });

                if (!proveedorExiste) {
                    throw CustomError.badRequest('El proveedor especificado no existe');
                }
            }

            // Actualizar la entidad
            const entidadActualizada = await this.prisma.entidades.update({
                where: { id },
                data: {
                    ...(actualizarEntidad.idProveedor && { id_proveedor: actualizarEntidad.idProveedor }),
                    ...(actualizarEntidad.nombre && { nombre: actualizarEntidad.nombre }),
                    ...(actualizarEntidad.nit && { nit: actualizarEntidad.nit }),
                    ...(actualizarEntidad.telefono && { telefono: actualizarEntidad.telefono }),
                    ...(actualizarEntidad.descripcion && { descripcion: actualizarEntidad.descripcion }),
                    ...(actualizarEntidad.borrado !== undefined && { borrado: actualizarEntidad.borrado }),
                    fec_u: new Date()
                }
            });

            // Convertir a entidad de dominio
            return Entidad.fromPrimitives({
                id: entidadActualizada.id,
                idProveedor: entidadActualizada.id_proveedor || 0,
                nombre: entidadActualizada.nombre || '',
                nit: entidadActualizada.nit || '',
                telefono: entidadActualizada.telefono || '',
                descripcion: entidadActualizada.descripcion || '',
                borrado: entidadActualizada.borrado || false
            });

        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.error('Error al actualizar entidad:', error);
            throw CustomError.internalServer('Error al actualizar la entidad');
        }
    }

    async getById(id: number): Promise<Entidad> {
        try {
            const entidad = await this.prisma.entidades.findUnique({
                where: { id },
                include: {
                    proveedores: { // Incluir datos del proveedor relacionado
                        include: {
                            persona: true // Y la persona del proveedor
                        }
                    }
                }
            });

            if (!entidad) {
                throw CustomError.notFound('Entidad no encontrada');
            }

            return Entidad.fromPrimitives({
                id: entidad.id,
                idProveedor: entidad.id_proveedor || 0,
                nombre: entidad.nombre || '',
                nit: entidad.nit || '',
                telefono: entidad.telefono || '',
                descripcion: entidad.descripcion || '',
                borrado: entidad.borrado || false
            });

        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.error('Error al obtener entidad:', error);
            throw CustomError.internalServer('Error al obtener la entidad');
        }
    }

    async getAll(): Promise<Array<Entidad>> {
        try {
            const entidades = await this.prisma.entidades.findMany({
                where: {
                    borrado: false // Solo obtener entidades no borradas
                },
                include: {
                    proveedores: {
                        include: {
                            persona: true
                        }
                    }
                },
                orderBy: {
                    fec_c: 'desc'
                }
            });

            return entidades.map(entidad => 
                Entidad.fromPrimitives({
                    id: entidad.id,
                    idProveedor: entidad.id_proveedor || 0,
                    nombre: entidad.nombre || '',
                    nit: entidad.nit || '',
                    telefono: entidad.telefono || '',
                    descripcion: entidad.descripcion || '',
                    borrado: entidad.borrado || false
                })
            );

        } catch (error) {
            console.error('Error al obtener entidades:', error);
            throw CustomError.internalServer('Error al obtener las entidades');
        }
    }

    async deleteById(id: number): Promise<void> {
        try {
            // Verificar que la entidad existe
            const entidadExiste = await this.prisma.entidades.findUnique({
                where: { id }
            });

            if (!entidadExiste) {
                throw CustomError.notFound('Entidad no encontrada');
            }

            // Soft delete - marcar como borrado
            await this.prisma.entidades.update({
                where: { id },
                data: {
                    borrado: true,
                    fec_u: new Date()
                }
            });

        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.error('Error al eliminar entidad:', error);
            throw CustomError.internalServer('Error al eliminar la entidad');
        }
    }
}