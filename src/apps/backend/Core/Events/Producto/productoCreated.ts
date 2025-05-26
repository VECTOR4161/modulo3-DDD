import { DomainEvent } from "../../DomainEvent";

/**
 * DOMAIN EVENT ATTRIBUTES
 * DDD Pattern: Estructura de datos del evento de dominio
 */
type ProductoCreadoDomainEventAttributes = {
    readonly id: number;
    readonly nombre: string;
    readonly descripcion: string;
    readonly precio: number;
    readonly stock: number;
    readonly borrado: boolean;
};

/**
 * DOMAIN EVENT: ProductoCreadoDomainEvent
 * DDD Pattern: Evento que representa "algo importante que pasó en el dominio"
 * Purpose: Notificar a otros bounded contexts sobre la creación de un producto
 */
export class ProductoCreadoDomainEvent extends DomainEvent {

    // EVENT IDENTIFIER
    static readonly EVENT_NAME = 'producto.creado';

    // EVENT PAYLOAD
    readonly id: number;
    readonly nombre: string;
    readonly descripcion: string;
    readonly precio: number;
    readonly stock: number;
    readonly borrado: boolean;

    /**
     * CONSTRUCTOR
     * DDD Pattern: Captura el estado del agregado en el momento del evento
     */
    constructor({
        aggregateId,
        eventId,
        occurredOn,
        id,
        nombre,
        descripcion,
        precio,
        stock,
        borrado
    }: {
        aggregateId: string;
        eventId?: string;
        occurredOn?: Date;
        id: number;
        nombre: string;
        descripcion: string;
        precio: number;
        stock: number;
        borrado: boolean;
    }) {
        super({ eventName: ProductoCreadoDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.borrado = borrado;
    }

    /**
     * SERIALIZATION
     * DDD Pattern: Convertir evento a primitivos para transporte
     */
    toPrimitives(): ProductoCreadoDomainEventAttributes {
        const { id, nombre, descripcion, precio, stock, borrado } = this;
        return {
            id,
            nombre,
            descripcion,
            precio,
            stock,
            borrado
        };
    }

    /**
     * DESERIALIZATION
     * DDD Pattern: Reconstruir evento desde primitivos
     */
    static fromPrimitives(params: {
        aggregateId: string;
        attributes: ProductoCreadoDomainEventAttributes;
        eventId: string;
        occurredOn: Date;
    }): DomainEvent {
        const { aggregateId, attributes, occurredOn, eventId } = params;
        return new ProductoCreadoDomainEvent({
            aggregateId,
            eventId,
            occurredOn,
            id: attributes.id,
            nombre: attributes.nombre,
            descripcion: attributes.descripcion,
            precio: attributes.precio,
            stock: attributes.stock,
            borrado: attributes.borrado
        });
    }
}