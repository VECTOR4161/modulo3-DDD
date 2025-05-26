//* Recibir y sanear contenido que llega desde el frontend
export class CreateProveedorDto{
    private constructor(
        public idPersona: number,
        public borrado: boolean = false
    ){}

    //* Se usa para la creación del DTO
    static create( object: {[key: string]: any}): [string?, CreateProveedorDto?]{
        let {
            idPersona,
            borrado = false
        } = object

        //* verificación de campos
        if( !idPersona ) return ['El ID de persona es requerido', undefined]
        if( typeof idPersona !== 'number' ) return ['El ID de persona debe ser un número', undefined]
        if( typeof borrado !== 'boolean' ) return ['El campo borrado debe ser un booleano', undefined]
        
        return [undefined, new CreateProveedorDto(
            idPersona,
            borrado
        )]
    }
}