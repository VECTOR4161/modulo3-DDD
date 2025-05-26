import { InsumoRepository } from "../..";

interface EliminarInsumoUseCase {
  execute(idInsumo: number): Promise<void>;
}

export class EliminarInsumo implements EliminarInsumoUseCase {
  constructor(private readonly insumoRepository: InsumoRepository) {}

  async execute(idInsumo: number): Promise<void> {
    return this.insumoRepository.deleteById(idInsumo);
  }
}
