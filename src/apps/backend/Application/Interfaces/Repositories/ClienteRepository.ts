import { CreateClienteDto, UpdateClienteDto } from "../..";
import { Cliente } from "../../../Core";

export abstract class ClienteRepository{
    abstract save(crearCliente: CreateClienteDto): Promise<Cliente>
    abstract update(id: number, actualizarCliente: UpdateClienteDto): Promise<Cliente>
    abstract getById(id: number): Promise<Cliente>
    abstract getAll(): Promise<Array<Cliente>>
    abstract deleteById(id: number): Promise<void>
}