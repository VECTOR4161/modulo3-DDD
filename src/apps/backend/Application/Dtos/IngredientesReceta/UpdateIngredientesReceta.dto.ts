export class UpdateIngredientesRecetaDto {
  private constructor(
    public idReceta?: number,
    public cantidad?: number,
    public id_insumo?: number
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, UpdateIngredientesRecetaDto?] {
    let { idReceta, cantidad, id_insumo } = object;

    if (idReceta !== undefined) {
      if (typeof idReceta !== "number")
        return ["El ID de la receta debe ser numérico", undefined];
      if (!Number.isInteger(idReceta))
        return ["El ID de la receta debe ser un número entero", undefined];
    }

    if (cantidad !== undefined) {
      if (typeof cantidad !== "number")
        return ["La cantidad debe ser numérica", undefined];
      if (!Number.isInteger(cantidad))
        return ["La cantidad debe ser un número entero", undefined];
      if (cantidad <= 0)
        return ["La cantidad debe ser mayor a cero", undefined];
    }

    if (id_insumo !== undefined) {
      if (typeof id_insumo !== "number")
        return ["El ID del insumo debe ser numérico", undefined];
      if (!Number.isInteger(id_insumo))
        return ["El ID del insumo debe ser un número entero", undefined];
    }

    return [
      undefined,
      new UpdateIngredientesRecetaDto(idReceta, cantidad, id_insumo),
    ];
  }
}
