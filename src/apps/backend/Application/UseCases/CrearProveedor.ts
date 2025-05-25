import { CreateProveedorDto, ProveedorRepository } from "..";
import { RabbitMQPublisher } from "../../Infrastructure";

//* INTERFAZ DEL CASO DE USO
interface CrearProveedorUseCase{
    execute(createProveedorDto: CreateProveedorDto): Promise<void>
}

//* CASO DE USO CREAR PROVEEDOR ENCARGADO DE GESTIONAR LA LOGICA DE APLICACION Y DE NOTIFICACION DE EVENTOS
export class CrearProveedor implements CrearProveedorUseCase{
    constructor(
        private readonly proveedorRepository: ProveedorRepository
    ){}
        
    async execute(createProveedorDto: CreateProveedorDto): Promise<void> {
        //* USAR EL REPOSITORIO
        await this.proveedorRepository.save(createProveedorDto);

        //* USAR EL COMMANDBUS
        const publisher = new RabbitMQPublisher();
        await publisher.connect();
        publisher.publish('proveedor_creado', 'Proveedor creado desde caso de uso')

        //* REGRESAR EL RESULTADO DEL CASO DE USO
        return 
    }
}