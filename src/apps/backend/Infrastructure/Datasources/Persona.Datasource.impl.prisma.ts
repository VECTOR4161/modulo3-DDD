import { CreatePersonaDto, PersonaDatasource, UpdatePersonaDto } from "../../Application";
import { CustomError } from "../../Config";
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
        throw new Error("Method not implemented.")
    }
    getById(id: number): Promise<Persona> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Array<Persona>> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}