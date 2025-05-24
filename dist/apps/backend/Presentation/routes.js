"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const SavePersonaRoute_1 = require("./Routes/Persona/SavePersonaRoute");
//* MANEJADOR DE LAS RUTAS DE FORMA CENTRALIZADA
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        //* MANEJADOR DE LAS RUTAS DE PERSONA
        router.use('/persona', SavePersonaRoute_1.SavePersonaRoute.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
