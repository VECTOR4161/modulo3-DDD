import {
  CreateInsumoDto,
  InsumoDatasource,
  UpdateInsumoDto,
} from "../../Application";
import { CustomError, filtradorDeObjetos } from "../../Config";
import { PrismaAdapter } from "../../Config/Adapters/prisma.adapter";
import {
  Insumo,
  InsumoId,
  InsumoNombre,
  InsumoPrecio,
  InsumoUnidades
} from "../../Core";

export class InsumoDatasourceImplPrisma implements InsumoDatasource {
  async save(crearInsumo: CreateInsumoDto): Promise<Insumo> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      const insumodb = await prisma.insumo.create({
        data: {
          nombre: crearInsumo.nombre,
          precio: crearInsumo.precio,
          unidades: crearInsumo.unidades
        },
      });

      const insumo = Insumo.create(
        new InsumoId(insumodb.id),
        new InsumoNombre(insumodb.nombre),
        new InsumoPrecio(Number(insumodb.precio)),
        new InsumoUnidades(insumodb.unidades)
      );

      return insumo;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("El insumo no pudo ser registrado");
    }
  }

  async update(id: number, actualizarInsumo: UpdateInsumoDto): Promise<Insumo> {
    try {
      let insumoFiltrado = filtradorDeObjetos.filtrarDto(actualizarInsumo);

      const prisma = PrismaAdapter.crearConexion();

      const insumodb = await prisma.insumo.update({
        data: insumoFiltrado,
        where: {
          id: id,
        },
      });

      const insumo = Insumo.create(
        new InsumoId(insumodb.id),
        new InsumoNombre(insumodb.nombre),
        new InsumoPrecio(Number(insumodb.precio)),
        new InsumoUnidades(insumodb.unidades)
      );

      return insumo;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("El insumo no pudo ser actualizado");
    }
  }

  async getById(id: number): Promise<Insumo> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      const insumodb = await prisma.insumo.findFirst({
        where: {
          id: id,
        },
      });

      if (!insumodb) {
        throw CustomError.notFound("El insumo no existe");
      }

      const insumo = Insumo.fromPrimitives({
        id: insumodb.id,
        nombre: insumodb.nombre,
        precio: Number(insumodb.precio),
        unidades: insumodb.unidades,
        idProveedor: insumodb.idProveedor,
      });

      return insumo;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("Error al obtener el insumo");
    }
  }

  async getAll(): Promise<Array<Insumo>> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      const insumosdb = await prisma.insumo.findMany({
        orderBy: {
          nombre: "asc",
        },
      });

      const insumos = insumosdb.map((insumodb:any) =>
        Insumo.fromPrimitives({
          id: insumodb.id,
          nombre: insumodb.nombre,
          precio: Number(insumodb.precio),
          unidades: insumodb.unidades,
          idProveedor: insumodb.idProveedor,
        })
      );

      return insumos;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("Error al listar insumos");
    }
  }

  async deleteById(id: number): Promise<void> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      await prisma.insumo.delete({
        where: { id: id },
      });
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("Error al eliminar el insumo");
    }
  }

  async findByNombre(nombre: string): Promise<Array<Insumo>> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      const insumosdb = await prisma.insumo.findMany({
        where: {
          nombre: {
            contains: nombre,
            mode: "insensitive",
          },
        },
        orderBy: {
          nombre: "asc",
        },
      });

      const insumos = insumosdb.map((insumodb:any) =>
        Insumo.fromPrimitives({
          id: insumodb.id,
          nombre: insumodb.nombre,
          precio: Number(insumodb.precio),
          unidades: insumodb.unidades,
          idProveedor: insumodb.idProveedor,
        })
      );

      return insumos;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("Error al buscar insumos por nombre");
    }
  }

  async findAvailable(): Promise<Array<Insumo>> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      const insumosdb = await prisma.insumo.findMany({
        where: {
          unidades: {
            gt: 0,
          },
        },
        orderBy: {
          nombre: "asc",
        },
      });

      const insumos = insumosdb.map((insumodb:any) =>
        Insumo.fromPrimitives({
          id: insumodb.id,
          nombre: insumodb.nombre,
          precio: Number(insumodb.precio),
          unidades: insumodb.unidades,
          idProveedor: insumodb.idProveedor,
        })
      );

      return insumos;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("Error al obtener insumos disponibles");
    }
  }

  async findByProveedor(idProveedor: number): Promise<Array<Insumo>> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      const insumosdb = await prisma.insumo.findMany({
        where: {
          idProveedor: idProveedor,
        },
        orderBy: {
          nombre: "asc",
        },
      });

      const insumos = insumosdb.map((insumodb:any) =>
        Insumo.fromPrimitives({
          id: insumodb.id,
          nombre: insumodb.nombre,
          precio: Number(insumodb.precio),
          unidades: insumodb.unidades,
          idProveedor: insumodb.idProveedor,
        })
      );

      return insumos;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("Error al obtener insumos por proveedor");
    }
  }
}
