import { Router } from "express";
import { PersonaRoutes } from ".";
import { ProveedorRoutes } from "./Routes/Proveedor/SaveProveedorRoute";
import { EntidadRoutes } from "./Routes/Entidad/SaveEntidadRoute";

export class AppRoutes{
    static get routes(): Router{

        const router = Router();

        router.use('/persona', PersonaRoutes.routes);

        router.use('/proveedor', ProveedorRoutes.routes);
        
       router.use('/entidad', EntidadRoutes.routes);
        
        return router;
    }
}