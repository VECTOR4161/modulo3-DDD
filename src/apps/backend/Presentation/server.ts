import express, { Router } from 'express';
import cors from 'cors';

interface Options {
    port?: number,
    routes: Router
}

//* SERVIDOR DE APLICACION DEL BOUNDED CONTEXT
export class Server {


    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router

    constructor(options: Options) {

        const { port = 3000, routes } = options;

        this.port = port;
        this.routes = routes;
    }

    //* INICIADOR DE LAS FUNCIONES DE SERVIDOR
    async start() {

        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(this.routes);
        this.app.listen(this.port, () => {
            console.log(`Servidor ejecutandose en el puerto ${this.port}`)
        });
    }
}