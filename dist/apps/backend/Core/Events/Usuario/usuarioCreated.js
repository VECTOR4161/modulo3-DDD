"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioCreadoDomainEvent = void 0;
const DomainEvent_1 = require("../../DomainEvent");
class UsuarioCreadoDomainEvent extends DomainEvent_1.DomainEvent {
    constructor({ aggregateId, eventId, occurredOn, id, idPersona, idRol, contrasena, borrado }) {
        super({ eventName: UsuarioCreadoDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
        this.id = id;
        this.idPersona = idPersona;
        this.idRol = idRol;
        this.contrasena = contrasena;
        this.borrado = borrado;
    }
    toPrimitives() {
        const { id, idPersona, idRol, contrasena, borrado } = this;
        return {
            id,
            idPersona,
            idRol,
            contrasena,
            borrado
        };
    }
    static fromPrimitives(params) {
        const { aggregateId, attributes, occurredOn, eventId } = params;
        return new UsuarioCreadoDomainEvent({
            aggregateId,
            eventId,
            occurredOn,
            id: attributes.id,
            idPersona: attributes.idPersona,
            idRol: attributes.idRol,
            contrasena: attributes.contrasena,
            borrado: attributes.borrado
        });
    }
}
exports.UsuarioCreadoDomainEvent = UsuarioCreadoDomainEvent;
UsuarioCreadoDomainEvent.EVENT_NAME = 'cliente.creado';
