import { InsumoRepository } from "../..";
import { Insumo } from "../../../Core";

interface ObtenerInsumosUseCase {
    execute(): Promise<Insumo[]>;
}

export class ObtenerInsumos implements ObtenerInsumosUseCase {
    constructor(
        private readonly insumoRepository: InsumoRepository
    ) {}

    async execute(): Promise<Insumo[]> {
        return this.insumoRepository.getAll();
    }
}