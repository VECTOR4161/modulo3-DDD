import { ClienteRepository } from "../.."
import { Cliente } from "../../../Core"


interface ObtenerClientesUseCase{
    execute(): Promise<Cliente[]>
}

export class ObtenerClientes implements ObtenerClientesUseCase{
    constructor(
        private readonly clienteRepository: ClienteRepository
    ){}
        
    async execute(): Promise<Cliente[]> {
        return this.clienteRepository.getAll()
    }
}