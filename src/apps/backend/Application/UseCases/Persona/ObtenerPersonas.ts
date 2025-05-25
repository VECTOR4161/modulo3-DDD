import { PersonaRepository } from "../.."
import { Persona } from "../../../Core"

interface ObtenerPersonasUseCase{
    execute(): Promise<Persona[]>
}

export class ObtenerPersonas implements ObtenerPersonasUseCase{
    constructor(
        private readonly personaRepository: PersonaRepository
    ){}
        
    async execute(): Promise<Persona[]> {
        return this.personaRepository.getAll()
    }
}