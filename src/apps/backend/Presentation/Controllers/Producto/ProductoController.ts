import { Request, Response } from "express";
import {
  ActualizarProducto,
  CommandPublisher,
  CrearProducto,
  CreateProductoDto,
  EliminarProducto,
  ObtenerProducto,
  ObtenerProductos,
  ObtenerProductosDisponibles,
  ProductoRepository,
  UpdateProductoDto,
} from "../../../Application";
import { CustomError } from "../../../Config";

export class ProductoController {
  constructor(
    private readonly productoRepository: ProductoRepository,
    private readonly commandPublisher: CommandPublisher
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  };

  saveProducto = async (req: Request, res: Response) => {
    const [error, createProductoDto] = CreateProductoDto.create(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    new CrearProducto(this.productoRepository, this.commandPublisher)
      .execute(createProductoDto!)
      .then((data) =>
        res.status(201).json({
          message: "Producto creado exitosamente",
          data,
        })
      )
      .catch((error) => this.handleError(error, res));
  };

  updateProducto = async (req: Request, res: Response) => {
    const [error, updateProductoDto] = UpdateProductoDto.create(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID de producto inválido" });
    }

    new ActualizarProducto(this.productoRepository)
      .execute(id, updateProductoDto!)
      .then((data) =>
        res.json({
          message: "Producto actualizado exitosamente",
          data,
        })
      )
      .catch((error) => this.handleError(error, res));
  };

  getProducto = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID de producto inválido" });
    }

    new ObtenerProducto(this.productoRepository)
      .execute(id)
      .then((data) =>
        res.json({
          data: data.toPrimitives(),
        })
      )
      .catch((error) => this.handleError(error, res));
  };

  getProductos = async (req: Request, res: Response) => {
    new ObtenerProductos(this.productoRepository)
      .execute()
      .then((data) =>
        res.json({
          data: data.map((producto) => producto.toPrimitives()),
          count: data.length,
        })
      )
      .catch((error) => this.handleError(error, res));
  };

  getProductosDisponibles = async (req: Request, res: Response) => {
    new ObtenerProductosDisponibles(this.productoRepository)
      .execute()
      .then((data) =>
        res.json({
          data: data.map((producto) => producto.toPrimitives()),
          count: data.length,
        })
      )
      .catch((error) => this.handleError(error, res));
  };

  deleteProducto = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID de producto inválido" });
    }

    new EliminarProducto(this.productoRepository)
      .execute(id)
      .then((data) =>
        res.json({
          message: "Producto eliminado exitosamente",
          data,
        })
      )
      .catch((error) => this.handleError(error, res));
  };
}
