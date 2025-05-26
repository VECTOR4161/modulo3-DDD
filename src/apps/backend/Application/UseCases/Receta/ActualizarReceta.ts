import { RecetaRepository, UpdateRecetaDto } from "../..";

interface UpdateRecetaUseCase {
  execute(idReceta: number, updateRecetaDto: UpdateRecetaDto): Promise<void>;
}

export class ActualizarReceta implements UpdateRecetaUseCase {
  constructor(private readonly recetaRepository: RecetaRepository) {}

  async execute(
    idReceta: number,
    updateRecetaDto: UpdateRecetaDto
  ): Promise<void> {
    await this.recetaRepository.update(idReceta, updateRecetaDto);
    return;
  }
}
