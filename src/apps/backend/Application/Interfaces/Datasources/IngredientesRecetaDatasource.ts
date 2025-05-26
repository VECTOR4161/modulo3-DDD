import {
  CreateIngredientesRecetaDto,
  CreateRecetaCompletaDto,
  UpdateIngredientesRecetaDto,
} from "../..";
import { IngredientesReceta } from "../../../Core";

export abstract class IngredientesRecetaDatasource {
  abstract save(
    crearIngredientesReceta: CreateIngredientesRecetaDto
  ): Promise<IngredientesReceta>;
  abstract update(
    id: number,
    actualizarIngredientesReceta: UpdateIngredientesRecetaDto
  ): Promise<IngredientesReceta>;
  abstract getById(id: number): Promise<IngredientesReceta>;
  abstract getAll(): Promise<Array<IngredientesReceta>>;
  abstract deleteById(id: number): Promise<void>;
  abstract findByReceta(idReceta: number): Promise<Array<IngredientesReceta>>;
  abstract findByInsumo(idInsumo: number): Promise<Array<IngredientesReceta>>;
  abstract saveRecetaCompleta(
    createRecetaCompleta: CreateRecetaCompletaDto
  ): Promise<void>;
  abstract deleteByReceta(idReceta: number): Promise<void>;
}
