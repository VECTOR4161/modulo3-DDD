import { Request, Response } from "express";
import {
  ActualizarInsumo,
  CommandPublisher,
  CrearInsumo,
  CreateInsumoDto,
  EliminarInsumo,
  ObtenerInsumo,
  ObtenerInsumos,
  ObtenerInsumosDisponibles,
  InsumoRepository,
  UpdateInsumoDto,
} from "../../../Application";
import { CustomError } from "../../../Config";

export class InsumoController {
  constructor(
    private readonly insumoRepository: InsumoRepository,
    private readonly commandPublisher: CommandPublisher
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  };

  saveInsumo = async (req: Request, res: Response): Promise<void> => {
    const [error, createInsumoDto] = CreateInsumoDto.create(req.body);

    new CrearInsumo(this.insumoRepository, this.commandPublisher)
      .execute(createInsumoDto!)
      .then((data) =>
        res.status(201).json({
          message: "Insumo creado exitosamente",
          data,
        })
      )
      .catch((error) => this.handleError(error, res));
  };

  updateInsumo = async (req: Request, res: Response): Promise<void> => {
    const [error, updateInsumoDto] = UpdateInsumoDto.create(req.body);

    const id = Number(req.params.id);

    new ActualizarInsumo(this.insumoRepository)
      .execute(id, updateInsumoDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getInsumo = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    new ObtenerInsumo(this.insumoRepository)
      .execute(id)
      .then((data) =>
        res.json({
          data: data.toPrimitives(),
        })
      )
      .catch((error) => this.handleError(error, res));
  };

  getInsumos = async (req: Request, res: Response): Promise<void> => {
    new ObtenerInsumos(this.insumoRepository)
      .execute()
      .then((data) =>
        res.json({
          data: data.map((insumo) => insumo.toPrimitives()),
          count: data.length,
        })
      )
      .catch((error) => this.handleError(error, res));
  };

  getInsumosDisponibles = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    new ObtenerInsumosDisponibles(this.insumoRepository)
      .execute()
      .then((data) =>
        res.json({
          data: data.map((insumo) => insumo.toPrimitives()),
          count: data.length,
        })
      )
      .catch((error) => this.handleError(error, res));
  };

  deleteInsumo = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    new EliminarInsumo(this.insumoRepository)
      .execute(id)
      .then((data) =>
        res.json({
          message: "Insumo eliminado exitosamente",
          data,
        })
      )
      .catch((error) => this.handleError(error, res));
  };
}
