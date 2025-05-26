export class CreateInsumoDto {
  private constructor(
    public nombre: string,
    public precio: number,
    public unidades: number
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateInsumoDto?] {
    let { nombre, precio, unidades } = object;

    if (!nombre) return ["El nombre del insumo es requerido", undefined];
    if (precio === undefined || precio === null)
      return ["El precio del insumo es requerido", undefined];
    if (unidades === undefined || unidades === null)
      return ["Las unidades del insumo son requeridas", undefined];

    if (nombre.length > 100)
      return [
        "El nombre del insumo no puede exceder 100 caracteres",
        undefined,
      ];
    if (precio < 0) return ["El precio no puede ser negativo", undefined];
    if (unidades < 0)
      return ["Las unidades no pueden ser negativas", undefined];
    if (!Number.isInteger(unidades))
      return ["Las unidades deben ser un número entero", undefined];

    return [undefined, new CreateInsumoDto(nombre, precio, unidades)];
  }
}
