import { NumberValueObject } from "../../../shared/domain";

/**
 * VALUE OBJECT: Cantidad en stock del producto
 */
export class ProductoStock extends NumberValueObject {
    constructor(value: number) {
        // BUSINESS RULE: Stock no puede ser negativo
        if (value < 0) {
            throw new Error('El stock no puede ser negativo');
        }
        super(value);
    }

    // BUSINESS METHODS: Comportamiento específico del stock
    estaDisponible(): boolean {
        return this.value > 0;
    }

    esBajoStock(): boolean {
        return this.value <= 5; // Regla de negocio: stock bajo = 5 o menos
    }
}