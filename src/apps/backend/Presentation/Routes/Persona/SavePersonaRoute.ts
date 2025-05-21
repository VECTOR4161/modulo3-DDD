import { Router } from "express"
import { PersonaDatasourceImplPrisma, PersonaRepositoryImpl } from "../../../Infrastructure"
import { SavePersonaController } from "../.."


//* CLASE QUE GESTIONA LA RUTA PARA GUARDAR UNA PERSONA
export class SavePersonaRoute{
    static get routes(): Router{

        const router = Router()

        //* IMPORTACIONES DE DATASOURCE Y REPOSITORIO IMPLEMENTADOS.
        const personaDatasource = new PersonaDatasourceImplPrisma()
        const personaRepository = new PersonaRepositoryImpl( personaDatasource )
        const savePersonaController = new SavePersonaController( personaRepository )

        //* RUTA PARA EL CONTROLADOR
        router.post('/save', savePersonaController.savePersona)
        return router
    }
}