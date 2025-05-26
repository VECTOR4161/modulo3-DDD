import { 
    AggregateRoot,
    RecetaId,
    RecetaIdProductoObtenido,
    RecetaCreadaDomainEvent
} from "..";

export class Receta extends AggregateRoot {
    readonly id: RecetaId;
    readonly idProductoObtenido: RecetaIdProductoObtenido;

    constructor(
        id: RecetaId,
        idProductoObtenido: RecetaIdProductoObtenido
    ) {
        super();
        this.id = id;
        this.idProductoObtenido = idProductoObtenido;
    }

    static create(
        id: RecetaId,
        idProductoObtenido: RecetaIdProductoObtenido
    ): Receta {
        const receta = new Receta(id, idProductoObtenido);

        receta.record(
            new RecetaCreadaDomainEvent({
                aggregateId: receta.id.toString(),
                id: receta.id.value,
                idProductoObtenido: receta.idProductoObtenido.value
            })
        );

        return receta;
    }

    static fromPrimitives(plainData: {
        id: number;
        idProductoObtenido: number;
    }): Receta {
        return new Receta(
            new RecetaId(plainData.id),
            new RecetaIdProductoObtenido(plainData.idProductoObtenido)
        );
    }

    toPrimitives() {
        return {
            id: this.id.value,
            idProductoObtenido: this.idProductoObtenido.value
        };
    }
}