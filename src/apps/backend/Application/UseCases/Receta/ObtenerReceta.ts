import { RecetaRepository } from "../..";
import { Receta } from "../../../Core";

interface ObtenerRecetaUseCase {
  execute(idReceta: number): Promise<Receta>;
}

export class ObtenerReceta implements ObtenerRecetaUseCase {
  constructor(private readonly recetaRepository: RecetaRepository) {}

  async execute(idReceta: number): Promise<Receta> {
    return await this.recetaRepository.getById(idReceta);
  }
}
