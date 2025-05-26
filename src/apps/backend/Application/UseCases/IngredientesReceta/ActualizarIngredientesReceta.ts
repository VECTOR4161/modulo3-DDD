import {
  IngredientesRecetaRepository,
  UpdateIngredientesRecetaDto,
} from "../..";

interface UpdateIngredientesRecetaUseCase {
  execute(
    idIngredientesReceta: number,
    updateIngredientesRecetaDto: UpdateIngredientesRecetaDto
  ): Promise<void>;
}

export class ActualizarIngredientesReceta
  implements UpdateIngredientesRecetaUseCase
{
  constructor(
    private readonly ingredientesRecetaRepository: IngredientesRecetaRepository
  ) {}

  async execute(
    idIngredientesReceta: number,
    updateIngredientesRecetaDto: UpdateIngredientesRecetaDto
  ): Promise<void> {
    await this.ingredientesRecetaRepository.update(
      idIngredientesReceta,
      updateIngredientesRecetaDto
    );
    return;
  }
}
