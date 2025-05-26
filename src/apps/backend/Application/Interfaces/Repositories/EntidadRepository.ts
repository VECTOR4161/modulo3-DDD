import { CreateEntidadDto, UpdateEntidadDto } from "../..";
import { Entidad } from "../../../Core";

//* logica del repositorio
export abstract class EntidadRepository{
    abstract save(crearEntidad: CreateEntidadDto): Promise<void>
    abstract update(actualizarEntidad: UpdateEntidadDto, id: number): Promise<Entidad>
    abstract getById(id: number): Promise<Entidad>
    abstract getAll(): Promise<Array<Entidad>>
    abstract deleteById(id: number): Promise<void>
}