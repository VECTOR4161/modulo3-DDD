import { CommandPublisher, CreateProductoDto, ProductoRepository } from "../..";

interface CrearProductoUseCase {
  execute(createProductoDto: CreateProductoDto): Promise<void>;
}

export class CrearProducto implements CrearProductoUseCase {
  constructor(
    private readonly productoRepository: ProductoRepository,
    private readonly commandPublisher: CommandPublisher
  ) {}

  async execute(createProductoDto: CreateProductoDto): Promise<void> {
    const producto = await this.productoRepository.save(createProductoDto);

    await this.commandPublisher.connect();
    await this.commandPublisher.publish("producto.creado", {
      productoId: producto.id.value,
      nombre: producto.nombre.value,
      precio: producto.precio.value,
    });

    return;
  }
}
