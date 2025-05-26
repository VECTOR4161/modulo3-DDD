import { ProveedorRepository } from "..";
import { Proveedor } from "../../Core";

//* interfaz
interface ObtenerProveedorPorIdUseCase{
    execute(id: number): Promise<Proveedor>
}

//* obtener proveedor por id
export class ObtenerProveedorPorId implements ObtenerProveedorPorIdUseCase{
    constructor(
        private readonly proveedorRepository: ProveedorRepository
    ){}
        
    async execute(id: number): Promise<Proveedor> {
        return await this.proveedorRepository.getById(id);
    }
}