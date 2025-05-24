import { CreateUsuarioDto, UpdateUsuarioDto, UsuarioDatasource } from "../../Application";
import { Usuario } from "../../Core";


export class UsuarioDatasourceImplPrisma implements UsuarioDatasource{
    save(crearUsuario: CreateUsuarioDto): Promise<Usuario> {
        throw new Error("Method not implemented.");
    }
    update(id: number, actualizarUsuario: UpdateUsuarioDto): Promise<Usuario> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<Usuario> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Array<Usuario>> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    

}