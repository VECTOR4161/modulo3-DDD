export class UpdateRecetaDto {
  private constructor(public idProductoObtenido?: number) {}

  static create(object: { [key: string]: any }): [string?, UpdateRecetaDto?] {
    let { idProductoObtenido } = object;

    if (idProductoObtenido !== undefined) {
      if (typeof idProductoObtenido !== "number")
        return ["El ID del producto debe ser numérico", undefined];
      if (!Number.isInteger(idProductoObtenido))
        return ["El ID del producto debe ser un número entero", undefined];
    }

    return [undefined, new UpdateRecetaDto(idProductoObtenido)];
  }
}
