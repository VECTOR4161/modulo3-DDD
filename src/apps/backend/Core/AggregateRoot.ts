import { DomainEvent } from ".";

//* LA CLASE AGGREGATEROOT SE ENCARGA DE GESTIONAR LOS EVENTOS DE LA CAPA CORE
export abstract class AggregateRoot {
  private domainEvents: Array<DomainEvent>;

  constructor() {
    //* ARRAY DE EVENTOS VACIO AL INICIAR OPERACIONES
    this.domainEvents = [];
  }

  //* METODO PARA RETIRAR LOS EVENTOS DE DOMINIO Y LIMPIAR EL ARRAY DE EVENTOS.
  pullDomainEvents(): Array<DomainEvent> {
    const domainEvents = this.domainEvents.slice();
    this.domainEvents = [];
    return domainEvents;
  }

  //* METODO PARA ADICIONAR EVENTOS AL ARRAY DE EVENTOS
  record(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  abstract toPrimitives(): any;
}