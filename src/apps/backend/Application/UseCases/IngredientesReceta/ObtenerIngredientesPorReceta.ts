import { IngredientesRecetaRepository } from "../..";
import { IngredientesReceta } from "../../../Core";

export class ObtenerIngredientesPorReceta {
  constructor(
    private readonly ingredientesRecetaRepository: IngredientesRecetaRepository
  ) {}

  async execute(idReceta: number): Promise<IngredientesReceta[]> {
    return this.ingredientesRecetaRepository.findByReceta(idReceta);
  }
}
