import { CreateUsuarioDto, UsuarioRepository } from "../.."


interface CrearUsuarioUseCase{
    execute(createUsuarioDto: CreateUsuarioDto): Promise<void>
}

export class CrearUsuario implements CrearUsuarioUseCase{
    constructor(
        private readonly usuarioRepository: UsuarioRepository
    ){}
        
    async execute(createUsuarioDto: CreateUsuarioDto): Promise<void> {
        const usuario = await this.usuarioRepository.save(createUsuarioDto)
        return 
    }
}