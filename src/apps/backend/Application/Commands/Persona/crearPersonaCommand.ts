export class CrearPedidoCommand {
  constructor(
    public readonly id: string,
    public readonly nombres: string,
    public readonly apellidos: { id: string; cantidad: number }[]
  ) {}
}