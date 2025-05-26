export class CreateRecetaCompletaDto {
  private constructor(
    public id_producto_obtenido: number,
    public ingredientes: Array<{ id_insumo: number; cantidad: number }>
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, CreateRecetaCompletaDto?] {
    let { id_producto_obtenido, ingredientes } = object;

    if (!id_producto_obtenido)
      return ["El ID del producto obtenido es requerido", undefined];
    if (!ingredientes || !Array.isArray(ingredientes))
      return ["Los ingredientes deben ser un array", undefined];
    if (ingredientes.length === 0)
      return ["Debe incluir al menos un ingrediente", undefined];

    if (!Number.isInteger(id_producto_obtenido))
      return ["El ID del producto debe ser un número entero", undefined];

    for (let i = 0; i < ingredientes.length; i++) {
      const ingrediente = ingredientes[i];
      if (!ingrediente.id_insumo)
        return [`El ingrediente ${i + 1} debe tener idInsumo`, undefined];
      if (ingrediente.cantidad === undefined || ingrediente.cantidad === null)
        return [`El ingrediente ${i + 1} debe tener cantidad`, undefined];
      if (!Number.isInteger(ingrediente.id_insumo))
        return [
          `El idInsumo del ingrediente ${i + 1} debe ser un número entero`,
          undefined,
        ];
      if (!Number.isInteger(ingrediente.cantidad))
        return [
          `La cantidad del ingrediente ${i + 1} debe ser un número entero`,
          undefined,
        ];
      if (ingrediente.cantidad <= 0)
        return [
          `La cantidad del ingrediente ${i + 1} debe ser mayor a cero`,
          undefined,
        ];
    }

    return [
      undefined,
      new CreateRecetaCompletaDto(id_producto_obtenido, ingredientes),
    ];
  }
}
