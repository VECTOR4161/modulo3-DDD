import { ProductoRepository, UpdateProductoDto } from "../..";

interface UpdateProductoUseCase {
  execute(
    idProducto: number,
    updateProductoDto: UpdateProductoDto
  ): Promise<void>;
}

export class ActualizarProducto implements UpdateProductoUseCase {
  constructor(private readonly productoRepository: ProductoRepository) {}

  async execute(
    idProducto: number,
    updateProductoDto: UpdateProductoDto
  ): Promise<void> {
    await this.productoRepository.update(idProducto, updateProductoDto);
    return;
  }
}
