import { CreateRecetaDto, UpdateRecetaDto } from "../..";
import { Receta } from "../../../Core";

export abstract class RecetaDatasource {
  abstract save(crearReceta: CreateRecetaDto): Promise<Receta>;
  abstract update(
    id: number,
    actualizarReceta: UpdateRecetaDto
  ): Promise<Receta>;
  abstract getById(id: number): Promise<Receta>;
  abstract getAll(): Promise<Array<Receta>>;
  abstract deleteById(id: number): Promise<void>;
  abstract findByProducto(idProducto: number): Promise<Array<Receta>>;
}
