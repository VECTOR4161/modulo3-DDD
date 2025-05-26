import { CreateEntidadDto, UpdateEntidadDto } from "../..";
import { Entidad } from "../../../Core";

//* Logica de las operaciones de la base de datos
export abstract class EntidadDatasource{
    abstract save(crearEntidad: CreateEntidadDto): Promise<void>
    abstract update(actualizarEntidad: UpdateEntidadDto, id: number): Promise<Entidad>
    abstract getById(id: number): Promise<Entidad>
    abstract getAll(): Promise<Array<Entidad>>
    abstract deleteById(id: number): Promise<void>
}