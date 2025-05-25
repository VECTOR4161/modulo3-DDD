import { Router } from "express"
import { UsuarioDatasourceImplPrisma, UsuarioRepositoryImpl } from "../../../Infrastructure"
import { UsuarioController } from "../.."

export class UsuarioRoutes{
    static get routes(): Router{

        const router = Router()

        const usuarioDatasource = new UsuarioDatasourceImplPrisma()
        const usuarioRepository = new UsuarioRepositoryImpl( usuarioDatasource )
        const usuarioController = new UsuarioController( usuarioRepository )

        router.post('/', usuarioController.saveUsuario)
        router.put('/:id', usuarioController.updateUsuario)
        router.get('/', usuarioController.getUsuarios)
        router.get('/:id', usuarioController.getUsuario)
        router.delete('/:id', usuarioController.deleteUsuario)
        return router
    }
}