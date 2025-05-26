import { CreateProveedorDto, ProveedorDatasource, UpdateProveedorDto } from "../../Application";
import { Proveedor } from "../../Core";
import { PrismaAdapter } from "../../Config/Adapters/prisma.adapter";
import { CustomError } from "../../Config";

export class ProveedorDatasourceImplPrisma implements ProveedorDatasource{
    
    private readonly prisma = PrismaAdapter.crearConexion();

    async save(crearProveedor: CreateProveedorDto): Promise<void> {
        try {
            await this.prisma.proveedores.create({
                data: {
                    id_persona: crearProveedor.idPersona,
                    borrado: crearProveedor.borrado,
                    fec_c: new Date(),
                    fec_u: new Date()
                }
            });
        } catch (error) {
            console.error('Error al crear proveedor:', error);
            throw CustomError.internalServer('Error al crear el proveedor');
        }
    }

    async update(actualizarProveedor: UpdateProveedorDto, id: number): Promise<Proveedor> {
        try {
            // Verificar que el proveedor existe
            const proveedorExiste = await this.prisma.proveedores.findUnique({
                where: { id }
            });

            if (!proveedorExiste) {
                throw CustomError.notFound('Proveedor no encontrado');
            }

            // Actualizar el proveedor
            const proveedorActualizado = await this.prisma.proveedores.update({
                where: { id },
                data: {
                    ...(actualizarProveedor.idPersona && { id_persona: actualizarProveedor.idPersona }),
                    ...(actualizarProveedor.borrado !== undefined && { borrado: actualizarProveedor.borrado }),
                    fec_u: new Date()
                }
            });

            // Convertir a entidad de dominio
            return Proveedor.fromPrimitives({
                id: proveedorActualizado.id,
                idPersona: proveedorActualizado.id_persona || 0,
                borrado: proveedorActualizado.borrado || false
            });

        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.error('Error al actualizar proveedor:', error);
            throw CustomError.internalServer('Error al actualizar el proveedor');
        }
    }

    async getById(id: number): Promise<Proveedor> {
        try {
            const proveedor = await this.prisma.proveedores.findUnique({
                where: { id },
                include: {
                    persona: true // Incluir datos de la persona relacionada
                }
            });

            if (!proveedor) {
                throw CustomError.notFound('Proveedor no encontrado');
            }

            return Proveedor.fromPrimitives({
                id: proveedor.id,
                idPersona: proveedor.id_persona || 0,
                borrado: proveedor.borrado || false
            });

        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.error('Error al obtener proveedor:', error);
            throw CustomError.internalServer('Error al obtener el proveedor');
        }
    }

    async getAll(): Promise<Array<Proveedor>> {
        try {
            const proveedores = await this.prisma.proveedores.findMany({
                where: {
                    borrado: false // Solo obtener proveedores no borrados
                },
                include: {
                    persona: true
                },
                orderBy: {
                    fec_c: 'desc'
                }
            });

            return proveedores.map(proveedor => 
                Proveedor.fromPrimitives({
                    id: proveedor.id,
                    idPersona: proveedor.id_persona || 0,
                    borrado: proveedor.borrado || false
                })
            );

        } catch (error) {
            console.error('Error al obtener proveedores:', error);
            throw CustomError.internalServer('Error al obtener los proveedores');
        }
    }

    async deleteById(id: number): Promise<void> {
        try {
            // Verificar que el proveedor existe
            const proveedorExiste = await this.prisma.proveedores.findUnique({
                where: { id }
            });

            if (!proveedorExiste) {
                throw CustomError.notFound('Proveedor no encontrado');
            }

            // Soft delete - marcar como borrado
            await this.prisma.proveedores.update({
                where: { id },
                data: {
                    borrado: true,
                    fec_u: new Date()
                }
            });

        } catch (error) {
            if (error instanceof CustomError) throw error;
            console.error('Error al eliminar proveedor:', error);
            throw CustomError.internalServer('Error al eliminar el proveedor');
        }
    }
}