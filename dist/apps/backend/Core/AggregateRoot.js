"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRoot = void 0;
//* LA CLASE AGGREGATEROOT SE ENCARGA DE GESTIONAR LOS EVENTOS DE LA CAPA CORE
class AggregateRoot {
    constructor() {
        //* ARRAY DE EVENTOS VACIO AL INICIAR OPERACIONES
        this.domainEvents = [];
    }
    //* METODO PARA RETIRAR LOS EVENTOS DE DOMINIO Y LIMPIAR EL ARRAY DE EVENTOS.
    pullDomainEvents() {
        const domainEvents = this.domainEvents.slice();
        this.domainEvents = [];
        return domainEvents;
    }
    //* METODO PARA ADICIONAR EVENTOS AL ARRAY DE EVENTOS
    record(event) {
        this.domainEvents.push(event);
    }
}
exports.AggregateRoot = AggregateRoot;
