"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonaDatasourceImplPrisma = void 0;
const Application_1 = require("../../Application");
const Config_1 = require("../../Config");
const prisma_adapter_1 = require("../../Config/Adapters/prisma.adapter");
const Core_1 = require("../../Core");
class PersonaDatasourceImplPrisma {
    save(crearPersona) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prisma = prisma_adapter_1.PrismaAdapter.crearConexion();
                const personadb = prisma.persona.create({
                    data: Application_1.CreatePersonaDto
                });
                const persona = Core_1.Persona.create(new Core_1.PersonaId(personadb.id), new Core_1.PersonaNombre(personadb.nombre), new Core_1.PersonaApellidos(personadb.apellidos), new Core_1.PersonaTelefono(personadb.telefono), new Core_1.PersonaDni(personadb.dni), new Core_1.PersonaBorrado(personadb.borrado));
                return persona;
            }
            catch (error) {
                if (error instanceof Config_1.CustomError)
                    throw Config_1.CustomError.customizableError(error.statusCode, error.message);
                throw Config_1.CustomError.badRequest('La persona no pudo ser registrada');
            }
        });
    }
    update(id, actualizarPersona) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let personaFiltrada = Config_1.filtradorDeObjetos.filtrarDto(actualizarPersona);
                const prisma = prisma_adapter_1.PrismaAdapter.crearConexion();
                const personadb = yield prisma.persona.update({
                    data: personaFiltrada,
                    where: {
                        id: id
                    }
                });
                const persona = Core_1.Persona.create(new Core_1.PersonaId(personadb.id), new Core_1.PersonaNombre(personadb.nombre), new Core_1.PersonaApellidos(personadb.apellidos), new Core_1.PersonaTelefono(personadb.telefono), new Core_1.PersonaDni(personadb.dni), new Core_1.PersonaBorrado(personadb.borrado));
                return persona;
            }
            catch (error) {
                if (error instanceof Config_1.CustomError)
                    throw Config_1.CustomError.customizableError(error.statusCode, error.message);
                throw Config_1.CustomError.badRequest('La persona no pudo ser actualizada');
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prisma = prisma_adapter_1.PrismaAdapter.crearConexion();
                const personadb = yield prisma.persona.findFirst({
                    where: {
                        id: id
                    }
                });
                const persona = Core_1.Persona.fromPrimitives({
                    id: personadb.id,
                    nombre: personadb.nombre,
                    apellidos: personadb.apellidos,
                    telefono: personadb.telefono,
                    dni: personadb.dni,
                    borrado: personadb.borrado
                });
                return persona;
            }
            catch (error) {
                if (error instanceof Config_1.CustomError)
                    throw Config_1.CustomError.customizableError(error.statusCode, error.message);
                throw Config_1.CustomError.badRequest('La persona no existe');
            }
        });
    }
    getAll() {
        try {
            const prisma = prisma_adapter_1.PrismaAdapter.crearConexion();
            const personasdb = prisma.persona.findMany({});
            personasdb;
        }
        catch (error) {
            if (error instanceof Config_1.CustomError)
                throw Config_1.CustomError.customizableError(error.statusCode, error.message);
            throw Config_1.CustomError.badRequest('Error al listar personas');
        }
        throw new Error("Method not implemented.");
    }
    deleteById(id) {
        throw new Error("Method not implemented.");
    }
}
exports.PersonaDatasourceImplPrisma = PersonaDatasourceImplPrisma;
