
export class CreatePersonaDto{
    private constructor(
        public nombre: string,
        public apellidos: string,
        public telefono: string,
        public dni: string,
        public borrado: boolean
    ){}

    static create( object: {[key: string]: any}): [string?, CreatePersonaDto?]{
        let {
            nombre,
            apellidos,
            telefono,
            dni,
            borrado
        } = object

        if( !nombre ) return ['El nombre es requerido', undefined]
        if( !apellidos ) return ['Los apellidos es requerido', undefined]
        if( nombre.length > 50 ) return ['Los nombres son demasiado largos', undefined]
        if( apellidos.length > 50 ) return ['Los apellidos son demasiado largos', undefined]
        if(borrado == undefined) borrado = false
        
        return [undefined, new CreatePersonaDto(
            nombre,
            apellidos,
            telefono,
            dni,
            borrado
        )]
    }
}