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
          precio: crearProducto.precio,
          stock: crearProducto.stock,
        },
      });

      const producto = Producto.create(
        new ProductoId(productodb.id),
        new ProductoNombre(productodb.nombre!),
        new ProductoDescripcion(crearProducto.descripcion),
        new ProductoPrecio(Number(productodb.precio!)),
        new ProductoStock(productodb.stock!),
        new ProductoBorrado(crearProducto.borrado)
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

      const dataToUpdate: any = {};
      if (productoFiltrado.nombre !== undefined) {
        dataToUpdate.nombre = productoFiltrado.nombre;
      }
      if (productoFiltrado.precio !== undefined) {
        dataToUpdate.precio = productoFiltrado.precio;
      }
      if (productoFiltrado.stock !== undefined) {
        dataToUpdate.stock = productoFiltrado.stock;
      }

      const prisma = PrismaAdapter.crearConexion();

      const productodb = await prisma.producto.update({
        data: dataToUpdate,
        where: {
          id: id,
        },
      });

      const producto = Producto.create(
        new ProductoId(productodb.id),
        new ProductoNombre(productodb.nombre!),
        new ProductoDescripcion(actualizarProducto.descripcion ?? ""),
        new ProductoPrecio(Number(productodb.precio!)),
        new ProductoStock(productodb.stock!),
        new ProductoBorrado(actualizarProducto.borrado ?? false)
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

      if (!productodb) {
        throw CustomError.notFound("El producto no existe");
      }

      const producto = Producto.fromPrimitives({
        id: productodb.id,
        nombre: productodb.nombre!,
        descripcion: "",
        precio: Number(productodb.precio!),
        stock: productodb.stock!,
        borrado: false,
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
        orderBy: {
          nombre: "asc",
        },
      });

      const productos = productosdb.map((productodb) =>
        Producto.fromPrimitives({
          id: productodb.id,
          nombre: productodb.nombre!,
          descripcion: "",
          precio: Number(productodb.precio!),
          stock: productodb.stock!,
          borrado: false,
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

      await prisma.producto.delete({
        where: { id: id },
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
          },
        },
        orderBy: {
          nombre: "asc",
        },
      });

      const productos = productosdb.map((productodb) =>
        Producto.fromPrimitives({
          id: productodb.id,
          nombre: productodb.nombre!,
          descripcion: "",
          precio: Number(productodb.precio!),
          stock: productodb.stock!,
          borrado: false,
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
        },
        orderBy: {
          nombre: "asc",
        },
      });

      const productos = productosdb.map((productodb) =>
        Producto.fromPrimitives({
          id: productodb.id,
          nombre: productodb.nombre!,
          descripcion: "",
          precio: Number(productodb.precio!),
          stock: productodb.stock!,
          borrado: false,
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
