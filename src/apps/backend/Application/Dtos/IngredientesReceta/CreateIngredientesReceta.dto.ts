export class CreateIngredientesRecetaDto {
  private constructor(
    public idReceta: number,
    public cantidad: number,
    public idInsumo: number
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, CreateIngredientesRecetaDto?] {
    let { idReceta, cantidad, idInsumo } = object;

    if (!idReceta) return ["El ID de la receta es requerido", undefined];
    if (cantidad === undefined || cantidad === null)
      return ["La cantidad es requerida", undefined];
    if (!idInsumo) return ["El ID del insumo es requerido", undefined];

    if (!Number.isInteger(idReceta))
      return ["El ID de la receta debe ser un número entero", undefined];
    if (!Number.isInteger(cantidad))
      return ["La cantidad debe ser un número entero", undefined];
    if (!Number.isInteger(idInsumo))
      return ["El ID del insumo debe ser un número entero", undefined];
    if (cantidad <= 0) return ["La cantidad debe ser mayor a cero", undefined];

    return [
      undefined,
      new CreateIngredientesRecetaDto(idReceta, cantidad, idInsumo),
    ];
  }
}
