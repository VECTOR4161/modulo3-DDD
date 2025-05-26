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
          
          id_receta: crearIngredientesReceta.idReceta,
          cantidad: crearIngredientesReceta.cantidad,
          id_insumo: crearIngredientesReceta.id_insumo,
        },
      });

      const ingredientesReceta = IngredientesReceta.create(
        new IngredientesRecetaId(ingredientesRecetadb.id),
        new IngredientesRecetaIdReceta(ingredientesRecetadb.id_receta!),
        new IngredientesRecetaCantidad(ingredientesRecetadb.cantidad!),
        new IngredientesRecetaIdInsumo(ingredientesRecetadb.id_insumo!)
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

      // Mapear nombres de dominio a nombres de BD
      const dataToUpdate: any = {};
      if (ingredientesRecetaFiltrado.idReceta !== undefined) {
        dataToUpdate.id_receta = ingredientesRecetaFiltrado.idReceta;
      }
      if (ingredientesRecetaFiltrado.cantidad !== undefined) {
        dataToUpdate.cantidad = ingredientesRecetaFiltrado.cantidad;
      }
      if (ingredientesRecetaFiltrado.id_insumo !== undefined) {
        dataToUpdate.id_insumo = ingredientesRecetaFiltrado.id_insumo;
      }

      const prisma = PrismaAdapter.crearConexion();

      const ingredientesRecetadb = await prisma.ingredientes_receta.update({
        data: dataToUpdate,
        where: {
          id: id,
        },
      });

      const ingredientesReceta = IngredientesReceta.create(
        new IngredientesRecetaId(ingredientesRecetadb.id),
        new IngredientesRecetaIdReceta(ingredientesRecetadb.id_receta!),
        new IngredientesRecetaCantidad(ingredientesRecetadb.cantidad!),
        new IngredientesRecetaIdInsumo(ingredientesRecetadb.id_insumo!)
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

      if (!ingredientesRecetadb) {
        throw CustomError.notFound("El ingrediente de receta no existe");
      }

      const ingredientesReceta = IngredientesReceta.fromPrimitives({
        id: ingredientesRecetadb.id,
        idReceta: ingredientesRecetadb.id_receta!,
        cantidad: ingredientesRecetadb.cantidad!,
        id_insumo: ingredientesRecetadb.id_insumo!,
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
          id_receta: "asc",
        },
      });

      const ingredientesReceta = ingredientesRecetadb.map(
        (ingredientesRecetaItem) =>
          IngredientesReceta.fromPrimitives({
            id: ingredientesRecetaItem.id,
            idReceta: ingredientesRecetaItem.id_receta!,
            cantidad: ingredientesRecetaItem.cantidad!,
            id_insumo: ingredientesRecetaItem.id_insumo!,
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
          id_receta: idReceta,
        },
        orderBy: {
          id: "asc",
        },
      });

      const ingredientesReceta = ingredientesRecetadb.map(
        (ingredientesRecetaItem) =>
          IngredientesReceta.fromPrimitives({
            id: ingredientesRecetaItem.id,
            idReceta: ingredientesRecetaItem.id_receta!,
            cantidad: ingredientesRecetaItem.cantidad!,
            id_insumo: ingredientesRecetaItem.id_insumo!,
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

  async findByInsumo(id_insumo: number): Promise<Array<IngredientesReceta>> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      const ingredientesRecetadb = await prisma.ingredientes_receta.findMany({
        where: {
          id_insumo: id_insumo,
        },
        orderBy: {
          id_receta: "asc",
        },
      });

      const ingredientesReceta = ingredientesRecetadb.map(
        (ingredientesRecetaItem) =>
          IngredientesReceta.fromPrimitives({
            id: ingredientesRecetaItem.id,
            idReceta: ingredientesRecetaItem.id_receta!,
            cantidad: ingredientesRecetaItem.cantidad!,
            id_insumo: ingredientesRecetaItem.id_insumo!,
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

      await prisma.$transaction(async (tx) => {
        const recetadb = await tx.recetas.create({
          data: {
            
            id_producto_obtenido: createRecetaCompleta.id_producto_obtenido,
          },
        });

        const ingredientesData = createRecetaCompleta.ingredientes.map(
          (ingrediente) => ({
            id_receta: recetadb.id,
            cantidad: ingrediente.cantidad,
            id_insumo: ingrediente.id_insumo,
          })
        );

        await tx.ingredientes_receta.createMany({
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
        where: { id_receta: idReceta },
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