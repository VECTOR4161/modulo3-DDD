import { ProductoRepository } from "../..";
import { Producto } from "../../../Core";

interface ObtenerProductoUseCase {
  execute(idProducto: number): Promise<Producto>;
}

export class ObtenerProducto implements ObtenerProductoUseCase {
  constructor(private readonly productoRepository: ProductoRepository) {}

  async execute(idProducto: number): Promise<Producto> {
    return await this.productoRepository.getById(idProducto);
  }
}
