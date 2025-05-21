import { envs } from "./Config";
import { AppRoutes, Server } from "./Presentation";


(() => {
    main();
})();

async function main() {
    try {
        new Server({
            port: envs.PORT,
            routes: AppRoutes.routes
        }).start();
    } catch (error) {
        throw new Error('Error al iniciar el servidor')
    }  
}