//* CLASE DTO ENCARGADA DE ESTANDARIZAR LOS CONTENIDOS QUE LLEGAN DESDE EL FRONTEND
export class UpdateProveedorDto{
    private constructor(
        public idPersona?: number,
        public borrado?: boolean
    ){}

    //* METODO ESTATICO USADO PARA LA CREACION DEL DTO
    static create( object: {[key: string]: any}): [string?, UpdateProveedorDto?]{

        let {
            idPersona,
            borrado
        } = object

        //* VALIDACIONES OPCIONALES
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