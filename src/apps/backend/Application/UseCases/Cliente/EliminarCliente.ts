import { ClienteRepository } from "../.."


interface EliminarClienteUseCase{
    execute(idCliente: number): Promise<void>
}

export class EliminarCliente implements EliminarClienteUseCase{
    constructor(
        private readonly clienteRepository: ClienteRepository
    ){}
        
    async execute(idCliente: number): Promise<void> {
        return this.clienteRepository.deleteById(idCliente)
    }
}