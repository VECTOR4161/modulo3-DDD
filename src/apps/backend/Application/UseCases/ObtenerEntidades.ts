import { EntidadRepository } from "..";
import { Entidad } from "../../Core";

//* interfaz
interface ObtenerEntidadesUseCase{
    execute(): Promise<Array<Entidad>>
}

//* obtener todas las entidades
export class ObtenerEntidades implements ObtenerEntidadesUseCase{
    constructor(
        private readonly entidadRepository: EntidadRepository
    ){}
        
    async execute(): Promise<Array<Entidad>> {
        return await this.entidadRepository.getAll();
    }
}