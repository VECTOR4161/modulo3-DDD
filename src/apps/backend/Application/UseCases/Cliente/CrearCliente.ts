import { ClienteRepository, CreateClienteDto } from "../..";


interface CrearClienteUseCase{
    execute(createClienteDto: CreateClienteDto): Promise<void>
}

export class CrearCliente implements CrearClienteUseCase{
    constructor(
        private readonly clienteRepository: ClienteRepository
    ){}
        
    async execute(createClienteDto: CreateClienteDto): Promise<void> {
        const cliente = await this.clienteRepository.save(createClienteDto)
        return 
    }
}