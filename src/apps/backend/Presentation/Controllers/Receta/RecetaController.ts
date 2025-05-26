import { Request, Response } from "express";
import {
  ActualizarReceta,
  CommandPublisher,
  CrearReceta,
  CreateRecetaDto,
  EliminarReceta,
  ObtenerReceta,
  ObtenerRecetas,
  ObtenerRecetasPorProducto,
  RecetaRepository,
  UpdateRecetaDto,
} from "../../../Application";
import { CustomError } from "../../../Config";

export class RecetaController {
  constructor(
    private readonly recetaRepository: RecetaRepository,
    private readonly commandPublisher: CommandPublisher
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  };

  saveReceta = async (req: Request, res: Response): Promise<void> => {
    const [error, createRecetaDto] = CreateRecetaDto.create(req.body);

    new CrearReceta(this.recetaRepository, this.commandPublisher)
      .execute(createRecetaDto!)
      .then((data) =>
        res.status(201).json({
          message: "Receta creada exitosamente",
          data,
        })
      )
      .catch((error) => this.handleError(error, res));
  };

  updateReceta = async (req: Request, res: Response): Promise<void> => {
    const [error, updateRecetaDto] = UpdateRecetaDto.create(req.body);

    const id = Number(req.params.id);

    new ActualizarReceta(this.recetaRepository)
      .execute(id, updateRecetaDto!)
      .then((data) =>
        res.json({
          message: "Receta actualizada exitosamente",
          data,
        })
      )
      .catch((error) => this.handleError(error, res));
  };

  getReceta = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    new ObtenerReceta(this.recetaRepository)
      .execute(id)
      .then((data) =>
        res.json({
          data: data.toPrimitives(),
        })
      )
      .catch((error) => this.handleError(error, res));
  };

  getRecetas = async (req: Request, res: Response): Promise<void> => {
    new ObtenerRecetas(this.recetaRepository)
      .execute()
      .then((data) =>
        res.json({
          data: data.map((receta) => receta.toPrimitives()),
          count: data.length,
        })
      )
      .catch((error) => this.handleError(error, res));
  };

  getRecetasPorProducto = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const idProducto = Number(req.params.idProducto);

    new ObtenerRecetasPorProducto(this.recetaRepository)
      .execute(idProducto)
      .then((data) =>
        res.json({
          data: data.map((receta) => receta.toPrimitives()),
          count: data.length,
        })
      )
      .catch((error) => this.handleError(error, res));
  };

  deleteReceta = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    new EliminarReceta(this.recetaRepository)
      .execute(id)
      .then((data) =>
        res.json({
          message: "Receta eliminada exitosamente",
          data,
        })
      )
      .catch((error) => this.handleError(error, res));
  };
}
