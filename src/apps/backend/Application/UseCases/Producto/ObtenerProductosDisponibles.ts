import { ProductoRepository } from "../..";
import { Producto } from "../../../Core";

export class ObtenerProductosDisponibles {
  constructor(private readonly productoRepository: ProductoRepository) {}

  async execute(): Promise<Producto[]> {
    return this.productoRepository.findAvailable();
  }
}
