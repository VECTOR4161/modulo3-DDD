import { DomainEvent } from "../../DomainEvent";

type ProveedorCreadoDomainEventAttributes = {
  readonly id: number;
  readonly idPersona: number;
  readonly borrado: boolean;
};

export class ProveedorCreadoDomainEvent extends DomainEvent{

    static readonly EVENT_NAME = 'proveedor.creado';

    readonly id: number;
    readonly idPersona: number;
    readonly borrado: boolean;

    constructor({
        aggregateId,
        eventId,
        occurredOn,
        id,
        idPersona,
        borrado
    }: {
        aggregateId: string,
        eventId?: string,
        occurredOn?: Date,
        id: number,
        idPersona: number,
        borrado: boolean
    }){
        super({eventName: ProveedorCreadoDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn});
        this.id = id;
        this.idPersona = idPersona;
        this.borrado = borrado;
    }

    toPrimitives(): ProveedorCreadoDomainEventAttributes {
        const {id, idPersona, borrado} = this;
        return {
            id,
            idPersona,
            borrado
        }
    }

    static fromPrimitives(params: {
        aggregateId: string;
        attributes: ProveedorCreadoDomainEventAttributes;
        eventId: string;
        occurredOn: Date;
    }): DomainEvent {
        const { aggregateId, attributes, occurredOn, eventId } = params;
        return new ProveedorCreadoDomainEvent({
            aggregateId,
            eventId,
            occurredOn,
            id: attributes.id,
            idPersona: attributes.idPersona,
            borrado: attributes.borrado
        })
    }
}