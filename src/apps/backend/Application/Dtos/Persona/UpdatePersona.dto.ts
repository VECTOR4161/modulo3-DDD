//* CLASE DTO ENCARGADA DE ESTANDARIZAR LOS CONTENIDOS QUE LLEGAN DESDE EL FRONTEND
export class UpdatePersonaDto{
    private constructor(
        public nombre?: string,
        public apellidos?: string,
        public telefono?: string,
        public dni?: string,
        public borrado?: boolean
    ){}

    //* METODO ESTATICO USADO PARA LA CREACION DEL DTO
    static create( object: {[key: string]: any}): [string?, UpdatePersonaDto?]{

        let {
            nombres,
            apellidos,
            telefono,
            dni,
            borrado
        } = object
        
        return [undefined, new UpdatePersonaDto(
            nombres,
            apellidos,
            telefono,
            dni,
            borrado
            )]
    }
}