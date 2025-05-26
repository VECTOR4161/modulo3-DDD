import { Request, Response } from "express"
import { 
    CrearEntidad, 
    CreateEntidadDto, 
    EntidadRepository 
} from "../../../Application";
import { CustomError } from "../../../Config";

//* Controlador encargado de gestionar una operación unica
export class SaveEntidadController{
    constructor(
        private readonly entidadRepository: EntidadRepository
    ){}

    //* Manejo de errores
    private handleError = ( error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
          return res.status(error.statusCode).json({ error: error.message });
        }
    }

    //* metodo del controlador
    saveEntidad = async (req: Request, res: Response) => {

        //* Validar la entrada de datos  al servidor usando el dto
        const [error, createEntidadDto] = CreateEntidadDto.create( req.body )
        if( error ) res.status(502).json({error})

        // //* Llamada del caso de uso por el controlador
        new CrearEntidad( this.entidadRepository )
            .execute(createEntidadDto!)
            .then( data => res.json({ data }))
            .catch( error => this.handleError(error, res))
    }
}