"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonaRepositoryImpl = void 0;
class PersonaRepositoryImpl {
    constructor(PersonaDatasource) {
        this.PersonaDatasource = PersonaDatasource;
    }
    save(crearPersona) {
        return this.PersonaDatasource.save(crearPersona);
    }
    update(id, actualizarPersona) {
        return this.PersonaDatasource.update(id, actualizarPersona);
    }
    getById(id) {
        return this.PersonaDatasource.getById(id);
    }
    getAll() {
        return this.PersonaDatasource.getAll();
    }
    deleteById(id) {
        return this.PersonaDatasource.deleteById(id);
    }
}
exports.PersonaRepositoryImpl = PersonaRepositoryImpl;
