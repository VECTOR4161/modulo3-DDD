import { NumberValueObject } from "../../../shared/domain";

/**
 * VALUE OBJECT: Precio del producto
 * TEORÍA DDD: Encapsula reglas de negocio de precio
 * INVARIANTES: Precio debe ser positivo
 */
export class ProductoPrecio extends NumberValueObject {
    constructor(value: number) {
        // BUSINESS RULE: Precio debe ser positivo
        if (value <= 0) {
            throw new Error('El precio debe ser mayor a cero');
        }
        super(value);
    }

    // BUSINESS METHODS: Comportamiento específico del precio
    aplicarDescuento(porcentaje: number): ProductoPrecio {
        if (porcentaje < 0 || porcentaje > 100) {
            throw new Error('El descuento debe estar entre 0 y 100%');
        }
        const nuevoPrecio = this.value * (1 - porcentaje / 100);
        return new ProductoPrecio(nuevoPrecio);
    }

    esProductoPremium(): boolean {
        return this.value >= 1000; // Regla de negocio: premium = $1000+
    }
}