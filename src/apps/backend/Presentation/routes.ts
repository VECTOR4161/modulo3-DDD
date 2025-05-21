import { Router } from "express";
import { SavePersonaRoute } from "./Routes/Persona/SavePersonaRoute";

//* MANEJADOR DE LAS RUTAS DE FORMA CENTRALIZADA
export class AppRoutes{
    static get routes(): Router{

        const router = Router();

        //* MANEJADOR DE LAS RUTAS DE PERSONA
        router.use('/persona', SavePersonaRoute.routes);
        
        return router;
    }
}