import { DomainEvent } from "../../DomainEvent";

type RecetaCreadaDomainEventAttributes = {
  readonly id: number;
  readonly id_producto_obtenido: number;
};

export class RecetaCreadaDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = "receta.creada";

  readonly id: number;
  readonly id_producto_obtenido: number;

  constructor({
    aggregateId,
    eventId,
    occurredOn,
    id,
    id_producto_obtenido,
  }: {
    aggregateId: string;
    eventId?: string;
    occurredOn?: Date;
    id: number;
    id_producto_obtenido: number;
  }) {
    super({
      eventName: RecetaCreadaDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    });
    this.id = id;
    this.id_producto_obtenido = id_producto_obtenido;
  }

  toPrimitives(): RecetaCreadaDomainEventAttributes {
    const { id, id_producto_obtenido } = this;
    return {
      id,
      id_producto_obtenido,
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
      id_producto_obtenido: attributes.id_producto_obtenido,
    });
  }
}
