import { RecetaRepository } from "../..";

interface EliminarRecetaUseCase {
  execute(idReceta: number): Promise<void>;
}

export class EliminarReceta implements EliminarRecetaUseCase {
  constructor(private readonly recetaRepository: RecetaRepository) {}

  async execute(idReceta: number): Promise<void> {
    return this.recetaRepository.deleteById(idReceta);
  }
}
