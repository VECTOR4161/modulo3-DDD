import { Router } from "express"
import { EntidadDatasourceImplPrisma, EntidadRepositoryImpl } from "../../../Infrastructure"
import { SaveEntidadController } from "../.."
import { GetEntidadesController } from "../../Controllers/Entidad/GetEntidadesController"

//* clase que gestiona todas las rutas de entidad
export class EntidadRoutes{
    static get routes(): Router{

        const router = Router()

        //* importaciones de datasources y repositorios.
        const entidadDatasource = new EntidadDatasourceImplPrisma()
        const entidadRepository = new EntidadRepositoryImpl( entidadDatasource )
        const saveEntidadController = new SaveEntidadController( entidadRepository )
        const getEntidadesController = new GetEntidadesController( entidadRepository )

        //* ruta del controlador
        router.post('/save', saveEntidadController.saveEntidad)
        router.get('/', getEntidadesController.getEntidades)
        //* router.get('/:id', getEntidadesController.getEntidadById)
        return router
    }
}