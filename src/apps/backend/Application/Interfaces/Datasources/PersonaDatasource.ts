import { CreatePersonaDto, UpdatePersonaDto } from "../..";
import { Persona } from "../../../Core";

//* LOGICA DE LAS OPERACIONES DE LA BASE DE DATOS
export abstract class PersonaDatasource{
    abstract save(crearPersona: CreatePersonaDto): Promise<void>
    abstract update(actualizarPersona: UpdatePersonaDto): Promise<Persona>
    abstract getById(id: number): Promise<Persona>
    abstract getAll(): Promise<Array<Persona>>
    abstract deleteById(id: number): Promise<void>
}