import { Router } from "express";
import { PersonaRoutes } from "./Routes/Persona/PersonaRoutes";
import { ProductoRoutes } from "./Routes/Producto/ProductoRoutes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/persona", PersonaRoutes.routes);

    router.use("/producto", ProductoRoutes.routes);

    return router;
  }
}
