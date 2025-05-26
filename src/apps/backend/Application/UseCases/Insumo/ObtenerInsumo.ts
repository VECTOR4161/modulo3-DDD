import { InsumoRepository } from "../..";
import { Insumo } from "../../../Core";

interface ObtenerInsumoUseCase {
  execute(id_insumo: number): Promise<Insumo>;
}

export class ObtenerInsumo implements ObtenerInsumoUseCase {
  constructor(private readonly insumoRepository: InsumoRepository) {}

  async execute(id_insumo: number): Promise<Insumo> {
    return await this.insumoRepository.getById(id_insumo);
  }
}
