import { InsumoRepository, UpdateInsumoDto } from "../..";

interface UpdateInsumoUseCase {
  execute(idInsumo: number, updateInsumoDto: UpdateInsumoDto): Promise<void>;
}

export class ActualizarInsumo implements UpdateInsumoUseCase {
  constructor(private readonly insumoRepository: InsumoRepository) {}

  async execute(
    idInsumo: number,
    updateInsumoDto: UpdateInsumoDto
  ): Promise<void> {
    await this.insumoRepository.update(idInsumo, updateInsumoDto);
    return;
  }
}
