import { PersonaRepository, UpdatePersonaDto } from "../..";

interface UpdatePersonaUseCase{
    execute(idPersona: number, updatePersonaDto: UpdatePersonaDto): Promise<void>
}

export class ActualizarPersona implements UpdatePersonaUseCase{
    constructor(
        private readonly personaRepository: PersonaRepository
    ){}
        
    async execute(idPersona: number, updatePersonaDto: UpdatePersonaDto): Promise<void> {
        const persona = await this.personaRepository.update(idPersona, updatePersonaDto)
        return 
    }
}