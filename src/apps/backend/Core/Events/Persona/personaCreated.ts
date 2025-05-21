import { DomainEvent } from "../../DomainEvent";

//* ATRIBUTOS DEL AGREGADO CREADO
type PersonaCreadaDomainEventAttributes = {
  readonly id: number
  readonly nombres: string;
  readonly apellidos: string;
  readonly telefono: string;
  readonly dni: string;
  readonly borrado: boolean
};


//* EVENTO DE DOMINIO DE PERSONA CREADA
export class PersonaCreadaDomainEvent extends DomainEvent{

    //* NOMBRE DEL EVENTO PARA EL COMMANDBUS
    static readonly EVENT_NAME = 'persona.creada';

    //* VARIABLES DE CLASE
    readonly id: number;
    readonly nombres: string;
    readonly apellidos: string;
    readonly telefono: string;
    readonly dni: string;
    readonly borrado: boolean;

    //* CREACION DE LA INFORMACION DEL EVENTO Y DE LAS CARACTERISTICAS DEL AGREGADO
    constructor({
        aggregateId,
        eventId,
        occurredOn,
        id,
        nombres,
        apellidos,
        telefono,
        dni,
        borrado
        
    }: {
        aggregateId: string,
        eventId?: string,
        occurredOn?: Date,
        id: number,
        nombres: string,
        apellidos: string,
        telefono: string,
        dni: string,
        borrado: boolean
    }){
        //* USO DEL CONSTRUCTOR DE LA CLASE DOMAIN EVENT
        super({eventName: PersonaCreadaDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn});
        //* LLENADO DE LOS VALORES DE LA CLASE DEL EVENTO
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.dni = dni;
        this.borrado = borrado;
    } 


    //* CONVIERTE LA CLASE EN UN OBJETO CON VALORES PRIMITIVOS
    toPrimitives(): PersonaCreadaDomainEventAttributes {
        const { id,nombres, apellidos, telefono, dni, borrado } = this;
        return{
            id,
            nombres,
            apellidos,
            telefono,
            dni,
            borrado
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
      id: attributes.id,
      nombres: attributes.nombres,
      apellidos: attributes.apellidos,
      telefono: attributes.telefono,
      dni: attributes.dni,
      borrado: attributes.borrado
    });
  }
}