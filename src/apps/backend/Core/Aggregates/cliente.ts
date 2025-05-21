import { AggregateRoot, ClienteBorrado, ClienteId, ClienteIdPersona } from "..";


export class Cliente extends AggregateRoot{

    readonly id: ClienteId;
    readonly idPersona: ClienteIdPersona;
    readonly borrado: ClienteBorrado;


    constructor(
        id: ClienteId,
        idPersona: ClienteIdPersona,
        borrado: ClienteBorrado
    ){
        super();
        this.id = id,
        this.idPersona = idPersona,
        this.borrado = borrado
    }

    static create(
        id: ClienteId,
        idPersona: ClienteIdPersona,
        borrado: ClienteBorrado
    ): Cliente{
        const cliente = new Cliente(id, idPersona, borrado)
        return cliente
    };


    static fromPrimitives(plainData: {
        id: number,
        idPersona: number,
        borrado: boolean
    }): Cliente{
        return new Cliente(
            new ClienteId(plainData.id),
            new ClienteIdPersona(plainData.idPersona),
            new ClienteBorrado(plainData.borrado)
        );
    };

    toPrimitives() {
        return {
            id: this.id.value,
            idPersona: this.idPersona.value,
            borrado: this.borrado.value
        }
    }
}