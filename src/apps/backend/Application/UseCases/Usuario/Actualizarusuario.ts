import { UpdateUsuarioDto, UsuarioRepository } from "../.."



interface UpdateUsuarioUseCase{
    execute(idUsuario: number, updateUsuarioDto: UpdateUsuarioDto): Promise<void>
}

export class ActualizarUsuario implements UpdateUsuarioUseCase{
    constructor(
        private readonly usuarioRepository: UsuarioRepository
    ){}
        
    async execute(idUsuario: number, updateUsuarioDto: UpdateUsuarioDto): Promise<void> {
        const persona = await this.usuarioRepository.update(idUsuario, updateUsuarioDto)
        return 
    }
}