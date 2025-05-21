import { CreatePersonaDto, PersonaRepository } from "..";
import { RabbitMQPublisher } from "../../Infrastructure";

//* INTERFAZ DEL CASO DE USO
interface CrearPersonaUseCase{
    execute(createPersonaDto: CreatePersonaDto): Promise<void>
}

//* CASO DE USO CREAR PERSONA ENCARGADO DE GESTIONAR LA LOGICA DE APLICACION Y DE NOTIFICACION DE EVENTOS
export class CrearPersona implements CrearPersonaUseCase{
    constructor(
        private readonly personaRepository: PersonaRepository
    ){}
        
    async execute(createPersonaDto: CreatePersonaDto): Promise<void> {
        //* USAR EL REPOSITORIO
        await this.personaRepository.save(createPersonaDto);

        //* USAR EL COMMANDBUS
        const publisher = new RabbitMQPublisher();
        await publisher.connect();
        publisher.publish('prueba', 'Mensaje enviado desde caso de uso')

        //* REGRESAR EL RESULTADO DEL CASO DE USO
        return 
    }
}