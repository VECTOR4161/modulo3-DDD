import { CreatePersonaDto, PersonaDatasource, PersonaRepository, UpdatePersonaDto } from "../../Application";
import { Persona } from "../../Core";


export class PersonaRepositoryImpl implements PersonaRepository{

    constructor(
        private readonly PersonaDatasource: PersonaDatasource
    ){}

    save(crearPersona: CreatePersonaDto): Promise<void> {
        return this.PersonaDatasource.save(crearPersona)
    }
    update(actualizarPersona: UpdatePersonaDto): Promise<Persona> {
        return this.PersonaDatasource.update(actualizarPersona)
    }
    getById(id: number): Promise<Persona> {
        return this.PersonaDatasource.getById(id)
    }
    getAll(): Promise<Array<Persona>> {
        return this.PersonaDatasource.getAll()
    }
     deleteById(id: number): Promise<void> {
        return this.PersonaDatasource.deleteById(id)
    }
}