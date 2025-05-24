import { CreateUsuarioDto, UpdateUsuarioDto, UsuarioDatasource, UsuarioRepository } from "../../Application";
import { Usuario } from "../../Core";

export class UsuarioRepositoryImpl implements UsuarioRepository{
    constructor(
        private readonly usuarioDatasource: UsuarioDatasource 
    ){}
    save(crearUsuario: CreateUsuarioDto): Promise<Usuario> {
        return this.usuarioDatasource.save(crearUsuario)
    }
    update(id: number, actualizarUsuario: UpdateUsuarioDto): Promise<Usuario> {
        return this.usuarioDatasource.update(id, actualizarUsuario)
    }
    getById(id: number): Promise<Usuario> {
        return this.usuarioDatasource.getById(id)
    }
    getAll(): Promise<Array<Usuario>> {
        return this.usuarioDatasource.getAll()
    }
    deleteById(id: number): Promise<void> {
        return this.usuarioDatasource.deleteById(id)
    }
}