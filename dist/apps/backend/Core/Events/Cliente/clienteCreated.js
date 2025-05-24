"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteCreadoDomainEvent = void 0;
const DomainEvent_1 = require("../../DomainEvent");
class ClienteCreadoDomainEvent extends DomainEvent_1.DomainEvent {
    constructor({ aggregateId, eventId, occurredOn, id, idPersona, borrado }) {
        super({ eventName: ClienteCreadoDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
        this.id = id;
        this.idPersona = idPersona;
        this.borrado = borrado;
    }
    toPrimitives() {
        const { id, idPersona, borrado } = this;
        return {
            id,
            idPersona,
            borrado
        };
    }
    static fromPrimitives(params) {
        const { aggregateId, attributes, occurredOn, eventId } = params;
        return new ClienteCreadoDomainEvent({
            aggregateId,
            eventId,
            occurredOn,
            id: attributes.id,
            idPersona: attributes.idPersona,
            borrado: attributes.borrado
        });
    }
}
exports.ClienteCreadoDomainEvent = ClienteCreadoDomainEvent;
ClienteCreadoDomainEvent.EVENT_NAME = 'cliente.creado';
