import { ClienteDatasource, CreateClienteDto, UpdateClienteDto } from "../../Application";
import { CustomError, filtradorDeObjetos } from "../../Config";
import { PrismaAdapter } from "../../Config/Adapters/prisma.adapter";
import { Cliente, ClienteBorrado, ClienteId, ClienteIdPersona } from "../../Core";

type Clientedb = {
    id: number;
    id_persona: number | null;
    fec_c: Date | null;
    fec_u: Date | null;
    borrado: boolean | null;
}


export class ClienteDatasourceImplPrisma implements ClienteDatasource{

    procesarClienteDB(clientedb: Clientedb): Cliente {
        return Cliente.create(
            new ClienteId(clientedb.id),
            new ClienteIdPersona(clientedb.id_persona ?? 0),
            new ClienteBorrado(clientedb.borrado!)
        )
    }

    procesarClienteDBFromPrimitives(clientedb: Clientedb): Cliente{
        return Cliente.fromPrimitives({
            id: clientedb.id,
            idPersona: clientedb.id_persona ?? 0,
            borrado: clientedb.borrado! 
        })
    }

    async save(crearCliente: CreateClienteDto): Promise<Cliente> {
        try {
            const prisma = PrismaAdapter.crearConexion()
            const clientedb = await prisma.cliente.create({
                data: crearCliente
            })
            return this.procesarClienteDB(clientedb)
        } catch (error) {
            if (error instanceof CustomError) throw CustomError.customizableError(error.statusCode, error.message)
            throw CustomError.badRequest('El cliente no pudo ser registrado')
        }
    }

    async update(id: number, actualizarCliente: UpdateClienteDto): Promise<Cliente> {
        try {
            const prisma = PrismaAdapter.crearConexion()
            const clientedb = await this.getById(id)
            const clienteActualizadodb = await prisma.cliente.update({
                data: {
                    id_persona: actualizarCliente.idPersona ?? clientedb.idPersona.value,
                    borrado: actualizarCliente.borrado ?? clientedb.borrado.value
                }, 
                where: {
                    id: id
                }
            })
            return this.procesarClienteDBFromPrimitives(clienteActualizadodb)
        } catch (error) {
            if (error instanceof CustomError) throw CustomError.customizableError(error.statusCode, error.message)
            throw CustomError.badRequest('El cliente no pudo ser actualizado')
        }
    }

    async getById(id: number): Promise<Cliente> {
        try {
            const prisma = PrismaAdapter.crearConexion()
            const clientedb = await prisma.cliente.findFirst({
                where: {
                    id: id
                }
            })
            if( clientedb == null) throw CustomError.notFound('El cliente no existe')
            return this.procesarClienteDBFromPrimitives(clientedb)
        } catch (error) {
            if (error instanceof CustomError) throw CustomError.customizableError(error.statusCode, error.message)
            throw CustomError.badRequest('El cliente no pudo ser encontrado')
        }
    }

    async getAll(): Promise<Array<Cliente>> {
        try {
            const prisma = PrismaAdapter.crearConexion()
            const clientesdb = await prisma.cliente.findMany({})
            return clientesdb.map(clientedb => this.procesarClienteDBFromPrimitives(clientedb))
        } catch (error) {
            if (error instanceof CustomError) throw CustomError.customizableError(error.statusCode, error.message)
            throw CustomError.badRequest('Error al listar clientes')
        }
    }

    async deleteById(id: number): Promise<void> {
        try {
            this.getById(id)
            const prisma = PrismaAdapter.crearConexion()
            await prisma.cliente.delete({
                where: {
                    id: id
                }
            })
        } catch (error) {
            if (error instanceof CustomError) throw CustomError.customizableError(error.statusCode, error.message)
            throw CustomError.badRequest('Error al eliminar al cliente')
        }
    }

}