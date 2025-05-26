import {
  CreateInsumoDto,
  InsumoDatasource,
  InsumoRepository,
  UpdateInsumoDto,
} from "../../Application";
import { Insumo } from "../../Core";

export class InsumoRepositoryImpl implements InsumoRepository {
  constructor(private readonly insumoDatasource: InsumoDatasource) {}

  save(crearInsumo: CreateInsumoDto): Promise<Insumo> {
    return this.insumoDatasource.save(crearInsumo);
  }

  update(id: number, actualizarInsumo: UpdateInsumoDto): Promise<Insumo> {
    return this.insumoDatasource.update(id, actualizarInsumo);
  }

  getById(id: number): Promise<Insumo> {
    return this.insumoDatasource.getById(id);
  }

  getAll(): Promise<Array<Insumo>> {
    return this.insumoDatasource.getAll();
  }

  deleteById(id: number): Promise<void> {
    return this.insumoDatasource.deleteById(id);
  }

  findByNombre(nombre: string): Promise<Array<Insumo>> {
    return this.insumoDatasource.findByNombre(nombre);
  }

  findAvailable(): Promise<Array<Insumo>> {
    return this.insumoDatasource.findAvailable();
  }

  findByProveedor(idProveedor: number): Promise<Array<Insumo>> {
    return this.insumoDatasource.findByProveedor(idProveedor);
  }
}
