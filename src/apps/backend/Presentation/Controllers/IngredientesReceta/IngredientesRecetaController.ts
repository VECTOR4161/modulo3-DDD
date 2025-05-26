import { Request, Response } from "express";
import {
  ActualizarIngredientesReceta,
  CommandPublisher,
  CrearIngredientesReceta,
  CrearRecetaCompleta,
  CreateIngredientesRecetaDto,
  CreateRecetaCompletaDto,
  EliminarIngredientesReceta,
  IngredientesRecetaRepository,
  ObtenerIngredientesReceta,
  ObtenerIngredientesPorReceta,
  UpdateIngredientesRecetaDto,
} from "../../../Application";
import { CustomError } from "../../../Config";

export class IngredientesRecetaController {
  constructor(
    private readonly ingredientesRecetaRepository: IngredientesRecetaRepository,
    private readonly commandPublisher: CommandPublisher
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  };

  saveIngredientesReceta = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const [error, createIngredientesRecetaDto] =
      CreateIngredientesRecetaDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    new CrearIngredientesReceta(
      this.ingredientesRecetaRepository,
      this.commandPublisher
    )
      .execute(createIngredientesRecetaDto!)
      .then((data) =>
        res.status(201).json({
          message: "Ingrediente de receta creado exitosamente",
          data,
        })
      )
      .catch((error) => this.handleError(error, res));
  };

  updateIngredientesReceta = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const [error, updateIngredientesRecetaDto] =
      UpdateIngredientesRecetaDto.create(req.body);

    const id = Number(req.params.id);

    new ActualizarIngredientesReceta(this.ingredientesRecetaRepository)
      .execute(id, updateIngredientesRecetaDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getIngredientesReceta = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const id = Number(req.params.id);

    new ObtenerIngredientesReceta(this.ingredientesRecetaRepository)
      .execute(id)
      .then((data) =>
        res.json({
          data: data.toPrimitives(),
        })
      )
      .catch((error) => this.handleError(error, res));
  };

  saveRecetaCompleta = async (req: Request, res: Response): Promise<void> => {
    const [error, createRecetaCompletaDto] = CreateRecetaCompletaDto.create(
      req.body
    );

    new CrearRecetaCompleta(
      this.ingredientesRecetaRepository,
      this.commandPublisher
    )
      .execute(createRecetaCompletaDto!)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getIngredientesPorReceta = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const idReceta = Number(req.params.idReceta);

    new ObtenerIngredientesPorReceta(this.ingredientesRecetaRepository)
      .execute(idReceta)
      .then((data) =>
        res.json({
          data: data.map((ingrediente) => ingrediente.toPrimitives()),
          count: data.length,
        })
      )
      .catch((error) => this.handleError(error, res));
  };

  deleteIngredientesReceta = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const id = Number(req.params.id);

    new EliminarIngredientesReceta(this.ingredientesRecetaRepository)
      .execute(id)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };
}
