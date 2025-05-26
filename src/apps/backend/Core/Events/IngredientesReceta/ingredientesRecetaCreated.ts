import { DomainEvent } from "../../DomainEvent";

type IngredientesRecetaCreadoDomainEventAttributes = {
    readonly id: number;
    readonly idReceta: number;
    readonly cantidad: number;
    readonly id_insumo: number;
};

export class IngredientesRecetaCreadoDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = 'ingredientes.receta.creado';

    readonly id: number;
    readonly idReceta: number;
    readonly cantidad: number;
    readonly id_insumo: number;

    constructor({
        aggregateId,
        eventId,
        occurredOn,
        id,
        idReceta,
        cantidad,
        id_insumo
    }: {
        aggregateId: string;
        eventId?: string;
        occurredOn?: Date;
        id: number;
        idReceta: number;
        cantidad: number;
        id_insumo: number;
    }) {
        super({ eventName: IngredientesRecetaCreadoDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
        this.id = id;
        this.idReceta = idReceta;
        this.cantidad = cantidad;
        this.id_insumo = id_insumo;
    }

    toPrimitives(): IngredientesRecetaCreadoDomainEventAttributes {
        const { id, idReceta, cantidad, id_insumo } = this;
        return {
            id,
            idReceta,
            cantidad,
            id_insumo
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
            id_insumo: attributes.id_insumo
        });
    }
}