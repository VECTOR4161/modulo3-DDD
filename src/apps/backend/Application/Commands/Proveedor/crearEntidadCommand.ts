export class CrearEntidadCommand {
  constructor(
    public readonly id: string,
    public readonly idProveedor: number,
    public readonly nombre: string,
    public readonly nit: string,
    public readonly telefono: string,
    public readonly descripcion: string,
    public readonly borrado: boolean
  ) {}
}