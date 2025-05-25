import { UsuarioRepository } from "../.."
import { Usuario } from "../../../Core"


interface ObtenerUsuariosUseCase{
    execute(): Promise<Usuario[]>
}

export class ObtenerUsuarios implements ObtenerUsuariosUseCase{
    constructor(
        private readonly usuarioRepository: UsuarioRepository
    ){}
        
    async execute(): Promise<Usuario[]> {
        return this.usuarioRepository.getAll()
    }
}