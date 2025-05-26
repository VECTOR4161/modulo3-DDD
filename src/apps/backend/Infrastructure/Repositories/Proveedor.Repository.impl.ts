import { CreateProveedorDto, ProveedorDatasource, ProveedorRepository, UpdateProveedorDto } from "../../Application";
import { Proveedor } from "../../Core";

export class ProveedorRepositoryImpl implements ProveedorRepository{

    constructor(
        private readonly ProveedorDatasource: ProveedorDatasource
    ){}

    save(crearProveedor: CreateProveedorDto): Promise<void> {
        return this.ProveedorDatasource.save(crearProveedor)
    }
    update(actualizarProveedor: UpdateProveedorDto): Promise<Proveedor> {
        return this.ProveedorDatasource.update(actualizarProveedor)
    }
    getById(id: number): Promise<Proveedor> {
        return this.ProveedorDatasource.getById(id)
    }
    getAll(): Promise<Array<Proveedor>> {
        return this.ProveedorDatasource.getAll()
    }
    deleteById(id: number): Promise<void> {
        return this.ProveedorDatasource.deleteById(id)
    }
}