import { ClienteRepository } from "../.."
import { Cliente } from "../../../Core"



interface ObtenerClienteUseCase{
    execute(idCliente: number): Promise<Cliente>
}

export class ObtenerCliente implements ObtenerClienteUseCase{
    constructor(
        private readonly clienteRepository: ClienteRepository
    ){}
        
    async execute(idCliente: number): Promise<Cliente> {
        return await this.clienteRepository.getById(idCliente)
    }
}