import { Request, Response } from "express"
import { 
    ObtenerEntidades,
    ObtenerEntidadPorId,
    EntidadRepository 
} from "../../../Application";
import { CustomError } from "../../../Config";

//* controlador que se encarga de la lectura de entidades
export class GetEntidadesController{
    constructor(
        private readonly entidadRepository: EntidadRepository
    ){}

    //* errores
    private handleError = ( error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
          return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error interno del servidor' });
    }

    //* obtener todas las entidades
    getEntidades = async (req: Request, res: Response) => {
        new ObtenerEntidades( this.entidadRepository )
            .execute()
            .then( data => res.json({ data }))
            .catch( error => this.handleError(error, res))
    }

    //* obtener entidades por id
    getEntidadById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const entidadId = parseInt(id);

        if (isNaN(entidadId)) {
            return res.status(400).json({ error: 'ID de entidad inválido' });
        }

        new ObtenerEntidadPorId( this.entidadRepository )
            .execute(entidadId)
            .then( data => res.json({ data }))
            .catch( error => this.handleError(error, res))
    }
}