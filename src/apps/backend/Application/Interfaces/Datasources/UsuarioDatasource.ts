import { CreateUsuarioDto, UpdateUsuarioDto } from "../..";
import { Usuario } from "../../../Core";

export abstract class UsuarioDatasource{
    abstract save(crearUsuario: CreateUsuarioDto): Promise<Usuario>
    abstract update(id: number, actualizarUsuario: UpdateUsuarioDto): Promise<Usuario>
    abstract getById(id: number): Promise<Usuario>
    abstract getAll(): Promise<Array<Usuario>>
    abstract deleteById(id: number): Promise<void>
}