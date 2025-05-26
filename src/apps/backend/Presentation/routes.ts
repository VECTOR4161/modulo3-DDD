import { Router } from "express";
import { PersonaRoutes } from "./Routes/Persona/PersonaRoutes";
import { ProductoRoutes } from "./Routes/Producto/ProductoRoutes";
import { RecetaRoutes } from "./Routes/Receta/RecetaRoutes";
import { IngredientesRecetaRoutes } from "./Routes/IngredientesReceta/IngredientesRecetaRoutes";
import { InsumoRoutes } from "./Routes/Insumo/InsumoRoutes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/persona", PersonaRoutes.routes);

    router.use("/producto", ProductoRoutes.routes);

    router.use("/receta", RecetaRoutes.routes);

    router.use("/ingredientes-receta", IngredientesRecetaRoutes.routes);

    router.use("/insumo", InsumoRoutes.routes);

    return router;
  }
}
