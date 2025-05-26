import { InsumoRepository } from "../..";

interface EliminarInsumoUseCase {
  execute(id_insumo: number): Promise<void>;
}

export class EliminarInsumo implements EliminarInsumoUseCase {
  constructor(private readonly insumoRepository: InsumoRepository) {}

  async execute(id_insumo: number): Promise<void> {
    return this.insumoRepository.deleteById(id_insumo);
  }
}
