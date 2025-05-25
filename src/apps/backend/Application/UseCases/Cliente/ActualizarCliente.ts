import { ClienteRepository, UpdateClienteDto } from "../.."

interface UpdateClienteUseCase{
    execute(idCliente: number, updateClienteDto: UpdateClienteDto): Promise<void>
}

export class ActualizarCliente implements UpdateClienteUseCase{
    constructor(
        private readonly clienteRepository: ClienteRepository
    ){}
        
    async execute(idCliente: number, updateClienteDto: UpdateClienteDto): Promise<void> {
        const cliente = await this.clienteRepository.update(idCliente, updateClienteDto)
        return 
    }
}