
//* ESTA CLASE ES EL AGREGADO DE PERSONA COMO TAL
import { 
    AggregateRoot,
    PersonaApellidos, 
    PersonaBorrado, 
    PersonaCreadaDomainEvent, 
    PersonaDni, 
    PersonaId, 
    PersonaNombre, 
    PersonaTelefono
} from "..";


//* LA CLASE EXTIENDE DE AGGREGATE ROOT
export class Persona extends AggregateRoot{

    //* ATRIBUTOS DE LA CLASE PERSONA
    readonly id: PersonaId;
    readonly nombre: PersonaNombre;
    readonly apellidos: PersonaApellidos;
    readonly telefono: PersonaTelefono;
    readonly dni: PersonaDni;
    readonly borrado: PersonaBorrado;

    //* CONSTRUCTOR DE LA CLASE PERSONA
    constructor(
        id: PersonaId, 
        nombres: PersonaNombre, 
        apellidos: PersonaApellidos, 
        telefono: PersonaTelefono,
        dni: PersonaDni,
        borrado: PersonaBorrado
    ){
    super();
    this.id = id;
    this.nombre = nombres;
    this.apellidos = apellidos;
    this.telefono = telefono;
    this.dni = dni;
    this.borrado = borrado;
    }

    //* METODO PARA CREAR UNA PERSONA
    static create(
        id: PersonaId, 
        nombre: PersonaNombre, 
        apellidos: PersonaApellidos,
        telefono: PersonaTelefono,
        dni: PersonaDni,
        borrado: PersonaBorrado
    ): Persona {
    const persona = new Persona(id, nombre, apellidos, telefono, dni, borrado);

    //* EN ESTE APARTADO SE AGREGAN LOS EVENTOS DE DOMINIO AL ARRAY DE EVENTOS DE DOMINIO
    persona.record(
        new PersonaCreadaDomainEvent({
            aggregateId: persona.id.toString(),
            id: persona.id.value,
            nombres: persona.nombre.value,
            apellidos: persona.apellidos.value,
            telefono: persona.telefono.value,
            dni: persona.dni.value,
            borrado: persona.borrado.value
        })
    )
    return persona;
    }

    //* METODO PARA REGRESAR UNA PERSONA A TRAVES DE LA VERIFICACION DE SUS DATOS PRIMITIVOS
    static fromPrimitives(plainData: { 
        id: number; 
        nombre: string; 
        apellidos: string;
        telefono: string,
        dni: string,
        borrado: boolean
    }): Persona {
    return new Persona(
      new PersonaId(plainData.id),
      new PersonaNombre(plainData.nombre),
      new PersonaApellidos(plainData.apellidos),
      new PersonaTelefono(plainData.telefono),
      new PersonaDni(plainData.dni),
      new PersonaBorrado(plainData.borrado)
    );
    }  

    //* METODO PARA REGRESAR LA CLASE PERSONA EN UN OBJETO CON VALORES PRIMITIVOS
    toPrimitives() {
        return {
            id: this.id.value,
            nombres: this.nombre.value,
            apellidos: this.apellidos.value,
            telefono: this.telefono.value,
            dni: this.dni.value,
            borrado: this.borrado.value
        }
    }
}

