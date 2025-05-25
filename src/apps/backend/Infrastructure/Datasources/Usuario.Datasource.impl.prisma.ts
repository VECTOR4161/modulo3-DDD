import { CreateUsuarioDto, UpdateUsuarioDto, UsuarioDatasource } from "../../Application";
import { CustomError, filtradorDeObjetos } from "../../Config";
import { PrismaAdapter } from "../../Config/Adapters/prisma.adapter";
import { Usuario, UsuarioBorrado, UsuarioContrasena, UsuarioId, UsuarioIdPersona, UsuarioIdRol } from "../../Core";

type Usuariodb = {
    id: number;
    id_persona: number | null;
    id_rol: number | null;
    contrasena: string | null;
    fec_c: Date | null;
    fec_u: Date | null;
    borrado: boolean | null;
}

export class UsuarioDatasourceImplPrisma implements UsuarioDatasource {

    procesarUsuarioDB(usuariodb: Usuariodb): Usuario {
        return Usuario.create(
            new UsuarioId(usuariodb.id),
            new UsuarioIdPersona(usuariodb.id_persona ?? 0),
            new UsuarioIdRol(usuariodb.id_rol ?? 0),
            new UsuarioContrasena(usuariodb.contrasena ?? ''),
            new UsuarioBorrado(usuariodb.borrado!)
        )
    }

    procesarUsuarioDBFromPrimitives(usuariodb: Usuariodb): Usuario {
        return Usuario.fromPrimitives({
            id: usuariodb.id,
            idPersona: usuariodb.id_persona ?? 0,
            idRol: usuariodb.id_rol ?? 0,
            contrasena: usuariodb.contrasena ?? '',
            borrado: usuariodb.borrado!
        })
    }

    async save(crearUsuario: CreateUsuarioDto): Promise<Usuario> {
        try {
            const prisma = PrismaAdapter.crearConexion()
            const usuariodb = await prisma.usuario.create({
                data: crearUsuario
            })
            return this.procesarUsuarioDB(usuariodb)
        } catch (error) {
            if (error instanceof CustomError) throw CustomError.customizableError(error.statusCode, error.message)
            throw CustomError.badRequest('El cliente no pudo ser registrado')
        }
    }

    async update(id: number, actualizarUsuario: UpdateUsuarioDto): Promise<Usuario> {
        try {
            const usuariodb = await this.getById(id)
            const prisma = PrismaAdapter.crearConexion()
            const usuariodbActualizado = await prisma.usuario.update({
                data: {
                    id_persona: actualizarUsuario.idPersona ?? usuariodb.idPersona.value,
                    id_rol: actualizarUsuario.idRol ?? usuariodb.idRol.value,
                    contrasena: actualizarUsuario.contrasena ?? usuariodb.contrasena.value,
                    borrado: actualizarUsuario.borrado ?? usuariodb.borrado.value
                },
                where: {
                    id: id
                }
            })
            return this.procesarUsuarioDBFromPrimitives(usuariodbActualizado)
        } catch (error) {
            if (error instanceof CustomError) throw CustomError.customizableError(error.statusCode, error.message)
            throw CustomError.badRequest('El usuario no pudo ser actualizado')
        }
    }

    async getById(id: number): Promise<Usuario> {
        try {
            const prisma = PrismaAdapter.crearConexion()
            const usuariodb = await prisma.usuario.findFirst({
                where: {
                    id: id
                }
            })
            if( usuariodb == null) throw CustomError.notFound('El usuario no existe no existe')
            return this.procesarUsuarioDBFromPrimitives(usuariodb)
        } catch (error) {
            if (error instanceof CustomError) throw CustomError.customizableError(error.statusCode, error.message)
            throw CustomError.badRequest('El cliente no pudo ser encontrado')
        }
    }

    async getAll(): Promise<Array<Usuario>> {
        try {
            const prisma = PrismaAdapter.crearConexion()
            const usuariosdb = await prisma.usuario.findMany({})
            return usuariosdb.map(usuariodb => this.procesarUsuarioDBFromPrimitives(usuariodb))
        } catch (error) {
            if (error instanceof CustomError) throw CustomError.customizableError(error.statusCode, error.message)
            throw CustomError.badRequest('Error al listar a los usuarios')
        }
    }

    async deleteById(id: number): Promise<void> {
        try {
            this.getById(id)
            const prisma = PrismaAdapter.crearConexion()
            await prisma.usuario.delete({
                where: {
                    id: id
                }
            })
        } catch (error) {
            if (error instanceof CustomError) throw CustomError.customizableError(error.statusCode, error.message)
            throw CustomError.badRequest('Error al eliminar al usuario')
        }
    }
}