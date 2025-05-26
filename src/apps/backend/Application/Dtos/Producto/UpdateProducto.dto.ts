export class UpdateProductoDto {
  private constructor(
    public nombre?: string,
    public descripcion?: string,
    public precio?: number,
    public stock?: number,
    public borrado?: boolean
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateProductoDto?] {
    let { nombre, descripcion, precio, stock, borrado } = object;

    if (nombre !== undefined) {
      if (typeof nombre !== "string")
        return ["El nombre debe ser texto", undefined];
      if (nombre.length > 100)
        return ["El nombre no puede exceder 100 caracteres", undefined];
      if (nombre.trim().length === 0)
        return ["El nombre no puede estar vacío", undefined];
    }

    if (descripcion !== undefined) {
      if (typeof descripcion !== "string")
        return ["La descripción debe ser texto", undefined];
      if (descripcion.length > 500)
        return ["La descripción no puede exceder 500 caracteres", undefined];
    }

    if (precio !== undefined) {
      if (typeof precio !== "number")
        return ["El precio debe ser numérico", undefined];
      if (precio < 0) return ["El precio no puede ser negativo", undefined];
    }

    if (stock !== undefined) {
      if (typeof stock !== "number")
        return ["El stock debe ser numérico", undefined];
      if (stock < 0) return ["El stock no puede ser negativo", undefined];
      if (!Number.isInteger(stock))
        return ["El stock debe ser un número entero", undefined];
    }

    if (borrado !== undefined) {
      if (typeof borrado !== "boolean")
        return ["El borrado debe ser booleano", undefined];
    }

    return [
      undefined,
      new UpdateProductoDto(nombre, descripcion, precio, stock, borrado),
    ];
  }
}
