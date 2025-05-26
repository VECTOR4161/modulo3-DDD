import { ProductoRepository } from "../..";
import { Producto } from "../../../Core";

interface ObtenerProductosUseCase {
  execute(): Promise<Producto[]>;
}

export class ObtenerProductos implements ObtenerProductosUseCase {
  constructor(private readonly productoRepository: ProductoRepository) {}

  async execute(): Promise<Producto[]> {
    return this.productoRepository.getAll();
  }
}
