import { RecetaRepository } from "../..";
import { Receta } from "../../../Core";

interface ObtenerRecetasUseCase {
  execute(): Promise<Receta[]>;
}

export class ObtenerRecetas implements ObtenerRecetasUseCase {
  constructor(private readonly recetaRepository: RecetaRepository) {}

  async execute(): Promise<Receta[]> {
    return this.recetaRepository.getAll();
  }
}
