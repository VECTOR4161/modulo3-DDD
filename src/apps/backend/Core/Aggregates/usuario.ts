import { 
    AggregateRoot, 
    UsuarioBorrado, 
    UsuarioContrasena, 
    UsuarioId, 
    UsuarioIdPersona, 
    UsuarioIdRol 
} from "..";

export class Usuario extends AggregateRoot{

    readonly id: UsuarioId;
    readonly idPersona: UsuarioIdPersona;
    readonly idRol: UsuarioId;
    readonly contrasena: UsuarioContrasena;
    readonly borrado: UsuarioBorrado;

    constructor(
        id: UsuarioId,
        idPersona: UsuarioIdPersona,
        idRol: UsuarioIdRol, 
        contrasena: UsuarioContrasena,
        borrado: UsuarioBorrado
    ){
        super()
        this.id = id
        this.idPersona = idPersona
        this.idRol = idRol
        this.contrasena = contrasena
        this.borrado = borrado
    }


    static create(
        id: UsuarioId,
        idPersona: UsuarioIdPersona,
        idRol: UsuarioIdRol, 
        contrasena: UsuarioContrasena,
        borrado: UsuarioBorrado
    ): Usuario{
        const usuario = new Usuario(id, idPersona, idRol, contrasena, borrado)
        return usuario
    }

    static fromPrimitives(plainData: {
        id: number,
        idPersona: number,
        idRol: number,
        contrasena: string,
        borrado: boolean
    }): Usuario{
        return new Usuario(
            new UsuarioId(plainData.id),
            new UsuarioIdPersona(plainData.idPersona),
            new UsuarioIdRol(plainData.idRol),
            new UsuarioContrasena(plainData.contrasena),
            new UsuarioBorrado(plainData.borrado)
        )
    }

    toPrimitives() {
        return {
            id: this.id.value,
            idPersona: this.idPersona.value,
            idRol: this.idRol.value,
            contrasena: this.contrasena.value,
            borrado: this.borrado.value
        }
    }

}