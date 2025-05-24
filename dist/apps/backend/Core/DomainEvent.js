"use strict";
//import { Uuid } from './value-object/Uuid';
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEvent = void 0;
//* CLASE QUE DEFINE UN EVENTO
class DomainEvent {
    //* CONSTRUCTOR DE EVENTOS
    constructor(params) {
        const { aggregateId, eventName, eventId, occurredOn } = params;
        this.aggregateId = aggregateId;
        this.eventId = eventId || ''; //Uuid.random().value;
        this.occurredOn = occurredOn || new Date();
        this.eventName = eventName;
    }
}
exports.DomainEvent = DomainEvent;
