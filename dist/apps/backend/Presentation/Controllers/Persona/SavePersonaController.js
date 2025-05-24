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
exports.SavePersonaController = void 0;
const Application_1 = require("../../../Application");
const Config_1 = require("../../../Config");
//* CONTROLADOR ENCARGADO DE GESTIONAR UNA UNICA OPERACION
class SavePersonaController {
    constructor(personaRepository, commandPublisher) {
        this.personaRepository = personaRepository;
        this.commandPublisher = commandPublisher;
        //* MANEJADOR DE ERRORES 
        this.handleError = (error, res) => {
            if (error instanceof Config_1.CustomError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
        };
        //* METODO DEL CONTROLADOR
        this.savePersona = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //* USO DEL DTO PARA VALIDAR LA ENTRADA DE DATOS AL SERVIDOR
            const [error, createPersonaDto] = Application_1.CreatePersonaDto.create(req.body);
            if (error)
                res.status(502).json({ error });
            // //* LLAMADA DEL CASO DE USO POR PARTE DEL CONTROLADOR
            new Application_1.CrearPersona(this.personaRepository, this.commandPublisher)
                .execute(createPersonaDto)
                .then(data => res.json({ data }))
                .catch(error => this.handleError(error, res));
        });
    }
}
exports.SavePersonaController = SavePersonaController;
