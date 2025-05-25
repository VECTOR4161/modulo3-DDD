import { PersonaRepository } from "../.."

interface EliminarPersonaUseCase{
    execute(idPersona: number): Promise<void>
}

export class EliminarPersona implements EliminarPersonaUseCase{
    constructor(
        private readonly personaRepository: PersonaRepository
    ){}
        
    async execute(idPersona: number): Promise<void> {
        return this.personaRepository.deleteById(idPersona)
    }
}