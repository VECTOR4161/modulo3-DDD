//* CLASE DTO ENCARGADA DE ESTANDARIZAR LOS CONTENIDOS QUE LLEGAN DESDE EL FRONTEND
export class UpdatePersonaDto{
    private constructor(
        public nombres?: string,
        public apellidos?: string
    ){}

    //* METODO ESTATICO USADO PARA LA CREACION DEL DTO
    static create( object: {[key: string]: any}): [string?, UpdatePersonaDto?]{

        let {
            nombres,
            apellidos
        } = object
        
        return [undefined, new UpdatePersonaDto(
            nombres,
            apellidos
            )]
    }
}