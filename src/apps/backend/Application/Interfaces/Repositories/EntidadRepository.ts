import { CreateEntidadDto, UpdateEntidadDto } from "../..";
import { Entidad } from "../../../Core";

//* LOGICA DEL REPOSITORIO QUE SE CONECTARA CON EL DATASOURCE
export abstract class EntidadRepository{
    abstract save(crearEntidad: CreateEntidadDto): Promise<void>
    abstract update(actualizarEntidad: UpdateEntidadDto): Promise<Entidad>
    abstract getById(id: number): Promise<Entidad>
    abstract getAll(): Promise<Array<Entidad>>
    abstract deleteById(id: number): Promise<void>
}