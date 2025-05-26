import {
  CommandPublisher,
  CreateRecetaCompletaDto,
  IngredientesRecetaRepository,
} from "../..";

interface CrearRecetaCompletaUseCase {
  execute(createRecetaCompleta: CreateRecetaCompletaDto): Promise<void>;
}

export class CrearRecetaCompleta implements CrearRecetaCompletaUseCase {
  constructor(
    private readonly ingredientesRecetaRepository: IngredientesRecetaRepository,
    private readonly commandPublisher: CommandPublisher
  ) {}

  async execute(createRecetaCompleta: CreateRecetaCompletaDto): Promise<void> {
    await this.ingredientesRecetaRepository.saveRecetaCompleta(
      createRecetaCompleta
    );

    await this.commandPublisher.connect();
    await this.commandPublisher.publish("receta.completa.creada", {
      idProductoObtenido: createRecetaCompleta.idProductoObtenido,
      ingredientes: createRecetaCompleta.ingredientes,
    });

    return;
  }
}
