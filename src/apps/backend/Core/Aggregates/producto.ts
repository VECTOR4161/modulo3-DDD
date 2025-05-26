import {
  AggregateRoot,
  ProductoBorrado,
  ProductoCreadoDomainEvent,
  ProductoDescripcion,
  ProductoId,
  ProductoNombre,
  ProductoPrecio,
  ProductoStock,
} from "..";

export class Producto extends AggregateRoot {
  readonly id: ProductoId;
  readonly nombre: ProductoNombre;
  readonly descripcion: ProductoDescripcion;
  readonly precio: ProductoPrecio;
  readonly stock: ProductoStock;
  readonly borrado: ProductoBorrado;

  constructor(
    id: ProductoId,
    nombre: ProductoNombre,
    descripcion: ProductoDescripcion,
    precio: ProductoPrecio,
    stock: ProductoStock,
    borrado: ProductoBorrado
  ) {
    super();
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock;
    this.borrado = borrado;
  }

  static create(
    id: ProductoId,
    nombre: ProductoNombre,
    descripcion: ProductoDescripcion,
    precio: ProductoPrecio,
    stock: ProductoStock,
    borrado: ProductoBorrado
  ): Producto {
    const producto = new Producto(
      id,
      nombre,
      descripcion,
      precio,
      stock,
      borrado
    );

    producto.record(
      new ProductoCreadoDomainEvent({
        aggregateId: producto.id.toString(),
        id: producto.id.value,
        nombre: producto.nombre.value,
        descripcion: producto.descripcion.value,
        precio: producto.precio.value,
        stock: producto.stock.value,
        borrado: producto.borrado.value,
      })
    );

    return producto;
  }

  static fromPrimitives(plainData: {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    borrado: boolean;
  }): Producto {
    return new Producto(
      new ProductoId(plainData.id),
      new ProductoNombre(plainData.nombre),
      new ProductoDescripcion(plainData.descripcion),
      new ProductoPrecio(plainData.precio),
      new ProductoStock(plainData.stock),
      new ProductoBorrado(plainData.borrado)
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      nombre: this.nombre.value,
      descripcion: this.descripcion.value,
      precio: this.precio.value,
      stock: this.stock.value,
      borrado: this.borrado.value,
    };
  }

  actualizarStock(nuevoStock: ProductoStock): void {
    Object.assign(this, { stock: nuevoStock });
  }

  estaDisponible(): boolean {
    return this.stock.value > 0 && !this.borrado.value;
  }
}
