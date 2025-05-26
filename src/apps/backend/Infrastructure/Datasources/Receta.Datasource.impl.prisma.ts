import {
  CreateRecetaDto,
  RecetaDatasource,
  UpdateRecetaDto,
} from "../../Application";
import { CustomError, filtradorDeObjetos } from "../../Config";
import { PrismaAdapter } from "../../Config/Adapters/prisma.adapter";
import { Receta, RecetaId, RecetaIdProductoObtenido } from "../../Core";

export class RecetaDatasourceImplPrisma implements RecetaDatasource {
  async save(crearReceta: CreateRecetaDto): Promise<Receta> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      const recetadb = await prisma.recetas.create({
        data: {
          id_producto_obtenido: crearReceta.id_producto_obtenido,
        },
      });

      const receta = Receta.create(
        new RecetaId(recetadb.id),
        new RecetaIdProductoObtenido(recetadb.id_producto_obtenido)
      );

      return receta;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("La receta no pudo ser registrada");
    }
  }

  async update(id: number, actualizarReceta: UpdateRecetaDto): Promise<Receta> {
    try {
      let recetaFiltrada = filtradorDeObjetos.filtrarDto(actualizarReceta);

      const prisma = PrismaAdapter.crearConexion();

      const recetadb = await prisma.recetas.update({
        data: recetaFiltrada,
        where: {
          id: id,
        },
      });

      const receta = Receta.create(
        new RecetaId(recetadb.id),
        new RecetaIdProductoObtenido(recetadb.id_producto_obtenido)
      );

      return receta;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("La receta no pudo ser actualizada");
    }
  }

  async getById(id: number): Promise<Receta> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      const recetadb = await prisma.recetas.findFirst({
        where: {
          id: id,
        },
      });

      if (!recetadb) {
        throw CustomError.notFound("La receta no existe");
      }

      const receta = Receta.fromPrimitives({
        id: recetadb.id,
        id_producto_obtenido: recetadb.id_producto_obtenido,
      });

      return receta;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("Error al obtener la receta");
    }
  }

  async getAll(): Promise<Array<Receta>> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      const recetasdb = await prisma.recetas.findMany({
        orderBy: {
          id: "asc",
        },
      });

      const recetas = recetasdb.map((recetadb:any) =>
        Receta.fromPrimitives({
          id: recetadb.id,
          id_producto_obtenido: recetadb.id_producto_obtenido,
        })
      );

      return recetas;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("Error al listar recetas");
    }
  }

  async deleteById(id: number): Promise<void> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      await prisma.recetas.delete({
        where: { id: id },
      });
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("Error al eliminar la receta");
    }
  }

  async findByProducto(idProducto: number): Promise<Array<Receta>> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      const recetasdb = await prisma.recetas.findMany({
        where: {
          id_producto_obtenido: idProducto,
        },
        orderBy: {
          id: "asc",
        },
      });

      const recetas = recetasdb.map((recetadb:any) =>
        Receta.fromPrimitives({
          id: recetadb.id,
          id_producto_obtenido: recetadb.id_producto_obtenido,
        })
      );

      return recetas;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("Error al obtener recetas por producto");
    }
  }
}
