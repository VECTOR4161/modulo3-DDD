import { InsumoRepository, UpdateInsumoDto } from "../..";

interface UpdateInsumoUseCase {
  execute(id_insumo: number, updateInsumoDto: UpdateInsumoDto): Promise<void>;
}

export class ActualizarInsumo implements UpdateInsumoUseCase {
  constructor(private readonly insumoRepository: InsumoRepository) {}

  async execute(
    id_insumo: number,
    updateInsumoDto: UpdateInsumoDto
  ): Promise<void> {
    await this.insumoRepository.update(id_insumo, updateInsumoDto);
    return;
  }
}
