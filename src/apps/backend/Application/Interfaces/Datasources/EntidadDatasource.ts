import { CreateEntidadDto, UpdateEntidadDto } from "../..";
import { Entidad } from "../../../Core";

//* LOGICA DE LAS OPERACIONES DE LA BASE DE DATOS
export abstract class EntidadDatasource{
    abstract save(crearEntidad: CreateEntidadDto): Promise<void>
    abstract update(actualizarEntidad: UpdateEntidadDto): Promise<Entidad>
    abstract getById(id: number): Promise<Entidad>
    abstract getAll(): Promise<Array<Entidad>>
    abstract deleteById(id: number): Promise<void>
}