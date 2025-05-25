import { 
    AggregateRoot,
    EntidadId,
    EntidadIdProveedor,
    EntidadNombre,
    EntidadNit,
    EntidadTelefono,
    EntidadDescripcion,
    EntidadBorrado,
    EntidadCreadaDomainEvent
} from "..";

export class Entidad extends AggregateRoot{

    readonly id: EntidadId;
    readonly idProveedor: EntidadIdProveedor;
    readonly nombre: EntidadNombre;
    readonly nit: EntidadNit;
    readonly telefono: EntidadTelefono;
    readonly descripcion: EntidadDescripcion;
    readonly borrado: EntidadBorrado;

    constructor(
        id: EntidadId,
        idProveedor: EntidadIdProveedor,
        nombre: EntidadNombre,
        nit: EntidadNit,
        telefono: EntidadTelefono,
        descripcion: EntidadDescripcion,
        borrado: EntidadBorrado
    ){
        super();
        this.id = id;
        this.idProveedor = idProveedor;
        this.nombre = nombre;
        this.nit = nit;
        this.telefono = telefono;
        this.descripcion = descripcion;
        this.borrado = borrado;
    }

    static create(
        id: EntidadId,
        idProveedor: EntidadIdProveedor,
        nombre: EntidadNombre,
        nit: EntidadNit,
        telefono: EntidadTelefono,
        descripcion: EntidadDescripcion,
        borrado: EntidadBorrado
    ): Entidad{
        const entidad = new Entidad(id, idProveedor, nombre, nit, telefono, descripcion, borrado);

        // Agregar evento de dominio
        entidad.record(
            new EntidadCreadaDomainEvent({
                aggregateId: entidad.id.toString(),
                id: entidad.id.value,
                idProveedor: entidad.idProveedor.value,
                nombre: entidad.nombre.value,
                nit: entidad.nit.value,
                telefono: entidad.telefono.value,
                descripcion: entidad.descripcion.value,
                borrado: entidad.borrado.value
            })
        );

        return entidad;
    }

    static fromPrimitives(plainData: {
        id: number,
        idProveedor: number,
        nombre: string,
        nit: string,
        telefono: string,
        descripcion: string,
        borrado: boolean
    }): Entidad{
        return new Entidad(
            new EntidadId(plainData.id),
            new EntidadIdProveedor(plainData.idProveedor),
            new EntidadNombre(plainData.nombre),
            new EntidadNit(plainData.nit),
            new EntidadTelefono(plainData.telefono),
            new EntidadDescripcion(plainData.descripcion),
            new EntidadBorrado(plainData.borrado)
        );
    }

    toPrimitives() {
        return {
            id: this.id.value,
            idProveedor: this.idProveedor.value,
            nombre: this.nombre.value,
            nit: this.nit.value,
            telefono: this.telefono.value,
            descripcion: this.descripcion.value,
            borrado: this.borrado.value
        }
    }
}