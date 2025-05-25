import { Router } from "express";
import { PersonaRoutes } from ".";

export class AppRoutes{
    static get routes(): Router{

        const router = Router();

        router.use('/persona', PersonaRoutes.routes);
        
        return router;
    }
}