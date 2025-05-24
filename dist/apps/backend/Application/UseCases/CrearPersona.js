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
exports.CrearPersona = void 0;
const __1 = require("..");
console.log('El valor del publisher fuera es: ', __1.CommandPublisher);
console.log('El valor del repositorio es de: ', __1.PersonaRepository);
//* CASO DE USO CREAR PERSONA ENCARGADO DE GESTIONAR LA LOGICA DE APLICACION Y DE NOTIFICACION DE EVENTOS
class CrearPersona {
    constructor(personaRepository, commandPublisher) {
        this.personaRepository = personaRepository;
        this.commandPublisher = commandPublisher;
    }
    execute(createPersonaDto) {
        return __awaiter(this, void 0, void 0, function* () {
            //* USAR EL REPOSITORIO
            yield this.personaRepository.save(createPersonaDto);
            console.log('El publisher en el metodo: ', __1.CommandPublisher);
            //* USAR EL COMMANDBUS
            this.commandPublisher.connect();
            this.commandPublisher.publish('prueba', 'Prueba de caso de uso');
            // const publisher = new RabbitMQPublisher();
            // await publisher.connect();
            // publisher.publish('prueba', 'Mensaje enviado desde caso de uso')
            //* REGRESAR EL RESULTADO DEL CASO DE USO
            return;
        });
    }
}
exports.CrearPersona = CrearPersona;
