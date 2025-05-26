import { ProductoRepository } from "../..";

interface EliminarProductoUseCase {
  execute(idProducto: number): Promise<void>;
}

export class EliminarProducto implements EliminarProductoUseCase {
  constructor(private readonly productoRepository: ProductoRepository) {}

  async execute(idProducto: number): Promise<void> {
    return this.productoRepository.deleteById(idProducto);
  }
}
