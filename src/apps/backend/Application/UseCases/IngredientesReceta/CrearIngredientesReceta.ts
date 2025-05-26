import {
  CommandPublisher,
  CreateIngredientesRecetaDto,
  IngredientesRecetaRepository,
} from "../..";

interface CrearIngredientesRecetaUseCase {
  execute(
    createIngredientesRecetaDto: CreateIngredientesRecetaDto
  ): Promise<void>;
}

export class CrearIngredientesReceta implements CrearIngredientesRecetaUseCase {
  constructor(
    private readonly ingredientesRecetaRepository: IngredientesRecetaRepository,
    private readonly commandPublisher: CommandPublisher
  ) {}

  async execute(
    createIngredientesRecetaDto: CreateIngredientesRecetaDto
  ): Promise<void> {
    const ingredientesReceta = await this.ingredientesRecetaRepository.save(
      createIngredientesRecetaDto
    );

    await this.commandPublisher.connect();
    await this.commandPublisher.publish("ingredientes.receta.creado", {
      ingredientesRecetaId: ingredientesReceta.id.value,
      idReceta: ingredientesReceta.idReceta.value,
      id_insumo: ingredientesReceta.id_insumo.value,
      cantidad: ingredientesReceta.cantidad.value,
    });

    return;
  }
}
