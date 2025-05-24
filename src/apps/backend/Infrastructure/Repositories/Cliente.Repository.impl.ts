import { ClienteDatasource, ClienteRepository, CreateClienteDto, UpdateClienteDto } from "../../Application";
import { Cliente } from "../../Core";

export class ClienteRepositoryImpl implements ClienteRepository{
    constructor(
        private readonly clienteDatasource: ClienteDatasource
    ){}
    save(crearCliente: CreateClienteDto): Promise<Cliente> {
        return this.clienteDatasource.save(crearCliente)
    }
    update(id: number, actualizarCliente: UpdateClienteDto): Promise<Cliente> {
        return this.clienteDatasource.update(id, actualizarCliente)
    }
    getById(id: number): Promise<Cliente> {
        return this.clienteDatasource.getById(id)
    }
    getAll(): Promise<Array<Cliente>> {
        return this.clienteDatasource.getAll()
    }
    deleteById(id: number): Promise<void> {
        return this.clienteDatasource.deleteById(id)
    }

}