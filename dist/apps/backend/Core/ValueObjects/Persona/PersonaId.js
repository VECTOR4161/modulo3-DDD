"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonaId = void 0;
const domain_1 = require("../../../shared/domain");
//* VALUE OBJECT PARA LOS APELLIDOS EN ESTE CASO DE NUMERICOS
//* HEREDA DE LA CLASE STRINGVALUEOBJECT Y ESTA A SU VES HEREDA DE VALUE OBJECT
class PersonaId extends domain_1.NumberValueObject {
}
exports.PersonaId = PersonaId;
