"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonaApellidos = void 0;
const domain_1 = require("../../../shared/domain");
//* VALUE OBJECT PARA LOS APELLIDOS EN ESTE CASO DE STRING
//* HEREDA DE LA CLASE STRINGVALUEOBJECT Y ESTA A SU VES HEREDA DE VALUE OBJECT
class PersonaApellidos extends domain_1.StringValueObject {
}
exports.PersonaApellidos = PersonaApellidos;
