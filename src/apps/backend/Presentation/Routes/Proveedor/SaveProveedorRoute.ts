import { Router } from "express"
import { ProveedorDatasourceImplPrisma, ProveedorRepositoryImpl } from "../../../Infrastructure"
import { SaveProveedorController } from "../.."

//* clase que gestiona la ruta para guardar un proveedor
export class SaveProveedorRoute{
    static get routes(): Router{

        const router = Router()

        //* importaciones de datasources y repositorios.
        const proveedorDatasource = new ProveedorDatasourceImplPrisma()
        const proveedorRepository = new ProveedorRepositoryImpl( proveedorDatasource )
        const saveProveedorController = new SaveProveedorController( proveedorRepository )

        //* ruta del controlador
        router.post('/save', saveProveedorController.saveProveedor)
        return router
    }
}