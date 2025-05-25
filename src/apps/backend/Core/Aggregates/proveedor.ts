import { 
    AggregateRoot,
    ProveedorId,
    ProveedorIdPersona,
    ProveedorBorrado,
    ProveedorCreadoDomainEvent
} from "..";

export class Proveedor extends AggregateRoot{

    readonly id: ProveedorId;
    readonly idPersona: ProveedorIdPersona;
    readonly borrado: ProveedorBorrado;

    constructor(
        id: ProveedorId,
        idPersona: ProveedorIdPersona,
        borrado: ProveedorBorrado
    ){
        super();
        this.id = id;
        this.idPersona = idPersona;
        this.borrado = borrado;
    }

    static create(
        id: ProveedorId,
        idPersona: ProveedorIdPersona,
        borrado: ProveedorBorrado
    ): Proveedor{
        const proveedor = new Proveedor(id, idPersona, borrado);

        // Agregar evento de dominio
        proveedor.record(
            new ProveedorCreadoDomainEvent({
                aggregateId: proveedor.id.toString(),
                id: proveedor.id.value,
                idPersona: proveedor.idPersona.value,
                borrado: proveedor.borrado.value
            })
        );

        return proveedor;
    }

    static fromPrimitives(plainData: {
        id: number,
        idPersona: number,
        borrado: boolean
    }): Proveedor{
        return new Proveedor(
            new ProveedorId(plainData.id),
            new ProveedorIdPersona(plainData.idPersona),
            new ProveedorBorrado(plainData.borrado)
        );
    }

    toPrimitives() {
        return {
            id: this.id.value,
            idPersona: this.idPersona.value,
            borrado: this.borrado.value
        }
    }
}