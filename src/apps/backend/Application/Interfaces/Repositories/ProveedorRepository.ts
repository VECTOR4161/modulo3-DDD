import { CreateProveedorDto, UpdateProveedorDto } from "../..";
import { Proveedor } from "../../../Core";

//* logica del repositorio
export abstract class ProveedorRepository{
    abstract save(crearProveedor: CreateProveedorDto): Promise<void>
    abstract update(actualizarProveedor: UpdateProveedorDto): Promise<Proveedor>
    abstract getById(id: number): Promise<Proveedor>
    abstract getAll(): Promise<Array<Proveedor>>
    abstract deleteById(id: number): Promise<void>
}