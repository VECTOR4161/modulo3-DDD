export class CreateRecetaDto {
  private constructor(public id_producto_obtenido: number) {}

  static create(object: { [key: string]: any }): [string?, CreateRecetaDto?] {
    let { id_producto_obtenido } = object;

    if (!id_producto_obtenido)
      return ["El ID del producto obtenido es requerido", undefined];
    if (!Number.isInteger(id_producto_obtenido))
      return ["El ID del producto debe ser un número entero", undefined];

    return [undefined, new CreateRecetaDto(id_producto_obtenido)];
  }
}
