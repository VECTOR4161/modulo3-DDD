import { UsuarioRepository } from "../.."
import { Usuario } from "../../../Core"


interface ObtenerUsuarioUseCase{
    execute(idUsuario: number): Promise<Usuario>
}

export class ObtenerUsuario implements ObtenerUsuarioUseCase{
    constructor(
        private readonly usuarioRepository: UsuarioRepository
    ){}
        
    async execute(idUsuario: number): Promise<Usuario> {
        return await this.usuarioRepository.getById(idUsuario)
    }
}