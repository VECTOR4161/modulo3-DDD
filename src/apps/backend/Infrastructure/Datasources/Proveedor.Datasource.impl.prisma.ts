import { CreateProveedorDto, ProveedorDatasource, UpdateProveedorDto } from "../../Application";
import { Proveedor } from "../../Core";

export class ProveedorDatasourceImplPrisma implements ProveedorDatasource{
    async save(crearProveedor: CreateProveedorDto): Promise<void> {
        return
    }
    async update(actualizarProveedor: UpdateProveedorDto): Promise<Proveedor> {
        throw new Error("Method not implemented.")
    }
    getById(id: number): Promise<Proveedor> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Array<Proveedor>> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}