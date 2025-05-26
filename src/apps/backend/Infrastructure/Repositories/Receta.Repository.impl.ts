import {
  CreateRecetaDto,
  RecetaDatasource,
  RecetaRepository,
  UpdateRecetaDto,
} from "../../Application";
import { Receta } from "../../Core";

export class RecetaRepositoryImpl implements RecetaRepository {
  constructor(private readonly recetaDatasource: RecetaDatasource) {}

  save(crearReceta: CreateRecetaDto): Promise<Receta> {
    return this.recetaDatasource.save(crearReceta);
  }

  update(id: number, actualizarReceta: UpdateRecetaDto): Promise<Receta> {
    return this.recetaDatasource.update(id, actualizarReceta);
  }

  getById(id: number): Promise<Receta> {
    return this.recetaDatasource.getById(id);
  }

  getAll(): Promise<Array<Receta>> {
    return this.recetaDatasource.getAll();
  }

  deleteById(id: number): Promise<void> {
    return this.recetaDatasource.deleteById(id);
  }

  findByProducto(idProducto: number): Promise<Array<Receta>> {
    return this.recetaDatasource.findByProducto(idProducto);
  }
}
