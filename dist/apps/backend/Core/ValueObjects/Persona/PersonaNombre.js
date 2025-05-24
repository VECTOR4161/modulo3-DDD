"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonaNombre = void 0;
const domain_1 = require("../../../shared/domain");
//* VALUE OBJECT PARA LOS APELLIDOS EN ESTE CASO DE STRING
//* HEREDA DE LA CLASE STRINGVALUEOBJECT Y ESTA A SU VES HEREDA DE VALUE OBJECT
class PersonaNombre extends domain_1.StringValueObject {
}
exports.PersonaNombre = PersonaNombre;
