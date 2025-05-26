import { 
    AggregateRoot,
    InsumoId,
    InsumoNombre,
    InsumoPrecio,
    InsumoUnidades,
    InsumoIdProveedor,
    InsumoCreadoDomainEvent
} from "..";

export class Insumo extends AggregateRoot {
    readonly id: InsumoId;
    readonly nombre: InsumoNombre;
    readonly precio: InsumoPrecio;
    readonly unidades: InsumoUnidades;
    readonly idProveedor: InsumoIdProveedor;

    constructor(
        id: InsumoId,
        nombre: InsumoNombre,
        precio: InsumoPrecio,
        unidades: InsumoUnidades,
        idProveedor: InsumoIdProveedor
    ) {
        super();
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.unidades = unidades;
        this.idProveedor = idProveedor;
    }

    static create(
        id: InsumoId,
        nombre: InsumoNombre,
        precio: InsumoPrecio,
        unidades: InsumoUnidades,
        idProveedor: InsumoIdProveedor
    ): Insumo {
        const insumo = new Insumo(id, nombre, precio, unidades, idProveedor);

        insumo.record(
            new InsumoCreadoDomainEvent({
                aggregateId: insumo.id.toString(),
                id: insumo.id.value,
                nombre: insumo.nombre.value,
                precio: insumo.precio.value,
                unidades: insumo.unidades.value,
                idProveedor: insumo.idProveedor.value
            })
        );

        return insumo;
    }

    static fromPrimitives(plainData: {
        id: number;
        nombre: string;
        precio: number;
        unidades: number;
        idProveedor: number;
    }): Insumo {
        return new Insumo(
            new InsumoId(plainData.id),
            new InsumoNombre(plainData.nombre),
            new InsumoPrecio(plainData.precio),
            new InsumoUnidades(plainData.unidades),
            new InsumoIdProveedor(plainData.idProveedor)
        );
    }

    toPrimitives() {
        return {
            id: this.id.value,
            nombre: this.nombre.value,
            precio: this.precio.value,
            unidades: this.unidades.value,
            idProveedor: this.idProveedor.value
        };
    }

    actualizarUnidades(nuevasUnidades: InsumoUnidades): void {
        Object.assign(this, { unidades: nuevasUnidades });
    }

    estaDisponible(): boolean {
        return this.unidades.value > 0;
    }
}