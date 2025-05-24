export class CreateUsuarioDto{
    private constructor(
        public idPersona: number,
        public idRol: number,
        public contrasena: string,
        public borrado: boolean
    ){}

    static create( object: {[key: string]: any}): [string?, CreateUsuarioDto?]{
        let {
            idPersona,
            idRol,
            contrasena,
            borrado
        } = object
        

        if(!idPersona) return ['El identificador de persona es necesario', undefined]
        if(!idRol) return ['El identificador del rol es necesario', undefined]
        if(!contrasena) return ['La clave es necesaria', undefined]
        borrado = borrado ?? false


        return [undefined, new CreateUsuarioDto(
            idPersona,
            idRol,
            contrasena,
            borrado
        )]
    }
}