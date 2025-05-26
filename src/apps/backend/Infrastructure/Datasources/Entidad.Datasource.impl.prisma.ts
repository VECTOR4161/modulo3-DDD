import { CreateEntidadDto, EntidadDatasource, UpdateEntidadDto } from "../../Application";
import { Entidad } from "../../Core";

export class EntidadDatasourceImplPrisma implements EntidadDatasource{
    async save(crearEntidad: CreateEntidadDto): Promise<void> {
        return
    }
    async update(actualizarEntidad: UpdateEntidadDto): Promise<Entidad> {
        throw new Error("Method not implemented.")
    }
    getById(id: number): Promise<Entidad> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Array<Entidad>> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}