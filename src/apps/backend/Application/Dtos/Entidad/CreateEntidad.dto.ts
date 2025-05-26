//* Recibir y sanear contenido que llega desde el frontend
export class CreateEntidadDto{
    private constructor(
        public idProveedor: number,
        public nombre: string,
        public nit: string,
        public telefono: string,
        public descripcion: string,
        public borrado: boolean = false
    ){}

    static create( object: {[key: string]: any}): [string?, CreateEntidadDto?]{
        let {
            idProveedor,
            nombre,
            nit,
            telefono,
            descripcion,
            borrado = false
        } = object

        //* verificacion
        if( !idProveedor ) return ['El ID de proveedor es requerido', undefined]
        if( typeof idProveedor !== 'number' ) return ['El ID de proveedor debe ser un número', undefined]
        if( !nombre ) return ['El nombre es requerido', undefined]
        if( nombre.length > 200 ) return ['El nombre es demasiado largo (máximo 200 caracteres)', undefined]
        if( !nit ) return ['El NIT es requerido', undefined]
        if( nit.length > 20 ) return ['El NIT es demasiado largo (máximo 20 caracteres)', undefined]
        if( !telefono ) return ['El teléfono es requerido', undefined]
        if( telefono.length > 20 ) return ['El teléfono es demasiado largo (máximo 20 caracteres)', undefined]
        if( !descripcion ) return ['La descripción es requerida', undefined]
        if( typeof borrado !== 'boolean' ) return ['El campo borrado debe ser un booleano', undefined]
        
        return [undefined, new CreateEntidadDto(
            idProveedor,
            nombre,
            nit,
            telefono,
            descripcion,
            borrado
        )]
    }
}