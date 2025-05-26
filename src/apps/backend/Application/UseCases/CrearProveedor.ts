import { CreateProveedorDto, ProveedorRepository } from "..";
import { RabbitMQPublisher } from "../../Infrastructure";

//* interfaz del caso de uso
interface CrearProveedorUseCase{
    execute(createProveedorDto: CreateProveedorDto): Promise<void>
}

//* caso de uso crear proveedor 
export class CrearProveedor implements CrearProveedorUseCase{
    constructor(
        private readonly proveedorRepository: ProveedorRepository
    ){}
        
    async execute(createProveedorDto: CreateProveedorDto): Promise<void> {
        //* usar el repositorio
        await this.proveedorRepository.save(createProveedorDto);

        //* usar el commandbus
        const publisher = new RabbitMQPublisher();
        await publisher.connect();
        publisher.publish('proveedor_creado', 'Proveedor creado desde caso de uso')

        //* regresar el resultado del caso de uso
        return 
    }
}