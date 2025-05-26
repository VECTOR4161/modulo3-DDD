import { CreateProductoDto, ProductoDatasource, ProductoRepository, UpdateProductoDto } from "../../Application";
import { Producto } from "../../Core";

/**
 * REPOSITORY IMPLEMENTATION: ProductoRepositoryImpl
 * DDD Pattern: Repository implementation that delegates to Datasource
 * Purpose: Adapter between Application and Infrastructure concerns
 */
export class ProductoRepositoryImpl implements ProductoRepository {

    constructor(
        private readonly productoDatasource: ProductoDatasource
    ) {}

    save(crearProducto: CreateProductoDto): Promise<Producto> {
        return this.productoDatasource.save(crearProducto);
    }

    update(id: number, actualizarProducto: UpdateProductoDto): Promise<Producto> {
        return this.productoDatasource.update(id, actualizarProducto);
    }

    getById(id: number): Promise<Producto> {
        return this.productoDatasource.getById(id);
    }

    getAll(): Promise<Array<Producto>> {
        return this.productoDatasource.getAll();
    }

    deleteById(id: number): Promise<void> {
        return this.productoDatasource.deleteById(id);
    }

    findByNombre(nombre: string): Promise<Array<Producto>> {
        return this.productoDatasource.findByNombre(nombre);
    }

    findAvailable(): Promise<Array<Producto>> {
        return this.productoDatasource.findAvailable();
    }
}