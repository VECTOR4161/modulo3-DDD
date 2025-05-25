import { DomainEvent } from "../../DomainEvent";

type EntidadCreadaDomainEventAttributes = {
  readonly id: number;
  readonly idProveedor: number;
  readonly nombre: string;
  readonly nit: string;
  readonly telefono: string;
  readonly descripcion: string;
  readonly borrado: boolean;
};

export class EntidadCreadaDomainEvent extends DomainEvent{

    static readonly EVENT_NAME = 'entidad.creada';

    readonly id: number;
    readonly idProveedor: number;
    readonly nombre: string;
    readonly nit: string;
    readonly telefono: string;
    readonly descripcion: string;
    readonly borrado: boolean;

    constructor({
        aggregateId,
        eventId,
        occurredOn,
        id,
        idProveedor,
        nombre,
        nit,
        telefono,
        descripcion,
        borrado
    }: {
        aggregateId: string,
        eventId?: string,
        occurredOn?: Date,
        id: number,
        idProveedor: number,
        nombre: string,
        nit: string,
        telefono: string,
        descripcion: string,
        borrado: boolean
    }){
        super({eventName: EntidadCreadaDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn});
        this.id = id;
        this.idProveedor = idProveedor;
        this.nombre = nombre;
        this.nit = nit;
        this.telefono = telefono;
        this.descripcion = descripcion;
        this.borrado = borrado;
    }

    toPrimitives(): EntidadCreadaDomainEventAttributes {
        const {id, idProveedor, nombre, nit, telefono, descripcion, borrado} = this;
        return {
            id,
            idProveedor,
            nombre,
            nit,
            telefono,
            descripcion,
            borrado
        }
    }

    static fromPrimitives(params: {
        aggregateId: string;
        attributes: EntidadCreadaDomainEventAttributes;
        eventId: string;
        occurredOn: Date;
    }): DomainEvent {
        const { aggregateId, attributes, occurredOn, eventId } = params;
        return new EntidadCreadaDomainEvent({
            aggregateId,
            eventId,
            occurredOn,
            id: attributes.id,
            idProveedor: attributes.idProveedor,
            nombre: attributes.nombre,
            nit: attributes.nit,
            telefono: attributes.telefono,
            descripcion: attributes.descripcion,
            borrado: attributes.borrado
        })
    }
}