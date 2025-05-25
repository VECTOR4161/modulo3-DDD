import { Request, Response } from "express"
import { CustomError } from "../../../Config";
import {
    ActualizarUsuario,
    CrearUsuario,
    CreateUsuarioDto,
    EliminarUsuario,
    ObtenerUsuario,
    ObtenerUsuarios,
    UpdateUsuarioDto,
    UsuarioRepository
} from "../../../Application";


export class UsuarioController {
    constructor(
        private readonly usuarioRepository: UsuarioRepository
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
    }

    saveUsuario = async (req: Request, res: Response) => {
        const [error, createUsuarioDto] = CreateUsuarioDto.create(req.body)
        if (error) {
            res.status(502).json({ error })
            return
        }

        new CrearUsuario(this.usuarioRepository)
            .execute(createUsuarioDto!)
            .then(data => res.json({ data }))
            .catch(error => this.handleError(error, res))
    }

    updateUsuario = async (req: Request, res: Response) => {
        const [error, updateUsuarioDto] = UpdateUsuarioDto.create(req.body)
        if (error) {
            res.status(502).json({ error })
            return
        }
        new ActualizarUsuario(this.usuarioRepository)
            .execute(Number(req.params.id), updateUsuarioDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))
    }

    getUsuario = async (req: Request, res: Response) => {
        new ObtenerUsuario(this.usuarioRepository)
            .execute(Number(req.params.id))
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))
    }

    getUsuarios = async (req: Request, res: Response) => {
        new ObtenerUsuarios(this.usuarioRepository)
            .execute()
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))
    }

    deleteUsuario = async (req: Request, res: Response) => {
        new EliminarUsuario(this.usuarioRepository)
            .execute(Number(req.params.id))
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))
    }
}