export class CreateProductoDto {
  private constructor(
    public nombre: string,
    public descripcion: string,
    public precio: number,
    public stock: number,
    public borrado: boolean
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductoDto?] {
    let { nombre, descripcion, precio, stock, borrado } = object;

    if (!nombre) return ["El nombre del producto es requerido", undefined];
    if (!descripcion)
      return ["La descripción del producto es requerida", undefined];
    if (precio === undefined || precio === null)
      return ["El precio del producto es requerido", undefined];
    if (stock === undefined || stock === null)
      return ["El stock del producto es requerido", undefined];

    if (nombre.length > 100)
      return [
        "El nombre del producto no puede exceder 100 caracteres",
        undefined,
      ];
    if (descripcion.length > 500)
      return ["La descripción no puede exceder 500 caracteres", undefined];
    if (precio < 0) return ["El precio no puede ser negativo", undefined];
    if (stock < 0) return ["El stock no puede ser negativo", undefined];
    if (!Number.isInteger(stock))
      return ["El stock debe ser un número entero", undefined];

    if (borrado === undefined) borrado = false;

    return [
      undefined,
      new CreateProductoDto(nombre, descripcion, precio, stock, borrado),
    ];
  }
}
