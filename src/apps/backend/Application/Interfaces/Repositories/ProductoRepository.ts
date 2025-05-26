import { CreateProductoDto, UpdateProductoDto } from "../..";
import { Producto } from "../../../Core";

export abstract class ProductoRepository {
    abstract save(crearProducto: CreateProductoDto): Promise<Producto>;
    abstract update(id: number, actualizarProducto: UpdateProductoDto): Promise<Producto>;
    abstract getById(id: number): Promise<Producto>;
    abstract getAll(): Promise<Array<Producto>>;
    abstract deleteById(id: number): Promise<void>;
    abstract findByNombre(nombre: string): Promise<Array<Producto>>;
    abstract findAvailable(): Promise<Array<Producto>>;
}