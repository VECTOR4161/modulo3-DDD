import { DomainEvent } from "../DomainEvent";

//* ATRIBUTOS DEL AGREGADO CREADO
type PersonaCreadaDomainEventAttributes = {
  readonly nombres: string;
  readonly apellidos: string;
};


//* EVENTO DE DOMINIO DE PERSONA CREADA
export class PersonaCreadaDomainEvent extends DomainEvent{

    //* NOMBRE DEL EVENTO PARA EL COMMANDBUS
    static readonly EVENT_NAME = 'persona.creada';

    //* VARIABLES DE CLASE
    readonly nombres: string;
    readonly apellidos: string;

    //* CREACION DE LA INFORMACION DEL EVENTO Y DE LAS CARACTERISTICAS DEL AGREGADO
    constructor({
        aggregateId,
        eventId,
        occurredOn,
        nombres,
        apellidos,
        
    }: {
        aggregateId: string,
        eventId?: string,
        occurredOn?: Date,
        nombres: string,
        apellidos: string
    }){
        //* USO DEL CONSTRUCTOR DE LA CLASE DOMAIN EVENT
        super({eventName: PersonaCreadaDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn});
        //* LLENADO DE LOS VALORES DE LA CLASE DEL EVENTO
        this.nombres = nombres;
        this.apellidos = apellidos;
    } 


    //* CONVIERTE LA CLASE EN UN OBJETO CON VALORES PRIMITIVOS
    toPrimitives(): PersonaCreadaDomainEventAttributes {
        const { nombres, apellidos } = this;
        return{
            nombres,
            apellidos
        }
    }

    //* CONVIERTE DATOS PRIMITIVOS EN LA CLASE
    static fromPrimitives(params: {
    aggregateId: string;
    attributes: PersonaCreadaDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
    }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new PersonaCreadaDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      nombres: attributes.nombres,
      apellidos: attributes.apellidos
    });
  }
}