import { Router } from "express"
import { 
    ClienteDatasourceImplPrisma, 
    ClienteRepositoryImpl 
} from "../../../Infrastructure"
import { ClienteController } from "../.."

export class ClienteRoutes{
    static get routes(): Router{

        const router = Router()

        const clienteDatasource = new ClienteDatasourceImplPrisma()
        const clienteRepository = new ClienteRepositoryImpl( clienteDatasource )
        const clienteController = new ClienteController( clienteRepository )

        router.post('/', clienteController.saveCliente)
        router.put('/:id', clienteController.updateCliente)
        router.get('/', clienteController.getClientes)
        router.get('/:id', clienteController.getCliente)
        router.delete('/:id', clienteController.deleteCliente)
        return router
    }
}