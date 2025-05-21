import { DomainEvent } from "../../DomainEvent";

type ClienteCreadoDomainEventAttributes = {
  readonly id: number;
  readonly idPersona: number;
  readonly borrado: boolean;
};


export class ClienteCreadoDomainEvent extends DomainEvent{

    static readonly EVENT_NAME = 'cliente.creado';

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
        id: number
        idPersona: number,
        borrado: boolean
    }){
        super({eventName: ClienteCreadoDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn});
        this.id = id;
        this.idPersona = idPersona;
        this.borrado = borrado
    }

    toPrimitives(): ClienteCreadoDomainEventAttributes {
        const {id, idPersona, borrado} = this;
        return {
            id,
            idPersona,
            borrado
        }
    }

    static fromPrimitives(params: {
        aggregateId: string;
        attributes: ClienteCreadoDomainEventAttributes;
        eventId: string;
        occurredOn: Date;
        }): DomainEvent {
            const { aggregateId, attributes, occurredOn, eventId } = params;
            return new ClienteCreadoDomainEvent({
                aggregateId,
                eventId,
                occurredOn,
                id: attributes.id,
                idPersona: attributes.idPersona,
                borrado: attributes.borrado
            })
        }

} 