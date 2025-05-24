"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("./Config");
const Presentation_1 = require("./Presentation");
(() => {
    main();
})();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            new Presentation_1.Server({
                port: Config_1.envs.PORT,
                routes: Presentation_1.AppRoutes.routes
            }).start();
        }
        catch (error) {
            throw new Error('Error al iniciar el servidor');
        }
    });
}
