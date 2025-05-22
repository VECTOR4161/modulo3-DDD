import { CreatePersonaDto, PersonaDatasource, UpdatePersonaDto } from "../../Application";
import { CustomError, filtradorDeObjetos } from "../../Config";
import { PrismaAdapter } from "../../Config/Adapters/prisma.adapter";
import { Persona, PersonaApellidos, PersonaBorrado, PersonaDni, PersonaId, PersonaNombre, PersonaTelefono } from "../../Core";
export class PersonaDatasourceImplPrisma implements PersonaDatasource {
    
    async save(crearPersona: CreatePersonaDto): Promise<Persona> {
        try {
            const prisma = PrismaAdapter.crearConexion()
            const personadb = prisma.persona.create({
                data: CreatePersonaDto
            })
            const persona = Persona.create(
                new PersonaId(personadb.id),
                new PersonaNombre(personadb.nombre),
                new PersonaApellidos(personadb.apellidos),
                new PersonaTelefono(personadb.telefono),
                new PersonaDni(personadb.dni),
                new PersonaBorrado(personadb.borrado)
            )
            return persona
        } catch (error) {
            if( error instanceof CustomError) throw CustomError.customizableError(error.statusCode, error.message)
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
            const persona = Persona.create(
                new PersonaId(personadb.id),
                new PersonaNombre(personadb.nombre),
                new PersonaApellidos(personadb.apellidos),
                new PersonaTelefono(personadb.telefono),
                new PersonaDni(personadb.dni),
                new PersonaBorrado(personadb.borrado)
            )
            return persona
        } catch (error) {
            if( error instanceof CustomError) throw CustomError.customizableError(error.statusCode, error.message)
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

            const persona = Persona.fromPrimitives({
                id: personadb.id,
                nombre: personadb.nombre,
                apellidos: personadb.apellidos,
                telefono: personadb.telefono,
                dni: personadb.dni,
                borrado: personadb.borrado
            })
            return persona
        } catch (error) {
            if( error instanceof CustomError) throw CustomError.customizableError(error.statusCode, error.message)
            throw CustomError.badRequest('La persona no existe')
        }
    }
    getAll(): Promise<Array<Persona>> {
        try {
            const prisma = PrismaAdapter.crearConexion()
            const personasdb = prisma.persona.findMany({})
            personasdb
        } catch (error) {
            if( error instanceof CustomError) throw CustomError.customizableError(error.statusCode, error.message)
            throw CustomError.badRequest('Error al listar personas')
        }
        throw new Error("Method not implemented.");
    }
    
    deleteById(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}