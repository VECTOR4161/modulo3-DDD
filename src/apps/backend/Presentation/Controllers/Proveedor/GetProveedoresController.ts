import { Request, Response } from "express"
import { 
    ObtenerProveedores,
    ObtenerProveedorPorId,
    ProveedorRepository 
} from "../../../Application";
import { CustomError } from "../../../Config";

//* controlador que s e encarga de gestionar la lectura de proveedores
export class GetProveedoresController{
    constructor(
        private readonly proveedorRepository: ProveedorRepository
    ){}

    //* error handler
    private handleError = ( error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
          return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error interno del servidor' });
    }

    //* obtener todos los proveedores
    getProveedores = async (req: Request, res: Response) => {
        new ObtenerProveedores( this.proveedorRepository )
            .execute()
            .then( data => res.json({ data }))
            .catch( error => this.handleError(error, res))
    }

    //* obtener proveedor por id
    getProveedorById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const providerId = parseInt(id);

        if (isNaN(providerId)) {
            return res.status(400).json({ error: 'ID de proveedor inválido' });
        }

        new ObtenerProveedorPorId( this.proveedorRepository )
            .execute(providerId)
            .then( data => res.json({ data }))
            .catch( error => this.handleError(error, res))
    }
}