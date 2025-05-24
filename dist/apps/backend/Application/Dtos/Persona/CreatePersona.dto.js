"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePersonaDto = void 0;
//* CLASE DTO ENCARGADA DE ESTANDARIZAR LOS CONTENIDOS QUE LLEGAN DESDE EL FRONTEND
class CreatePersonaDto {
    constructor(nombres, apellidos) {
        this.nombres = nombres;
        this.apellidos = apellidos;
    }
    //* METODO ESTATICO USADO PARA LA CREACION DEL DTO
    static create(object) {
        let { nombres, apellidos, } = object;
        //* VERIFICACION DE LOS CAMPOS DIRECTAMENTE DESDE EL REQUEST
        if (!nombres)
            return ['El nombre es requerido', undefined];
        if (!apellidos)
            return ['Los apellidos es requerido', undefined];
        if (nombres.length > 50)
            return ['Los nombres son demasiado largos', undefined];
        if (apellidos.length > 50)
            return ['Los apellidos son demasiado largos', undefined];
        return [undefined, new CreatePersonaDto(nombres, apellidos)];
    }
}
exports.CreatePersonaDto = CreatePersonaDto;
