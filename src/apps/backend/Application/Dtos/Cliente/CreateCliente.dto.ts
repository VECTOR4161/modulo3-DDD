
export class CreateClienteDto{
    private constructor(
        public idPersona: string,
        public borrado: boolean,
    ){}

    static create( object: {[key: string]: any}): [string?, CreateClienteDto?]{
        let {
            idPersona,
            borrado,
        } = object

        if( !idPersona ) return ['La persona es necesaria', undefined]
        borrado = borrado ?? false
        
        return [undefined, new CreateClienteDto(
            idPersona,
            borrado
        )]
    }
}