import { CommandPublisher, CreateRecetaDto, RecetaRepository } from "../..";

interface CrearRecetaUseCase {
  execute(createRecetaDto: CreateRecetaDto): Promise<void>;
}

export class CrearReceta implements CrearRecetaUseCase {
  constructor(
    private readonly recetaRepository: RecetaRepository,
    private readonly commandPublisher: CommandPublisher
  ) {}

  async execute(createRecetaDto: CreateRecetaDto): Promise<void> {
    const receta = await this.recetaRepository.save(createRecetaDto);

    await this.commandPublisher.connect();
    await this.commandPublisher.publish("receta.creada", {
      recetaId: receta.id.value,
      id_producto_obtenido: receta.id_producto_obtenido.value,
    });

    return;
  }
}
