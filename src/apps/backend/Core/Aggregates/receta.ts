import { 
    AggregateRoot,
    RecetaId,
    RecetaIdProductoObtenido,
    RecetaCreadaDomainEvent
} from "..";

export class Receta extends AggregateRoot {
    readonly id: RecetaId;
    readonly id_producto_obtenido: RecetaIdProductoObtenido;

    constructor(
        id: RecetaId,
        id_producto_obtenido: RecetaIdProductoObtenido
    ) {
        super();
        this.id = id;
        this.id_producto_obtenido = id_producto_obtenido;
    }

    static create(
        id: RecetaId,
        id_producto_obtenido: RecetaIdProductoObtenido
    ): Receta {
        const receta = new Receta(id, id_producto_obtenido);

        receta.record(
            new RecetaCreadaDomainEvent({
                aggregateId: receta.id.toString(),
                id: receta.id.value,
                id_producto_obtenido: receta.id_producto_obtenido.value
            })
        );

        return receta;
    }

    static fromPrimitives(plainData: {
        id: number;
        id_producto_obtenido: number;
    }): Receta {
        return new Receta(
            new RecetaId(plainData.id),
            new RecetaIdProductoObtenido(plainData.id_producto_obtenido)
        );
    }

    toPrimitives() {
        return {
            id: this.id.value,
            id_producto_obtenido: this.id_producto_obtenido.value
        };
    }
}