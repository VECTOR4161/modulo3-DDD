import { CreateEntidadDto, EntidadRepository } from "..";
import { RabbitMQPublisher } from "../../Infrastructure";

//* interfaz del caso de uso
interface CrearEntidadUseCase{
    execute(createEntidadDto: CreateEntidadDto): Promise<void>
}

//* caso de uso crear entidad
export class CrearEntidad implements CrearEntidadUseCase{
    constructor(
        private readonly entidadRepository: EntidadRepository
    ){}
        
    async execute(createEntidadDto: CreateEntidadDto): Promise<void> {
        //* Uusar el repositorio
        await this.entidadRepository.save(createEntidadDto);

        //* usar el commandbus
        const publisher = new RabbitMQPublisher();
        await publisher.connect();
        publisher.publish('entidad_creada', 'Entidad creada desde caso de uso')

        return 
    }
}