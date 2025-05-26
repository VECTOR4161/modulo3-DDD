import { Request, Response } from "express"
import { 
    CrearProveedor, 
    CreateProveedorDto, 
    ProveedorRepository 
} from "../../../Application";
import { CustomError } from "../../../Config";

//* Controlador encargado de gestionar una operación unica
export class SaveProveedorController{
    constructor(
        private readonly proveedorRepository: ProveedorRepository
    ){}

    //* Manejo de errores 
    private handleError = ( error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
          return res.status(error.statusCode).json({ error: error.message });
        }
    }

    //* metodo del controlador
    saveProveedor = async (req: Request, res: Response): Promise<void> => {

        //* Validar la entrada de datos  al servidor usando el dto
        const [error, createProveedorDto] = CreateProveedorDto.create( req.body )
        if( error ) res.status(502).json({error})

        // //* Llamada del caso de uso por el controlador
        new CrearProveedor( this.proveedorRepository )
            .execute(createProveedorDto!)
            .then( data => res.json({ data }))
            .catch( error => this.handleError(error, res))
    }
}