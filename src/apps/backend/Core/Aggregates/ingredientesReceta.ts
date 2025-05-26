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
  readonly idInsumo: IngredientesRecetaIdInsumo;

  constructor(
    id: IngredientesRecetaId,
    idReceta: IngredientesRecetaIdReceta,
    cantidad: IngredientesRecetaCantidad,
    idInsumo: IngredientesRecetaIdInsumo
  ) {
    super();
    this.id = id;
    this.idReceta = idReceta;
    this.cantidad = cantidad;
    this.idInsumo = idInsumo;
  }

  static create(
    id: IngredientesRecetaId,
    idReceta: IngredientesRecetaIdReceta,
    cantidad: IngredientesRecetaCantidad,
    idInsumo: IngredientesRecetaIdInsumo
  ): IngredientesReceta {
    const ingredientesReceta = new IngredientesReceta(
      id,
      idReceta,
      cantidad,
      idInsumo
    );

    ingredientesReceta.record(
      new IngredientesRecetaCreadoDomainEvent({
        aggregateId: ingredientesReceta.id.toString(),
        id: ingredientesReceta.id.value,
        idReceta: ingredientesReceta.idReceta.value,
        cantidad: ingredientesReceta.cantidad.value,
        idInsumo: ingredientesReceta.idInsumo.value,
      })
    );

    return ingredientesReceta;
  }

  static fromPrimitives(plainData: {
    id: number;
    idReceta: number;
    cantidad: number;
    idInsumo: number;
  }): IngredientesReceta {
    return new IngredientesReceta(
      new IngredientesRecetaId(plainData.id),
      new IngredientesRecetaIdReceta(plainData.idReceta),
      new IngredientesRecetaCantidad(plainData.cantidad),
      new IngredientesRecetaIdInsumo(plainData.idInsumo)
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      idReceta: this.idReceta.value,
      cantidad: this.cantidad.value,
      idInsumo: this.idInsumo.value,
    };
  }

  actualizarCantidad(nuevaCantidad: IngredientesRecetaCantidad): void {
    Object.assign(this, { cantidad: nuevaCantidad });
  }
}
