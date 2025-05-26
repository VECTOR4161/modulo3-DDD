import {
  CreateIngredientesRecetaDto,
  CreateRecetaCompletaDto,
  IngredientesRecetaDatasource,
  UpdateIngredientesRecetaDto,
} from "../../Application";
import { CustomError, filtradorDeObjetos } from "../../Config";
import { PrismaAdapter } from "../../Config/Adapters/prisma.adapter";
import {
  IngredientesReceta,
  IngredientesRecetaId,
  IngredientesRecetaIdReceta,
  IngredientesRecetaCantidad,
  IngredientesRecetaIdInsumo,
} from "../../Core";

export class IngredientesRecetaDatasourceImplPrisma
  implements IngredientesRecetaDatasource
{
  async save(
    crearIngredientesReceta: CreateIngredientesRecetaDto
  ): Promise<IngredientesReceta> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      const ingredientesRecetadb = await prisma.ingredientes_receta.create({
        data: {
          idReceta: crearIngredientesReceta.idReceta,
          cantidad: crearIngredientesReceta.cantidad,
          idInsumo: crearIngredientesReceta.idInsumo,
        },
      });

      const ingredientesReceta = IngredientesReceta.create(
        new IngredientesRecetaId(ingredientesRecetadb.id),
        new IngredientesRecetaIdReceta(ingredientesRecetadb.idReceta),
        new IngredientesRecetaCantidad(ingredientesRecetadb.cantidad),
        new IngredientesRecetaIdInsumo(ingredientesRecetadb.idInsumo)
      );

      return ingredientesReceta;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest(
        "El ingrediente de receta no pudo ser registrado"
      );
    }
  }

  async update(
    id: number,
    actualizarIngredientesReceta: UpdateIngredientesRecetaDto
  ): Promise<IngredientesReceta> {
    try {
      let ingredientesRecetaFiltrado = filtradorDeObjetos.filtrarDto(
        actualizarIngredientesReceta
      );

      const prisma = PrismaAdapter.crearConexion();

      const ingredientesRecetadb = await prisma.ingredientes_receta.update({
        data: ingredientesRecetaFiltrado,
        where: {
          id: id,
        },
      });

      const ingredientesReceta = IngredientesReceta.create(
        new IngredientesRecetaId(ingredientesRecetadb.id),
        new IngredientesRecetaIdReceta(ingredientesRecetadb.idReceta),
        new IngredientesRecetaCantidad(ingredientesRecetadb.cantidad),
        new IngredientesRecetaIdInsumo(ingredientesRecetadb.idInsumo)
      );

      return ingredientesReceta;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest(
        "El ingrediente de receta no pudo ser actualizado"
      );
    }
  }

  async getById(id: number): Promise<IngredientesReceta> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      const ingredientesRecetadb = await prisma.ingredientes_receta.findFirst({
        where: {
          id: id,
        },
      });

      const ingredientesReceta = IngredientesReceta.fromPrimitives({
        id: ingredientesRecetadb.id,
        idReceta: ingredientesRecetadb.idReceta,
        cantidad: ingredientesRecetadb.cantidad,
        idInsumo: ingredientesRecetadb.idInsumo,
      });

      return ingredientesReceta;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("Error al obtener el ingrediente de receta");
    }
  }

  async getAll(): Promise<Array<IngredientesReceta>> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      const ingredientesRecetadb = await prisma.ingredientes_receta.findMany({
        orderBy: {
          idReceta: "asc",
        },
      });

      const ingredientesReceta = ingredientesRecetadb.map(
        (ingredientesRecetadb) =>
          IngredientesReceta.fromPrimitives({
            id: ingredientesRecetadb.id,
            idReceta: ingredientesRecetadb.idReceta,
            cantidad: ingredientesRecetadb.cantidad,
            idInsumo: ingredientesRecetadb.idInsumo,
          })
      );

      return ingredientesReceta;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("Error al listar ingredientes de recetas");
    }
  }

  async deleteById(id: number): Promise<void> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      await prisma.ingredientes_receta.delete({
        where: { id: id },
      });
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest(
        "Error al eliminar el ingrediente de receta"
      );
    }
  }

  async findByReceta(idReceta: number): Promise<Array<IngredientesReceta>> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      const ingredientesRecetadb = await prisma.ingredientes_receta.findMany({
        where: {
          idReceta: idReceta,
        },
        orderBy: {
          id: "asc",
        },
      });

      const ingredientesReceta = ingredientesRecetadb.map(
        (ingredientesRecetadb:any) =>
          IngredientesReceta.fromPrimitives({
            id: ingredientesRecetadb.id,
            idReceta: ingredientesRecetadb.idReceta,
            cantidad: ingredientesRecetadb.cantidad,
            idInsumo: ingredientesRecetadb.idInsumo,
          })
      );

      return ingredientesReceta;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("Error al obtener ingredientes por receta");
    }
  }

  async findByInsumo(idInsumo: number): Promise<Array<IngredientesReceta>> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      const ingredientesRecetadb = await prisma.ingredientes_receta.findMany({
        where: {
          idInsumo: idInsumo,
        },
        orderBy: {
          idReceta: "asc",
        },
      });

      const ingredientesReceta = ingredientesRecetadb.map(
        (ingredientesRecetadb:any) =>
          IngredientesReceta.fromPrimitives({
            id: ingredientesRecetadb.id,
            idReceta: ingredientesRecetadb.idReceta,
            cantidad: ingredientesRecetadb.cantidad,
            idInsumo: ingredientesRecetadb.idInsumo,
          })
      );

      return ingredientesReceta;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("Error al obtener recetas por insumo");
    }
  }

  async saveRecetaCompleta(
    createRecetaCompleta: CreateRecetaCompletaDto
  ): Promise<void> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      await prisma.$transaction(async (tx: any) => {
        const recetadb = await tx.recetas.create({
          data: {
            id_producto_obtenido: createRecetaCompleta.id_producto_obtenido,
          },
        });

        const ingredientesData = createRecetaCompleta.ingredientes.map(
          (ingrediente) => ({
            idReceta: recetadb.id,
            cantidad: ingrediente.cantidad,
            idInsumo: ingrediente.idInsumo,
          })
        );

        await tx.ingredientesReceta.createMany({
          data: ingredientesData,
        });
      });
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("Error al crear la receta completa");
    }
  }

  async deleteByReceta(idReceta: number): Promise<void> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      await prisma.ingredientes_receta.deleteMany({
        where: { idReceta: idReceta },
      });
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest(
        "Error al eliminar ingredientes de la receta"
      );
    }
  }
}
