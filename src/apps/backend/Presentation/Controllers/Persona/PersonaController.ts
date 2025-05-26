import { Request, Response } from "express";
import {
  ActualizarPersona,
  CommandPublisher,
  CrearPersona,
  CreatePersonaDto,
  EliminarPersona,
  ObtenerPersona,
  ObtenerPersonas,
  PersonaRepository,
  UpdatePersonaDto,
} from "../../../Application";
import { CustomError } from "../../../Config";

export class PersonaController {
  constructor(
    private readonly personaRepository: PersonaRepository,
    private readonly commandPublisher: CommandPublisher
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  };

  savePersona = async (req: Request, res: Response) => {
    const [error, createPersonaDto] = CreatePersonaDto.create(req.body);
    if (error) {
      res.status(502).json({ error });
      return;
    }

    new CrearPersona(this.personaRepository, this.commandPublisher)
      .execute(createPersonaDto!)
      .then((data) => res.json({ data }))
      .catch((error) => this.handleError(error, res));
  };

  updatePersona = async (req: Request, res: Response) => {
    const [error, updatePersonaDto] = UpdatePersonaDto.create(req.body);
    if (error) {
      res.status(502).json({ error });
      return;
    }

    new ActualizarPersona(this.personaRepository)
      .execute(Number(req.params.id), updatePersonaDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getPersona = async (req: Request, res: Response) => {
    new ObtenerPersona(this.personaRepository)
      .execute(Number(req.params.id))
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getPersonas = async (req: Request, res: Response) => {
    new ObtenerPersonas(this.personaRepository)
      .execute()
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  deletePersona = async (req: Request, res: Response) => {
    new EliminarPersona(this.personaRepository)
      .execute(Number(req.params.id))
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };
}
