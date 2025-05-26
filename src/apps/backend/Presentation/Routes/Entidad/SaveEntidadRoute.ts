import { Router } from "express"
import { EntidadDatasourceImplPrisma, EntidadRepositoryImpl } from "../../../Infrastructure"
import { SaveEntidadController } from "../.."

//* clase que gestiona la ruta para guardar una entidad
export class SaveEntidadRoute{
    static get routes(): Router{

        const router = Router()

        //* importaciones de datasources y repositorios.
        const entidadDatasource = new EntidadDatasourceImplPrisma()
        const entidadRepository = new EntidadRepositoryImpl( entidadDatasource )
        const saveEntidadController = new SaveEntidadController( entidadRepository )

        //* ruta del controlador
        router.post('/save', saveEntidadController.saveEntidad)
        return router
    }
}