import { CreatePersonaDto, UpdatePersonaDto } from "../..";
import { Persona } from "../../../Core";

//* LOGICA DEL REPOSITORIO QUE SE CONECTARA CON EL DATASOURCE
export abstract class PersonaRepository{
    abstract save(crearPersona: CreatePersonaDto): Promise<Persona>
    abstract update(id: number, actualizarPersona: UpdatePersonaDto): Promise<Persona>
    abstract getById(id: number): Promise<Persona>
    abstract getAll(): Promise<Array<Persona>>
    abstract deleteById(id: number): Promise<void>
}