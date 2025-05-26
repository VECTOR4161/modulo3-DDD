import { EntidadRepository } from "..";
import { Entidad } from "../../Core";

//* interfaz
interface ObtenerEntidadPorIdUseCase{
    execute(id: number): Promise<Entidad>
}

//* obtener entidad por id
export class ObtenerEntidadPorId implements ObtenerEntidadPorIdUseCase{
    constructor(
        private readonly entidadRepository: EntidadRepository
    ){}
        
    async execute(id: number): Promise<Entidad> {
        return await this.entidadRepository.getById(id);
    }
}