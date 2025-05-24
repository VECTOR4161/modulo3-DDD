"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePersonaDto = void 0;
//* CLASE DTO ENCARGADA DE ESTANDARIZAR LOS CONTENIDOS QUE LLEGAN DESDE EL FRONTEND
class UpdatePersonaDto {
    constructor(nombres, apellidos) {
        this.nombres = nombres;
        this.apellidos = apellidos;
    }
    //* METODO ESTATICO USADO PARA LA CREACION DEL DTO
    static create(object) {
        let { nombres, apellidos } = object;
        return [undefined, new UpdatePersonaDto(nombres, apellidos)];
    }
}
exports.UpdatePersonaDto = UpdatePersonaDto;
