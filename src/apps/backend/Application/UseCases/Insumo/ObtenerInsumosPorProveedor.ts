import { InsumoRepository } from "../..";
import { Insumo } from "../../../Core";

export class ObtenerInsumosPorProveedor {
    constructor(
        private readonly insumoRepository: InsumoRepository
    ) {}

    async execute(idProveedor: number): Promise<Insumo[]> {
        return this.insumoRepository.findByProveedor(idProveedor);
    }
}