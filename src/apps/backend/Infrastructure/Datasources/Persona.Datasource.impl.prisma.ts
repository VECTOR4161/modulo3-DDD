import {
  CreatePersonaDto,
  PersonaDatasource,
  UpdatePersonaDto,
} from "../../Application";
import { CustomError, filtradorDeObjetos } from "../../Config";
import { PrismaAdapter } from "../../Config/Adapters/prisma.adapter";
import {
  Persona,
  PersonaApellidos,
  PersonaBorrado,
  PersonaDni,
  PersonaId,
  PersonaNombre,
  PersonaTelefono,
} from "../../Core";

export class PersonaDatasourceImplPrisma implements PersonaDatasource {
  async save(crearPersona: CreatePersonaDto): Promise<Persona> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      const personadb = await prisma.persona.create({
        data: {
          nombre: crearPersona.nombre,
          apellidos: crearPersona.apellidos,
          telefono: crearPersona.telefono,
          dni: crearPersona.dni,
          borrado: crearPersona.borrado,
        },
      });

      const persona = Persona.create(
        new PersonaId(personadb.id),
        new PersonaNombre(personadb.nombre!),
        new PersonaApellidos(personadb.apellidos!),
        new PersonaTelefono(personadb.telefono!),
        new PersonaDni(personadb.dni!),
        new PersonaBorrado(personadb.borrado!)
      );

      return persona;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("La persona no pudo ser registrada");
    }
  }

  async update(
    id: number,
    actualizarPersona: UpdatePersonaDto
  ): Promise<Persona> {
    try {
      let personaFiltrada = filtradorDeObjetos.filtrarDto(actualizarPersona);

      const prisma = PrismaAdapter.crearConexion();

      const personadb = await prisma.persona.update({
        data: personaFiltrada,
        where: {
          id: id,
        },
      });

      const persona = Persona.create(
        new PersonaId(personadb.id),
        new PersonaNombre(personadb.nombre!),
        new PersonaApellidos(personadb.apellidos!),
        new PersonaTelefono(personadb.telefono!),
        new PersonaDni(personadb.dni!),
        new PersonaBorrado(personadb.borrado!)
      );

      return persona;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("La persona no pudo ser actualizada");
    }
  }

  async getById(id: number): Promise<Persona> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      const personadb = await prisma.persona.findFirst({
        where: {
          id: id,
        },
      });

      if (!personadb) {
        throw CustomError.notFound("La persona no existe");
      }

      const persona = Persona.fromPrimitives({
        id: personadb.id,
        nombre: personadb.nombre!,
        apellidos: personadb.apellidos!,
        telefono: personadb.telefono!,
        dni: personadb.dni!,
        borrado: personadb.borrado!,
      });

      return persona;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("Error al obtener la persona");
    }
  }

  async getAll(): Promise<Array<Persona>> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      const personasdb = await prisma.persona.findMany({
        where: {
          borrado: false,
        },
        orderBy: {
          nombre: "asc",
        },
      });

      const personas = personasdb.map((personadb) =>
        Persona.fromPrimitives({
          id: personadb.id,
          nombre: personadb.nombre!,
          apellidos: personadb.apellidos!,
          telefono: personadb.telefono!,
          dni: personadb.dni!,
          borrado: personadb.borrado!,
        })
      );

      return personas;
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("Error al listar personas");
    }
  }

  async deleteById(id: number): Promise<void> {
    try {
      const prisma = PrismaAdapter.crearConexion();

      await prisma.persona.update({
        where: { id: id },
        data: { borrado: true },
      });
    } catch (error) {
      if (error instanceof CustomError) {
        throw CustomError.customizableError(error.statusCode, error.message);
      }
      throw CustomError.badRequest("Error al eliminar la persona");
    }
  }
}
