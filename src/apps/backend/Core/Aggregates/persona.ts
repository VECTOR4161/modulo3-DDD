
//* ESTA CLASE ES EL AGREGADO DE PERSONA COMO TAL
import { 
    AggregateRoot,
    PersonaApellidos, 
    PersonaCreadaDomainEvent, 
    PersonaId, 
    PersonaNombre 
} from "..";

//* LA CLASE EXTIENDE DE AGGREGATE ROOT
export class Persona extends AggregateRoot{
    //* ATRIBUTOS DE LA CLASE PERSONA
    readonly id: PersonaId;
    readonly nombres: PersonaNombre;
    readonly apellidos: PersonaApellidos;

    //* CONSTRUCTOR DE LA CLASE PERSONA
    constructor(id: PersonaId, nombres: PersonaNombre, apellidos: PersonaApellidos){
    super();
    this.id = id;
    this.nombres = nombres;
    this.apellidos = apellidos;
    }

    //* METODO PARA CREAR UNA PERSONA
    static create(id: PersonaId, nombre: PersonaNombre, apellidos: PersonaApellidos): Persona {
    const persona = new Persona(id, nombre, apellidos);

    //* EN ESTE APARTADO SE AGREGAN LOS EVENTOS DE DOMINIO AL ARRAY DE EVENTOS DE DOMINIO
    persona.record(
        new PersonaCreadaDomainEvent({
            aggregateId: persona.id.toString(),
            nombres: persona.nombres.value,
            apellidos: persona.apellidos.value
        })
    )
    return persona;
    }

    //* METODO PARA REGRESAR UNA PERSONA A TRAVES DE LA VERIFICACION DE SUS DATOS PRIMITIVOS
    static fromPrimitives(plainData: { id: number; nombre: string; apellidos: string }): Persona {
    return new Persona(
      new PersonaId(plainData.id),
      new PersonaNombre(plainData.nombre),
      new PersonaApellidos(plainData.apellidos)
    );
    }  

    //* METODO PARA REGRESAR LA CLASE PERSONA EN UN OBJETO CON VALORES PRIMITIVOS
    toPrimitives() {
        return {
            id: this.id.value,
            nombres: this.nombres.value,
            apellidos: this.apellidos.value
        }
    }
}

