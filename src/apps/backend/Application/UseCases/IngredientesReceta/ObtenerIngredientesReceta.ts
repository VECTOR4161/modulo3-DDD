import { IngredientesRecetaRepository } from "../..";
import { IngredientesReceta } from "../../../Core";

interface ObtenerIngredientesRecetaUseCase {
  execute(idIngredientesReceta: number): Promise<IngredientesReceta>;
}

export class ObtenerIngredientesReceta
  implements ObtenerIngredientesRecetaUseCase
{
  constructor(
    private readonly ingredientesRecetaRepository: IngredientesRecetaRepository
  ) {}

  async execute(idIngredientesReceta: number): Promise<IngredientesReceta> {
    return await this.ingredientesRecetaRepository.getById(
      idIngredientesReceta
    );
  }
}
