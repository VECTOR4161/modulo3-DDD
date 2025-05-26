import {
  CreateProductoDto,
  ProductoDatasource,
  UpdateProductoDto,
} from "../../Application";
import { CustomError, filtradorDeObjetos } from "../../Config";
import { PrismaAdapter } from "../../Config/Adapters/prisma.adapter";
import {
  Producto,
  ProductoBorrado,
  ProductoDescripcion,
  ProductoId,
  ProductoNombre,
  ProductoPrecio,
  ProductoStock,
} from "../../Core";

export class ProductoDatasourceImplPrisma implements ProductoDatasource {
  async save(crearProducto: CreateProductoDto): Promise<Producto> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      const productodb = await prisma.producto.create({
        data: {
          nombre: crearProducto.nombre,
          descripcion: crearProducto.descripcion,
          precio: crearProducto.precio,
          stock: crearProducto.stock,
          borrado: crearProducto.borrado,
        },
      });

      const producto = Producto.create(
        new ProductoId(productodb.id),
        new ProductoNombre(productodb.nombre),
        new ProductoDescripcion(productodb.descripcion),
        new ProductoPrecio(Number(productodb.precio)),
        new ProductoStock(productodb.stock),
        new ProductoBorrado(productodb.borrado)
      );

      return producto;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("El producto no pudo ser registrado");
    }
  }

  async update(
    id: number,
    actualizarProducto: UpdateProductoDto
  ): Promise<Producto> {
    try {
      let productoFiltrado = filtradorDeObjetos.filtrarDto(actualizarProducto);

      const prisma = PrismaAdapter.crearConexion();

      const productodb = await prisma.producto.update({
        data: productoFiltrado,
        where: {
          id: id,
        },
      });

      const producto = Producto.create(
        new ProductoId(productodb.id),
        new ProductoNombre(productodb.nombre),
        new ProductoDescripcion(productodb.descripcion),
        new ProductoPrecio(Number(productodb.precio)),
        new ProductoStock(productodb.stock),
        new ProductoBorrado(productodb.borrado)
      );

      return producto;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("El producto no pudo ser actualizado");
    }
  }

  async getById(id: number): Promise<Producto> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      const productodb = await prisma.producto.findFirst({
        where: {
          id: id,
        },
      });

      const producto = Producto.fromPrimitives({
        id: productodb.id,
        nombre: productodb.nombre,
        descripcion: productodb.descripcion,
        precio: Number(productodb.precio),
        stock: productodb.stock,
        borrado: productodb.borrado,
      });

      return producto;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("Error al obtener el producto");
    }
  }

  async getAll(): Promise<Array<Producto>> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      const productosdb = await prisma.producto.findMany({
        where: {
          borrado: false,
        },
        orderBy: {
          nombre: "asc",
        },
      });

      const productos = productosdb.map((productodb) =>
        Producto.fromPrimitives({
          id: productodb.id,
          nombre: productodb.nombre,
          descripcion: productodb.descripcion,
          precio: Number(productodb.precio),
          stock: productodb.stock,
          borrado: productodb.borrado,
        })
      );

      return productos;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("Error al listar productos");
    }
  }

  async deleteById(id: number): Promise<void> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      await prisma.producto.update({
        where: { id: id },
        data: { borrado: true },
      });
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("Error al eliminar el producto");
    }
  }

  async findByNombre(nombre: string): Promise<Array<Producto>> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      const productosdb = await prisma.producto.findMany({
        where: {
          nombre: {
            contains: nombre,
            mode: "insensitive",
          },
          borrado: false,
        },
        orderBy: {
          nombre: "asc",
        },
      });

      const productos = productosdb.map((productodb) =>
        Producto.fromPrimitives({
          id: productodb.id,
          nombre: productodb.nombre,
          descripcion: productodb.descripcion,
          precio: Number(productodb.precio),
          stock: productodb.stock,
          borrado: productodb.borrado,
        })
      );

      return productos;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("Error al buscar productos por nombre");
    }
  }

  async findAvailable(): Promise<Array<Producto>> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      const productosdb = await prisma.producto.findMany({
        where: {
          stock: {
            gt: 0,
          },
          borrado: false,
        },
        orderBy: {
          nombre: "asc",
        },
      });

      const productos = productosdb.map((productodb) =>
        Producto.fromPrimitives({
          id: productodb.id,
          nombre: productodb.nombre,
          descripcion: productodb.descripcion,
          precio: Number(productodb.precio),
          stock: productodb.stock,
          borrado: productodb.borrado,
        })
      );

      return productos;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("Error al obtener productos disponibles");
    }
  }
}
