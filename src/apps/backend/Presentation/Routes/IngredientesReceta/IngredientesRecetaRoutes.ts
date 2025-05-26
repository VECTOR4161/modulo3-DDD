import { Router } from "express";
import {
  IngredientesRecetaDatasourceImplPrisma,
  IngredientesRecetaRepositoryImpl,
  RabbitMQPublisher,
} from "../../../Infrastructure";
import { IngredientesRecetaController } from "../../Controllers/IngredientesReceta/IngredientesRecetaController";

export class IngredientesRecetaRoutes {
  static get routes(): Router {
    const router = Router();

    const commandPublisher = new RabbitMQPublisher();
    const ingredientesRecetaDatasource =
      new IngredientesRecetaDatasourceImplPrisma();
    const ingredientesRecetaRepository = new IngredientesRecetaRepositoryImpl(
      ingredientesRecetaDatasource
    );
    const ingredientesRecetaController = new IngredientesRecetaController(
      ingredientesRecetaRepository,
      commandPublisher
    );

    router.post("/", ingredientesRecetaController.saveIngredientesReceta);
    router.put("/:id", ingredientesRecetaController.updateIngredientesReceta);
    router.get("/:id", ingredientesRecetaController.getIngredientesReceta);
    router.post("/receta-completa", ingredientesRecetaController.saveRecetaCompleta);
    router.get("/receta/:idReceta", ingredientesRecetaController.getIngredientesPorReceta);
    router.delete("/:id", ingredientesRecetaController.deleteIngredientesReceta);

    return router;
  }
}
