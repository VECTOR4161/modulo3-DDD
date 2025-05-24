"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Persona = void 0;
//* ESTA CLASE ES EL AGREGADO DE PERSONA COMO TAL
const __1 = require("..");
//* LA CLASE EXTIENDE DE AGGREGATE ROOT
class Persona extends __1.AggregateRoot {
    //* CONSTRUCTOR DE LA CLASE PERSONA
    constructor(id, nombres, apellidos, telefono, dni, borrado) {
        super();
        this.id = id;
        this.nombre = nombres;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.dni = dni;
        this.borrado = borrado;
    }
    //* METODO PARA CREAR UNA PERSONA
    static create(id, nombre, apellidos, telefono, dni, borrado) {
        const persona = new Persona(id, nombre, apellidos, telefono, dni, borrado);
        //* EN ESTE APARTADO SE AGREGAN LOS EVENTOS DE DOMINIO AL ARRAY DE EVENTOS DE DOMINIO
        persona.record(new __1.PersonaCreadaDomainEvent({
            aggregateId: persona.id.toString(),
            id: persona.id.value,
            nombres: persona.nombre.value,
            apellidos: persona.apellidos.value,
            telefono: persona.telefono.value,
            dni: persona.dni.value,
            borrado: persona.borrado.value
        }));
        return persona;
    }
    //* METODO PARA REGRESAR UNA PERSONA A TRAVES DE LA VERIFICACION DE SUS DATOS PRIMITIVOS
    static fromPrimitives(plainData) {
        return new Persona(new __1.PersonaId(plainData.id), new __1.PersonaNombre(plainData.nombre), new __1.PersonaApellidos(plainData.apellidos), new __1.PersonaTelefono(plainData.telefono), new __1.PersonaDni(plainData.dni), new __1.PersonaBorrado(plainData.borrado));
    }
    //* METODO PARA REGRESAR LA CLASE PERSONA EN UN OBJETO CON VALORES PRIMITIVOS
    toPrimitives() {
        return {
            id: this.id.value,
            nombres: this.nombre.value,
            apellidos: this.apellidos.value,
            telefono: this.telefono.value,
            dni: this.dni.value,
            borrado: this.borrado.value
        };
    }
}
exports.Persona = Persona;
