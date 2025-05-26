import { CommandPublisher, CreateInsumoDto, InsumoRepository } from "../..";

interface CrearInsumoUseCase {
  execute(createInsumoDto: CreateInsumoDto): Promise<void>;
}

export class CrearInsumo implements CrearInsumoUseCase {
  constructor(
    private readonly insumoRepository: InsumoRepository,
    private readonly commandPublisher: CommandPublisher
  ) {}

  async execute(createInsumoDto: CreateInsumoDto): Promise<void> {
    const insumo = await this.insumoRepository.save(createInsumoDto);

    await this.commandPublisher.connect();
    await this.commandPublisher.publish("insumo.creado", {
      insumoId: insumo.id.value,
      nombre: insumo.nombre.value,
      precio: insumo.precio.value,
    });

    return;
  }
}
