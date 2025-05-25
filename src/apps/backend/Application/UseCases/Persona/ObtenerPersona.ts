import { PersonaRepository } from "../..";
import { Persona } from "../../../Core";

interface ObtenerPersonaUseCase{
    execute(idPersona: number): Promise<Persona>
}

export class ObtenerPersona implements ObtenerPersonaUseCase{
    constructor(
        private readonly personaRepository: PersonaRepository
    ){}
        
    async execute(idPersona: number): Promise<Persona> {
        return await this.personaRepository.getById(idPersona)
    }
}