"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const __1 = require("..");
class Usuario extends __1.AggregateRoot {
    constructor(id, idPersona, idRol, contrasena, borrado) {
        super();
        this.id = id;
        this.idPersona = idPersona;
        this.idRol = idRol;
        this.contrasena = contrasena;
        this.borrado = borrado;
    }
    static create(id, idPersona, idRol, contrasena, borrado) {
        const usuario = new Usuario(id, idPersona, idRol, contrasena, borrado);
        return usuario;
    }
    static fromPrimitives(plainData) {
        return new Usuario(new __1.UsuarioId(plainData.id), new __1.UsuarioIdPersona(plainData.idPersona), new __1.UsuarioIdRol(plainData.idRol), new __1.UsuarioContrasena(plainData.contrasena), new __1.UsuarioBorrado(plainData.borrado));
    }
    toPrimitives() {
        return {
            id: this.id.value,
            idPersona: this.idPersona.value,
            idRol: this.idRol.value,
            contrasena: this.contrasena.value,
            borrado: this.borrado.value
        };
    }
}
exports.Usuario = Usuario;
