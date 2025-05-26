//* Recibir y sanear contenido que llega desde el frontend
export class UpdateEntidadDto{
    private constructor(
        public idProveedor?: number,
        public nombre?: string,
        public nit?: string,
        public telefono?: string,
        public descripcion?: string,
        public borrado?: boolean
    ){}

    static create( object: {[key: string]: any}): [string?, UpdateEntidadDto?]{

        let {
            idProveedor,
            nombre,
            nit,
            telefono,
            descripcion,
            borrado
        } = object

        //* validaciones
        if( idProveedor !== undefined && typeof idProveedor !== 'number' ) {
            return ['El ID de proveedor debe ser un número', undefined]
        }
        if( nombre !== undefined && nombre.length > 200 ) {
            return ['El nombre es demasiado largo (máximo 200 caracteres)', undefined]
        }
        if( nit !== undefined && nit.length > 20 ) {
            return ['El NIT es demasiado largo (máximo 20 caracteres)', undefined]
        }
        if( telefono !== undefined && telefono.length > 20 ) {
            return ['El teléfono es demasiado largo (máximo 20 caracteres)', undefined]
        }
        if( borrado !== undefined && typeof borrado !== 'boolean' ) {
            return ['El campo borrado debe ser un booleano', undefined]
        }
        
        return [undefined, new UpdateEntidadDto(
            idProveedor,
            nombre,
            nit,
            telefono,
            descripcion,
            borrado
        )]
    }
}