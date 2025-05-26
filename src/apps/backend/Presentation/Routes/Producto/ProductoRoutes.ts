import { Router } from "express";
import {
  ProductoDatasourceImplPrisma,
  ProductoRepositoryImpl,
  RabbitMQPublisher,
} from "../../../Infrastructure";
import { ProductoController } from "../../Controllers/Producto/ProductoController";

export class ProductoRoutes {
  static get routes(): Router {
    const router = Router();

    const commandPublisher = new RabbitMQPublisher();
    const productoDatasource = new ProductoDatasourceImplPrisma();
    const productoRepository = new ProductoRepositoryImpl(productoDatasource);
    const productoController = new ProductoController(
      productoRepository,
      commandPublisher
    );

    router.post("/", productoController.saveProducto);
    router.put("/:id", productoController.updateProducto);
    router.get("/", productoController.getProductos);
    router.get("/disponibles", productoController.getProductosDisponibles);
    router.get("/:id", productoController.getProducto);
    router.delete("/:id", productoController.deleteProducto);

    return router;
  }
}
