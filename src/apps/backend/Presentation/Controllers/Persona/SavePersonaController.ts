import { Request, Response } from "express"
import { 
    CrearPersona, 
    CreatePersonaDto, 
    PersonaRepository 
} from "../../../Application";
import { CustomError } from "../../../Config";


//* CONTROLADOR ENCARGADO DE GESTIONAR UNA UNICA OPERACION
export class SavePersonaController{
    constructor(
        private readonly personaRepository: PersonaRepository
    ){}

    //* MANEJADOR DE ERRORES 
    private handleError = ( error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
          return res.status(error.statusCode).json({ error: error.message });
        }
    }

    //* METODO DEL CONTROLADOR
    savePersona = async (req: Request, res: Response) => {

        //* USO DEL DTO PARA VALIDAR LA ENTRADA DE DATOS AL SERVIDOR
        const [error, createPersonaDto] = CreatePersonaDto.create( req.body )
        if( error ) res.status(502).json({error})

        // //* LLAMADA DEL CASO DE USO POR PARTE DEL CONTROLADOR
        new CrearPersona( this.personaRepository )
            .execute(createPersonaDto!)
            .then( data => res.json({ data }))
            .catch( error => this.handleError(error, res))
    }
}
