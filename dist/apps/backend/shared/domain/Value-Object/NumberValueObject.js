"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberValueObject = void 0;
const __1 = require("..");
class NumberValueObject extends __1.ValueObject {
    isBiggerThan(other) {
        return this.value > other.value;
    }
}
exports.NumberValueObject = NumberValueObject;
