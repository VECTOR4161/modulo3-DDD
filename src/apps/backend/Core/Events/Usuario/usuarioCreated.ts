import { DomainEvent } from "../../DomainEvent";

type UsuarioCreadoDomainEventAttributes = {
    readonly id: number;
    readonly idPersona: number;
    readonly idRol: number;
    readonly contrasena: string;
    readonly borrado: boolean;
};

export class UsuarioCreadoDomainEvent extends DomainEvent {

    static readonly EVENT_NAME = 'cliente.creado';

    readonly id: number;
    readonly idPersona: number;
    readonly idRol: number;
    readonly contrasena: string;
    readonly borrado: boolean;

    constructor({
        aggregateId,
        eventId,
        occurredOn,
        id,
        idPersona,
        idRol,
        contrasena,
        borrado
    }: {
        aggregateId: string,
        eventId?: string,
        occurredOn?: Date,
        id: number,
        idPersona: number,
        idRol: number,
        contrasena: string,
        borrado: boolean
    }) {
        super({ eventName: UsuarioCreadoDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn })
        this.id = id
        this.idPersona = idPersona
        this.idRol = idRol
        this.contrasena = contrasena
        this.borrado = borrado
    }


    toPrimitives(): UsuarioCreadoDomainEventAttributes {
        const { id, idPersona, idRol, contrasena, borrado } = this
        return {
            id,
            idPersona,
            idRol,
            contrasena,
            borrado 
        }
    }

    static fromPrimitives(params: {
        aggregateId: string;
        attributes: UsuarioCreadoDomainEventAttributes;
        eventId: string;
        occurredOn: Date;
    }): DomainEvent {
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
        })
    }
}