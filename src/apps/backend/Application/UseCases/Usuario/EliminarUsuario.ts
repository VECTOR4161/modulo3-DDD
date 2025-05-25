import { UsuarioRepository } from "../.."


interface EliminarUsuarioUseCase{
    execute(idUsuario: number): Promise<void>
}

export class EliminarUsuario implements EliminarUsuarioUseCase{
    constructor(
        private readonly usuarioRepository: UsuarioRepository
    ){}
        
    async execute(idUsuario: number): Promise<void> {
        return this.usuarioRepository.deleteById(idUsuario)
    }
}