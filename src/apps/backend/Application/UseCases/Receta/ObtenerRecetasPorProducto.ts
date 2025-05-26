import { RecetaRepository } from "../..";
import { Receta } from "../../../Core";

export class ObtenerRecetasPorProducto {
  constructor(private readonly recetaRepository: RecetaRepository) {}

  async execute(idProducto: number): Promise<Receta[]> {
    return this.recetaRepository.findByProducto(idProducto);
  }
}
