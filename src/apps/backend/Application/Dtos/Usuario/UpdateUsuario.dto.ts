export class UpdateUsuarioDto{
    private constructor(
        public idPersona: number,
        public idRol: number,
        public contrasena: string,
        public borrado: boolean
    ){}

    static create( object: {[key: string]: any}): [string?, UpdateUsuarioDto?]{
        let {
            idPersona,
            idRol,
            contrasena,
            borrado
        } = object
        

        if(idPersona !== undefined) 
            if(typeof idPersona !== 'number') return ['El identificador de la persona debe ser numerico', undefined]

        if(idRol !== undefined)
            if(typeof idRol !== 'number') return ['El identificador del rol debe ser numerico', undefined] 
        
        if(contrasena !== undefined)
            if(typeof contrasena !== 'string') return ['La clave debe ser texto', undefined] 

        if( borrado !== undefined)
            if(typeof borrado !== 'boolean') return ['el borrado tiene un formato incorrecto', undefined]

        return [undefined, new UpdateUsuarioDto(
            idPersona,
            idRol,
            contrasena,
            borrado
        )]
    }
}