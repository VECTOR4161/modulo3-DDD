export class UpdateInsumoDto {
  private constructor(
    public nombre?: string,
    public precio?: number,
    public unidades?: number,
    public idProveedor?: number
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateInsumoDto?] {
    let { nombre, precio, unidades, idProveedor } = object;

    if (nombre !== undefined) {
      if (typeof nombre !== "string")
        return ["El nombre debe ser texto", undefined];
      if (nombre.length > 100)
        return ["El nombre no puede exceder 100 caracteres", undefined];
      if (nombre.trim().length === 0)
        return ["El nombre no puede estar vacío", undefined];
    }

    if (precio !== undefined) {
      if (typeof precio !== "number")
        return ["El precio debe ser numérico", undefined];
      if (precio < 0) return ["El precio no puede ser negativo", undefined];
    }

    if (unidades !== undefined) {
      if (typeof unidades !== "number")
        return ["Las unidades deben ser numéricas", undefined];
      if (unidades < 0)
        return ["Las unidades no pueden ser negativas", undefined];
      if (!Number.isInteger(unidades))
        return ["Las unidades deben ser un número entero", undefined];
    }

    if (idProveedor !== undefined) {
      if (typeof idProveedor !== "number")
        return ["El ID del proveedor debe ser numérico", undefined];
      if (!Number.isInteger(idProveedor))
        return ["El ID del proveedor debe ser un número entero", undefined];
    }

    return [
      undefined,
      new UpdateInsumoDto(nombre, precio, unidades, idProveedor),
    ];
  }
}
