

export class UpdateClienteDto{
    private constructor(
        public idPersona?: string,
        public borrado?: boolean,
    ){}

    static create( object: {[key: string]: any}): [string?, UpdateClienteDto?]{
        let {
            idPersona,
            borrado,
        } = object

        if( idPersona !== undefined )
            if( typeof idPersona !== 'number') return ['Valor incorrecto en identificador de persona', undefined]

        if( borrado !== undefined)
            if(typeof borrado !== 'boolean') ['Valor incorrecto en el valor de borrado', undefined] 
        
        return [undefined, new UpdateClienteDto(
            idPersona,
            borrado
        )]
    }
}