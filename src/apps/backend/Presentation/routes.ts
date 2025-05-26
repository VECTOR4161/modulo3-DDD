import { Router } from "express";
import { PersonaRoutes } from ".";
import { SaveProveedorRoute } from "./Routes/Proveedor/SaveProveedorRoute";
import { SaveEntidadRoute } from "./Routes/Entidad/SaveEntidadRoute";

export class AppRoutes{
    static get routes(): Router{

        const router = Router();

        router.use('/persona', PersonaRoutes.routes);

        router.use('/proveedor', SaveProveedorRoute.routes);
        
        router.use('/entidad', SaveEntidadRoute.routes);
        
        return router;
    }
}