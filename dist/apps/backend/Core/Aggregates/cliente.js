"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const __1 = require("..");
class Cliente extends __1.AggregateRoot {
    constructor(id, idPersona, borrado) {
        super();
        this.id = id,
            this.idPersona = idPersona,
            this.borrado = borrado;
    }
    static create(id, idPersona, borrado) {
        const cliente = new Cliente(id, idPersona, borrado);
        return cliente;
    }
    ;
    static fromPrimitives(plainData) {
        return new Cliente(new __1.ClienteId(plainData.id), new __1.ClienteIdPersona(plainData.idPersona), new __1.ClienteBorrado(plainData.borrado));
    }
    ;
    toPrimitives() {
        return {
            id: this.id.value,
            idPersona: this.idPersona.value,
            borrado: this.borrado.value
        };
    }
}
exports.Cliente = Cliente;
