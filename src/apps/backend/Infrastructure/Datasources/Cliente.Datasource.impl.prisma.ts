import { ClienteDatasource, CreateClienteDto, UpdateClienteDto } from "../../Application";
import { Cliente } from "../../Core";


export class ClienteDatasourceImplPrisma implements ClienteDatasource{
    save(crearCliente: CreateClienteDto): Promise<Cliente> {
        throw new Error("Method not implemented.");
    }
    update(id: number, actualizarCliente: UpdateClienteDto): Promise<Cliente> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<Cliente> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Array<Cliente>> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}