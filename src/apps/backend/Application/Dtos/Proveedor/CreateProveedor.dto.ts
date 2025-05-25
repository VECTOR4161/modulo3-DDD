//* CLASE DTO ENCARGADA DE ESTANDARIZAR LOS CONTENIDOS QUE LLEGAN DESDE EL FRONTEND
export class CreateProveedorDto{
    private constructor(
        public idPersona: number,
        public borrado: boolean = false
    ){}

    //* METODO ESTATICO USADO PARA LA CREACION DEL DTO
    static create( object: {[key: string]: any}): [string?, CreateProveedorDto?]{
        let {
            idPersona,
            borrado = false
        } = object

        //* VERIFICACION DE LOS CAMPOS DIRECTAMENTE DESDE EL REQUEST
        if( !idPersona ) return ['El ID de persona es requerido', undefined]
        if( typeof idPersona !== 'number' ) return ['El ID de persona debe ser un número', undefined]
        if( typeof borrado !== 'boolean' ) return ['El campo borrado debe ser un booleano', undefined]
        
        return [undefined, new CreateProveedorDto(
            idPersona,
            borrado
        )]
    }
}