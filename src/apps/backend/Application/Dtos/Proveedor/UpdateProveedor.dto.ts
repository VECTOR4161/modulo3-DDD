//* Recibir y sanear contenido que llega desde el frontend
export class UpdateProveedorDto{
    private constructor(
        public idPersona?: number,
        public borrado?: boolean
    ){}

     //* Se usa para la creación del DTO
    static create( object: {[key: string]: any}): [string?, UpdateProveedorDto?]{

        let {
            idPersona,
            borrado
        } = object

        //* validaciones
        if( idPersona !== undefined && typeof idPersona !== 'number' ) {
            return ['El ID de persona debe ser un número', undefined]
        }
        if( borrado !== undefined && typeof borrado !== 'boolean' ) {
            return ['El campo borrado debe ser un booleano', undefined]
        }
        
        return [undefined, new UpdateProveedorDto(
            idPersona,
            borrado
        )]
    }
}