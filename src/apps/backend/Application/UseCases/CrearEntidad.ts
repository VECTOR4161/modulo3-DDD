import { CreateEntidadDto, EntidadRepository } from "..";
import { RabbitMQPublisher } from "../../Infrastructure";

//* INTERFAZ DEL CASO DE USO
interface CrearEntidadUseCase{
    execute(createEntidadDto: CreateEntidadDto): Promise<void>
}

//* CASO DE USO CREAR ENTIDAD ENCARGADO DE GESTIONAR LA LOGICA DE APLICACION Y DE NOTIFICACION DE EVENTOS
export class CrearEntidad implements CrearEntidadUseCase{
    constructor(
        private readonly entidadRepository: EntidadRepository
    ){}
        
    async execute(createEntidadDto: CreateEntidadDto): Promise<void> {
        //* USAR EL REPOSITORIO
        await this.entidadRepository.save(createEntidadDto);

        //* USAR EL COMMANDBUS
        const publisher = new RabbitMQPublisher();
        await publisher.connect();
        publisher.publish('entidad_creada', 'Entidad creada desde caso de uso')

        //* REGRESAR EL RESULTADO DEL CASO DE USO
        return 
    }
}