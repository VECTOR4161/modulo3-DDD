import { CreateInsumoDto, UpdateInsumoDto } from "../..";
import { Insumo } from "../../../Core";

export abstract class InsumoRepository {
  abstract save(crearInsumo: CreateInsumoDto): Promise<Insumo>;
  abstract update(
    id: number,
    actualizarInsumo: UpdateInsumoDto
  ): Promise<Insumo>;
  abstract getById(id: number): Promise<Insumo>;
  abstract getAll(): Promise<Array<Insumo>>;
  abstract deleteById(id: number): Promise<void>;
  abstract findByNombre(nombre: string): Promise<Array<Insumo>>;
  abstract findAvailable(): Promise<Array<Insumo>>;
  abstract findByProveedor(idProveedor: number): Promise<Array<Insumo>>;
}
