import { DomainEvent } from "../../DomainEvent";

type RecetaCreadaDomainEventAttributes = {
  readonly id: number;
  readonly idProductoObtenido: number;
};

export class RecetaCreadaDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = "receta.creada";

  readonly id: number;
  readonly idProductoObtenido: number;

  constructor({
    aggregateId,
    eventId,
    occurredOn,
    id,
    idProductoObtenido,
  }: {
    aggregateId: string;
    eventId?: string;
    occurredOn?: Date;
    id: number;
    idProductoObtenido: number;
  }) {
    super({
      eventName: RecetaCreadaDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    });
    this.id = id;
    this.idProductoObtenido = idProductoObtenido;
  }

  toPrimitives(): RecetaCreadaDomainEventAttributes {
    const { id, idProductoObtenido } = this;
    return {
      id,
      idProductoObtenido,
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: RecetaCreadaDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new RecetaCreadaDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      id: attributes.id,
      idProductoObtenido: attributes.idProductoObtenido,
    });
  }
}
