"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAdapter = void 0;
const client_1 = require("@prisma/client");
class PrismaAdapter {
    static crearConexion() {
        try {
            if (!PrismaAdapter.instance)
                this.instance = new client_1.PrismaClient();
            return this.instance;
        }
        catch (error) {
            console.log(error);
            throw new Error();
        }
    }
}
exports.PrismaAdapter = PrismaAdapter;
