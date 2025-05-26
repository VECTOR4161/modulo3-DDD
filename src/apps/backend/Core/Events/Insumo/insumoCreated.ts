import { DomainEvent } from "../../DomainEvent";

type InsumoCreadoDomainEventAttributes = {
  readonly id: number;
  readonly nombre: string;
  readonly precio: number;
  readonly unidades: number;
  readonly idProveedor: number;
};

export class InsumoCreadoDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = "insumo.creado";

  readonly id: number;
  readonly nombre: string;
  readonly precio: number;
  readonly unidades: number;
  readonly idProveedor: number;

  constructor({
    aggregateId,
    eventId,
    occurredOn,
    id,
    nombre,
    precio,
    unidades,
    idProveedor,
  }: {
    aggregateId: string;
    eventId?: string;
    occurredOn?: Date;
    id: number;
    nombre: string;
    precio: number;
    unidades: number;
    idProveedor: number;
  }) {
    super({
      eventName: InsumoCreadoDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    });
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.unidades = unidades;
    this.idProveedor = idProveedor;
  }

  toPrimitives(): InsumoCreadoDomainEventAttributes {
    const { id, nombre, precio, unidades, idProveedor } = this;
    return {
      id,
      nombre,
      precio,
      unidades,
      idProveedor,
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: InsumoCreadoDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new InsumoCreadoDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      id: attributes.id,
      nombre: attributes.nombre,
      precio: attributes.precio,
      unidades: attributes.unidades,
      idProveedor: attributes.idProveedor,
    });
  }
}
