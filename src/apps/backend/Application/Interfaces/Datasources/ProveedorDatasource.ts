import { CreateProveedorDto, UpdateProveedorDto } from "../..";
import { Proveedor } from "../../../Core";

//* Operaciones de la base de datos
export abstract class ProveedorDatasource{
    abstract save(crearProveedor: CreateProveedorDto): Promise<void>
    abstract update(actualizarProveedor: UpdateProveedorDto): Promise<Proveedor>
    abstract getById(id: number): Promise<Proveedor>
    abstract getAll(): Promise<Array<Proveedor>>
    abstract deleteById(id: number): Promise<void>
}