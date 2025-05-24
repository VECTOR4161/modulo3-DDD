"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavePersonaRoute = void 0;
const express_1 = require("express");
const Infrastructure_1 = require("../../../Infrastructure");
const __1 = require("../..");
//* CLASE QUE GESTIONA LA RUTA PARA GUARDAR UNA PERSONA
class SavePersonaRoute {
    static get routes() {
        const router = (0, express_1.Router)();
        const commandPublisher = new Infrastructure_1.RabbitMQPublisher();
        //* IMPORTACIONES DE DATASOURCE Y REPOSITORIO IMPLEMENTADOS.
        const personaDatasource = new Infrastructure_1.PersonaDatasourceImplPrisma();
        const personaRepository = new Infrastructure_1.PersonaRepositoryImpl(personaDatasource);
        const savePersonaController = new __1.SavePersonaController(personaRepository, commandPublisher);
        //* RUTA PARA EL CONTROLADOR
        router.post('/save', savePersonaController.savePersona);
        return router;
    }
}
exports.SavePersonaRoute = SavePersonaRoute;
