import { Router } from "express";
import {
  RecetaDatasourceImplPrisma,
  RecetaRepositoryImpl,
  RabbitMQPublisher,
} from "../../../Infrastructure";
import { RecetaController } from "../../Controllers/Receta/RecetaController";

export class RecetaRoutes {
  static get routes(): Router {
    const router = Router();

    const commandPublisher = new RabbitMQPublisher();
    const recetaDatasource = new RecetaDatasourceImplPrisma();
    const recetaRepository = new RecetaRepositoryImpl(recetaDatasource);
    const recetaController = new RecetaController(
      recetaRepository,
      commandPublisher
    );

    router.post("/", recetaController.saveReceta);
    router.put("/:id", recetaController.updateReceta);
    router.get("/", recetaController.getRecetas);
    router.get("/producto/:idProducto", recetaController.getRecetasPorProducto);
    router.get("/:id", recetaController.getReceta);
    router.delete("/:id", recetaController.deleteReceta);

    return router;
  }
}
