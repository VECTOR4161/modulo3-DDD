import { CreateEntidadDto, EntidadDatasource, EntidadRepository, UpdateEntidadDto } from "../../Application";
import { Entidad } from "../../Core";

export class EntidadRepositoryImpl implements EntidadRepository{

    constructor(
        private readonly EntidadDatasource: EntidadDatasource
    ){}

    save(crearEntidad: CreateEntidadDto): Promise<void> {
        return this.EntidadDatasource.save(crearEntidad)
    }
    update(actualizarEntidad: UpdateEntidadDto, id: number): Promise<Entidad> {
        return this.EntidadDatasource.update(actualizarEntidad, id)
    }
    getById(id: number): Promise<Entidad> {
        return this.EntidadDatasource.getById(id)
    }
    getAll(): Promise<Array<Entidad>> {
        return this.EntidadDatasource.getAll()
    }
    deleteById(id: number): Promise<void> {
        return this.EntidadDatasource.deleteById(id)
    }
}