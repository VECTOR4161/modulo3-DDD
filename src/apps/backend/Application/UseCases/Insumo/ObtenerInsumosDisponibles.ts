import { InsumoRepository } from "../..";
import { Insumo } from "../../../Core";

export class ObtenerInsumosDisponibles {
  constructor(private readonly insumoRepository: InsumoRepository) {}

  async execute(): Promise<Insumo[]> {
    return this.insumoRepository.findAvailable();
  }
}
