import {
  AggregateRoot,
  IngredientesRecetaId,
  IngredientesRecetaIdReceta,
  IngredientesRecetaCantidad,
  IngredientesRecetaIdInsumo,
  IngredientesRecetaCreadoDomainEvent,
} from "..";

export class IngredientesReceta extends AggregateRoot {
  readonly id: IngredientesRecetaId;
  readonly idReceta: IngredientesRecetaIdReceta;
  readonly cantidad: IngredientesRecetaCantidad;
  readonly id_insumo: IngredientesRecetaIdInsumo;

  constructor(
    id: IngredientesRecetaId,
    idReceta: IngredientesRecetaIdReceta,
    cantidad: IngredientesRecetaCantidad,
    id_insumo : IngredientesRecetaIdInsumo
  ) {
    super();
    this.id = id;
    this.idReceta = idReceta;
    this.cantidad = cantidad;
    this.id_insumo = id_insumo;
  }

  static create(
    id: IngredientesRecetaId,
    idReceta: IngredientesRecetaIdReceta,
    cantidad: IngredientesRecetaCantidad,
    id_insumo: IngredientesRecetaIdInsumo
  ): IngredientesReceta {
    const ingredientesReceta = new IngredientesReceta(
      id,
      idReceta,
      cantidad,
      id_insumo
    );

    ingredientesReceta.record(
      new IngredientesRecetaCreadoDomainEvent({
        aggregateId: ingredientesReceta.id.toString(),
        id: ingredientesReceta.id.value,
        idReceta: ingredientesReceta.idReceta.value,
        cantidad: ingredientesReceta.cantidad.value,
        id_insumo: ingredientesReceta.id_insumo.value,
      })
    );

    return ingredientesReceta;
  }

  static fromPrimitives(plainData: {
    id: number;
    idReceta: number;
    cantidad: number;
    id_insumo: number;
  }): IngredientesReceta {
    return new IngredientesReceta(
      new IngredientesRecetaId(plainData.id),
      new IngredientesRecetaIdReceta(plainData.idReceta),
      new IngredientesRecetaCantidad(plainData.cantidad),
      new IngredientesRecetaIdInsumo(plainData.id_insumo)
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      idReceta: this.idReceta.value,
      cantidad: this.cantidad.value,
      id_insumo: this.id_insumo.value,
    };
  }

  actualizarCantidad(nuevaCantidad: IngredientesRecetaCantidad): void {
    Object.assign(this, { cantidad: nuevaCantidad });
  }
}
