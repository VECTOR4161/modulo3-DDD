import { DomainEvent } from "../../DomainEvent";

type IngredientesRecetaCreadoDomainEventAttributes = {
    readonly id: number;
    readonly idReceta: number;
    readonly cantidad: number;
    readonly idInsumo: number;
};

export class IngredientesRecetaCreadoDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = 'ingredientes.receta.creado';

    readonly id: number;
    readonly idReceta: number;
    readonly cantidad: number;
    readonly idInsumo: number;

    constructor({
        aggregateId,
        eventId,
        occurredOn,
        id,
        idReceta,
        cantidad,
        idInsumo
    }: {
        aggregateId: string;
        eventId?: string;
        occurredOn?: Date;
        id: number;
        idReceta: number;
        cantidad: number;
        idInsumo: number;
    }) {
        super({ eventName: IngredientesRecetaCreadoDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
        this.id = id;
        this.idReceta = idReceta;
        this.cantidad = cantidad;
        this.idInsumo = idInsumo;
    }

    toPrimitives(): IngredientesRecetaCreadoDomainEventAttributes {
        const { id, idReceta, cantidad, idInsumo } = this;
        return {
            id,
            idReceta,
            cantidad,
            idInsumo
        };
    }

    static fromPrimitives(params: {
        aggregateId: string;
        attributes: IngredientesRecetaCreadoDomainEventAttributes;
        eventId: string;
        occurredOn: Date;
    }): DomainEvent {
        const { aggregateId, attributes, occurredOn, eventId } = params;
        return new IngredientesRecetaCreadoDomainEvent({
            aggregateId,
            eventId,
            occurredOn,
            id: attributes.id,
            idReceta: attributes.idReceta,
            cantidad: attributes.cantidad,
            idInsumo: attributes.idInsumo
        });
    }
}