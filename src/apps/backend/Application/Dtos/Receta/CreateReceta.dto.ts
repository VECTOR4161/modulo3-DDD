export class CreateRecetaDto {
  private constructor(public idProductoObtenido: number) {}

  static create(object: { [key: string]: any }): [string?, CreateRecetaDto?] {
    let { idProductoObtenido } = object;

    if (!idProductoObtenido)
      return ["El ID del producto obtenido es requerido", undefined];
    if (!Number.isInteger(idProductoObtenido))
      return ["El ID del producto debe ser un número entero", undefined];

    return [undefined, new CreateRecetaDto(idProductoObtenido)];
  }
}
