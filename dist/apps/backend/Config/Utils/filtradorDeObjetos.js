"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filtradorDeObjetos = void 0;
class filtradorDeObjetos {
    static filtrarDto(object) {
        return Object.fromEntries(Object.entries(object).filter(([_, v]) => v !== undefined));
    }
}
exports.filtradorDeObjetos = filtradorDeObjetos;
