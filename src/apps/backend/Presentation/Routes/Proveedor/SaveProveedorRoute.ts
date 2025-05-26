import { Router } from "express"
import { ProveedorDatasourceImplPrisma, ProveedorRepositoryImpl } from "../../../Infrastructure"
import { SaveProveedorController } from "../.."
import { GetProveedoresController } from "../../Controllers/Proveedor/GetProveedoresController"

//* clase que gestiona todas las rutas del proveedor
export class ProveedorRoutes{
    static get routes(): Router{

        const router = Router()

        //* importaciones de datasources y repositorios.
        const proveedorDatasource = new ProveedorDatasourceImplPrisma()
        const proveedorRepository = new ProveedorRepositoryImpl( proveedorDatasource )
        const saveProveedorController = new SaveProveedorController( proveedorRepository )
        const getProveedoresController = new GetProveedoresController( proveedorRepository )

        //* rutas operaciones crud
        router.post('/save', saveProveedorController.saveProveedor)
        router.get('/', getProveedoresController.getProveedores)
        //* router.get('/:id', getProveedoresController.getProveedorById)
        
        return router
    }
}