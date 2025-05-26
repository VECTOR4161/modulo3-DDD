import { Router } from "express";
import {
  InsumoDatasourceImplPrisma,
  InsumoRepositoryImpl,
  RabbitMQPublisher,
} from "../../../Infrastructure";
import { InsumoController } from "../../Controllers/Insumo/InsumoController";

export class InsumoRoutes {
  static get routes(): Router {
    const router = Router();

    const commandPublisher = new RabbitMQPublisher();
    const insumoDatasource = new InsumoDatasourceImplPrisma();
    const insumoRepository = new InsumoRepositoryImpl(insumoDatasource);
    const insumoController = new InsumoController(
      insumoRepository,
      commandPublisher
    );

    router.post("/", insumoController.saveInsumo);
    router.put("/:id", insumoController.updateInsumo);
    router.get("/", insumoController.getInsumos);
    router.get("/disponibles", insumoController.getInsumosDisponibles);
    router.get("/:id", insumoController.getInsumo);
    router.delete("/:id", insumoController.deleteInsumo);

    return router;
  }
}
