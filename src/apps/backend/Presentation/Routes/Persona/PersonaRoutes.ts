import { Router } from "express"
import { PersonaDatasourceImplPrisma, PersonaRepositoryImpl, RabbitMQPublisher } from "../../../Infrastructure"
import { PersonaController } from "../.."

export class PersonaRoutes{
    static get routes(): Router{

        const router = Router()


        const commandPublisher = new RabbitMQPublisher();

        const personaDatasource = new PersonaDatasourceImplPrisma()
        const personaRepository = new PersonaRepositoryImpl( personaDatasource )
        const savePersonaController = new PersonaController( personaRepository, commandPublisher )

        router.post('/', savePersonaController.savePersona)
        router.put('/:id', savePersonaController.updatePersona)
        router.get('/', savePersonaController.getPersonas)
        router.get('/:id', savePersonaController.getPersona)
        router.delete('/:id', savePersonaController.deletePersona)
        return router
    }
}