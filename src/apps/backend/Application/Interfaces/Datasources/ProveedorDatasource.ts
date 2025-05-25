import { CreateProveedorDto, UpdateProveedorDto } from "../..";
import { Proveedor } from "../../../Core";

//* LOGICA DE LAS OPERACIONES DE LA BASE DE DATOS
export abstract class ProveedorDatasource{
    abstract save(crearProveedor: CreateProveedorDto): Promise<void>
    abstract update(actualizarProveedor: UpdateProveedorDto): Promise<Proveedor>
    abstract getById(id: number): Promise<Proveedor>
    abstract getAll(): Promise<Array<Proveedor>>
    abstract deleteById(id: number): Promise<void>
}