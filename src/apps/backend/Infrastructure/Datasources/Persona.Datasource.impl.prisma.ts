import { CreatePersonaDto, PersonaDatasource, UpdatePersonaDto } from "../../Application";
import { CustomError, filtradorDeObjetos } from "../../Config";
import { PrismaAdapter } from "../../Config/Adapters/prisma.adapter";
import { Persona, PersonaApellidos, PersonaBorrado, PersonaDni, PersonaId, PersonaNombre, PersonaTelefono } from "../../Core";


type PersonaDB = {
    id: number;
    nombre: string | null;
    apellidos: string | null;
    telefono: string | null;
    dni: string | null;
    fec_c: Date | null;
    fec_u: Date | null;
    borrado: boolean | null;
};


export class PersonaDatasourceImplPrisma implements PersonaDatasource {

    procesarPersonaDB(personadb: PersonaDB): Persona {
        const persona = Persona.create(
            new PersonaId(personadb.id),
            new PersonaNombre(personadb.nombre ?? ''),
            new PersonaApellidos(personadb.apellidos ?? ''),
            new PersonaTelefono(personadb.telefono ?? ''),
            new PersonaDni(personadb.dni ?? ''),
            new PersonaBorrado(personadb.borrado!)
        )
        return persona
    }


    procesarPersonaDBFromPrimitives(personadb: PersonaDB): Persona {
        const persona = Persona.fromPrimitives({
            id: personadb.id,
            nombre: personadb.nombre!,
            apellidos: personadb.apellidos!,
            telefono: personadb.telefono!,
            dni: personadb.dni!,
            borrado: personadb.borrado!
        })
        return persona
    }


    async save(crearPersona: CreatePersonaDto): Promise<Persona> {
        try {
            const prisma = PrismaAdapter.crearConexion()
            const personadb = await prisma.persona.create({
                data: CreatePersonaDto
            })
            return this.procesarPersonaDB(personadb)
        } catch (error) {
            if (error instanceof CustomError) throw CustomError.customizableError(error.statusCode, error.message)
            throw CustomError.badRequest('La persona no pudo ser registrada')
        }
    }
    async update(id: number, actualizarPersona: UpdatePersonaDto): Promise<Persona> {
        try {
            let personaFiltrada = filtradorDeObjetos.filtrarDto(actualizarPersona)
            const prisma = PrismaAdapter.crearConexion()
            const personadb = await prisma.persona.update({
                data: personaFiltrada,
                where: {
                    id: id
                }
            })
            return this.procesarPersonaDB(personadb)
        } catch (error) {
            if (error instanceof CustomError) throw CustomError.customizableError(error.statusCode, error.message)
            throw CustomError.badRequest('La persona no pudo ser actualizada')
        }
    }

    async getById(id: number): Promise<Persona> {
        try {
            const prisma = PrismaAdapter.crearConexion()
            const personadb = await prisma.persona.findFirst({
                where: {
                    id: id
                }
            })
            if( personadb == null) throw CustomError.notFound('La persona no existe')
            return this.procesarPersonaDBFromPrimitives(personadb)
        } catch (error) {
            if (error instanceof CustomError) throw CustomError.customizableError(error.statusCode, error.message)
            throw CustomError.badRequest('La persona no existe')
        }
    }

    async getAll(): Promise<Array<Persona>> {
        try {
            const prisma = PrismaAdapter.crearConexion()
            const personasdb = await prisma.persona.findMany({})
            const personas = personasdb.map(personadb => this.procesarPersonaDBFromPrimitives(personadb))
            return personas
        } catch (error) {
            if (error instanceof CustomError) throw CustomError.customizableError(error.statusCode, error.message)
            throw CustomError.badRequest('Error al listar personas')
        }
    }

    async deleteById(id: number): Promise<void> {
        try {
            this.getById(id)
            const prisma = PrismaAdapter.crearConexion()
            await prisma.persona.delete({
                where: {
                    id: id
                }
            });
            return
        } catch (error) {
            if (error instanceof CustomError) throw CustomError.customizableError(error.statusCode, error.message)
            throw CustomError.badRequest('Error al listar personas')
        }
    }

}