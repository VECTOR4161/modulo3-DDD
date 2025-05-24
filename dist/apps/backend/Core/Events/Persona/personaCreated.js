"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonaCreadaDomainEvent = void 0;
const DomainEvent_1 = require("../../DomainEvent");
//* EVENTO DE DOMINIO DE PERSONA CREADA
class PersonaCreadaDomainEvent extends DomainEvent_1.DomainEvent {
    //* CREACION DE LA INFORMACION DEL EVENTO Y DE LAS CARACTERISTICAS DEL AGREGADO
    constructor({ aggregateId, eventId, occurredOn, id, nombres, apellidos, telefono, dni, borrado }) {
        //* USO DEL CONSTRUCTOR DE LA CLASE DOMAIN EVENT
        super({ eventName: PersonaCreadaDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
        //* LLENADO DE LOS VALORES DE LA CLASE DEL EVENTO
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.dni = dni;
        this.borrado = borrado;
    }
    //* CONVIERTE LA CLASE EN UN OBJETO CON VALORES PRIMITIVOS
    toPrimitives() {
        const { id, nombres, apellidos, telefono, dni, borrado } = this;
        return {
            id,
            nombres,
            apellidos,
            telefono,
            dni,
            borrado
        };
    }
    //* CONVIERTE DATOS PRIMITIVOS EN LA CLASE
    static fromPrimitives(params) {
        const { aggregateId, attributes, occurredOn, eventId } = params;
        return new PersonaCreadaDomainEvent({
            aggregateId,
            eventId,
            occurredOn,
            id: attributes.id,
            nombres: attributes.nombres,
            apellidos: attributes.apellidos,
            telefono: attributes.telefono,
            dni: attributes.dni,
            borrado: attributes.borrado
        });
    }
}
exports.PersonaCreadaDomainEvent = PersonaCreadaDomainEvent;
//* NOMBRE DEL EVENTO PARA EL COMMANDBUS
PersonaCreadaDomainEvent.EVENT_NAME = 'persona.creada';
