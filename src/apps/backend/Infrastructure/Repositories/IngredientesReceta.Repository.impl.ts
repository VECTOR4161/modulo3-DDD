import {
  CreateIngredientesRecetaDto,
  CreateRecetaCompletaDto,
  IngredientesRecetaDatasource,
  IngredientesRecetaRepository,
  UpdateIngredientesRecetaDto,
} from "../../Application";
import { IngredientesReceta } from "../../Core";

export class IngredientesRecetaRepositoryImpl
  implements IngredientesRecetaRepository
{
  constructor(
    private readonly ingredientesRecetaDatasource: IngredientesRecetaDatasource
  ) {}

  save(
    crearIngredientesReceta: CreateIngredientesRecetaDto
  ): Promise<IngredientesReceta> {
    return this.ingredientesRecetaDatasource.save(crearIngredientesReceta);
  }

  update(
    id: number,
    actualizarIngredientesReceta: UpdateIngredientesRecetaDto
  ): Promise<IngredientesReceta> {
    return this.ingredientesRecetaDatasource.update(
      id,
      actualizarIngredientesReceta
    );
  }

  getById(id: number): Promise<IngredientesReceta> {
    return this.ingredientesRecetaDatasource.getById(id);
  }

  getAll(): Promise<Array<IngredientesReceta>> {
    return this.ingredientesRecetaDatasource.getAll();
  }

  deleteById(id: number): Promise<void> {
    return this.ingredientesRecetaDatasource.deleteById(id);
  }

  findByReceta(idReceta: number): Promise<Array<IngredientesReceta>> {
    return this.ingredientesRecetaDatasource.findByReceta(idReceta);
  }

  findByInsumo(idInsumo: number): Promise<Array<IngredientesReceta>> {
    return this.ingredientesRecetaDatasource.findByInsumo(idInsumo);
  }

  saveRecetaCompleta(
    createRecetaCompleta: CreateRecetaCompletaDto
  ): Promise<void> {
    return this.ingredientesRecetaDatasource.saveRecetaCompleta(
      createRecetaCompleta
    );
  }

  deleteByReceta(idReceta: number): Promise<void> {
    return this.ingredientesRecetaDatasource.deleteByReceta(idReceta);
  }
}
