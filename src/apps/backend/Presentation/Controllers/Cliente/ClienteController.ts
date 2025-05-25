import { Request, Response } from "express"
import {
    ActualizarCliente,
    ClienteRepository,
    CrearCliente,
    CreateClienteDto,
    EliminarCliente,
    ObtenerCliente,
    ObtenerClientes,
    UpdateClienteDto
} from "../../../Application";
import { CustomError } from "../../../Config";


export class ClienteController {
    constructor(
        private readonly clienteRepository: ClienteRepository
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
    }

    saveCliente = async (req: Request, res: Response) => {
        const [error, createClienteDto] = CreateClienteDto.create(req.body)
        if (error) {
            res.status(502).json({ error })
            return
        }

        new CrearCliente(this.clienteRepository)
            .execute(createClienteDto!)
            .then(data => res.json({ data }))
            .catch(error => this.handleError(error, res))
    }

    updateCliente = async (req: Request, res: Response) => {
        const [error, updateClienteDto] = UpdateClienteDto.create(req.body)
        if (error) {
            res.status(502).json({ error })
            return
        }
        new ActualizarCliente(this.clienteRepository)
            .execute(Number(req.params.id), updateClienteDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))
    }

    getCliente = async (req: Request, res: Response) => {
        new ObtenerCliente(this.clienteRepository)
            .execute(Number(req.params.id))
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))
    }

    getClientes = async (req: Request, res: Response) => {
        new ObtenerClientes(this.clienteRepository)
            .execute()
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))
    }

    deleteCliente = async (req: Request, res: Response) => {
            new EliminarCliente(this.clienteRepository)
                .execute(Number(req.params.id))
                .then( data => res.json( data ))
                .catch( error => this.handleError(error, res))
    }
}