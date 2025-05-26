export class UpdateRecetaDto {
  private constructor(public id_producto_obtenido?: number) {}

  static create(object: { [key: string]: any }): [string?, UpdateRecetaDto?] {
    let { id_producto_obtenido } = object;

    if (id_producto_obtenido !== undefined) {
      if (typeof id_producto_obtenido !== "number")
        return ["El ID del producto debe ser numérico", undefined];
      if (!Number.isInteger(id_producto_obtenido))
        return ["El ID del producto debe ser un número entero", undefined];
    }

    return [undefined, new UpdateRecetaDto(id_producto_obtenido)];
  }
}
