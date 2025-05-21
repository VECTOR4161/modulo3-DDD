import { CreatePersonaDto, PersonaDatasource, UpdatePersonaDto } from "../../Application";
import { Persona } from "../../Core";

export class PersonaDatasourceImplPrisma implements PersonaDatasource{
    async save(crearPersona: CreatePersonaDto): Promise<void> {
        return
    }
    async update(actualizarPersona: UpdatePersonaDto): Promise<Persona> {
        throw new Error("Method not implemented.")
    }
    getById(id: number): Promise<Persona> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Array<Persona>> {
        throw new Error("Method not implemented.");
    }
     deleteById(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}