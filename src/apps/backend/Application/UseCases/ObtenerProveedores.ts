import { ProveedorRepository } from "..";
import { Proveedor } from "../../Core";

//* interfaz
interface ObtenerProveedoresUseCase{
    execute(): Promise<Array<Proveedor>>
}

//* Caso de uso obtener todos los proveedores
export class ObtenerProveedores implements ObtenerProveedoresUseCase{
    constructor(
        private readonly proveedorRepository: ProveedorRepository
    ){}
        
    async execute(): Promise<Array<Proveedor>> {
        return await this.proveedorRepository.getAll();
    }
}