import { IngredientesRecetaRepository } from "../..";

interface EliminarIngredientesRecetaUseCase {
  execute(idIngredientesReceta: number): Promise<void>;
}

export class EliminarIngredientesReceta
  implements EliminarIngredientesRecetaUseCase
{
  constructor(
    private readonly ingredientesRecetaRepository: IngredientesRecetaRepository
  ) {}

  async execute(idIngredientesReceta: number): Promise<void> {
    return this.ingredientesRecetaRepository.deleteById(idIngredientesReceta);
  }
}
