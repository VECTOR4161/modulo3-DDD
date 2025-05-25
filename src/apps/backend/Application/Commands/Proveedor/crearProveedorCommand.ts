export class CrearProveedorCommand {
  constructor(
    public readonly id: string,
    public readonly idPersona: number,
    public readonly borrado: boolean
  ) {}
}