import { CommandPublisher, CreatePersonaDto, PersonaRepository } from "..";

//* INTERFAZ DEL CASO DE USO
interface CrearPersonaUseCase{
    execute(createPersonaDto: CreatePersonaDto): Promise<void>
}

console.log('El valor del publisher fuera es: ', CommandPublisher)
console.log('El valor del repositorio es de: ', PersonaRepository)

//* CASO DE USO CREAR PERSONA ENCARGADO DE GESTIONAR LA LOGICA DE APLICACION Y DE NOTIFICACION DE EVENTOS
export class CrearPersona implements CrearPersonaUseCase{
    constructor(
        private readonly personaRepository: PersonaRepository,
        private readonly commandPublisher: CommandPublisher
    ){}
        
    async execute(createPersonaDto: CreatePersonaDto): Promise<void> {
        //* USAR EL REPOSITORIO
        await this.personaRepository.save(createPersonaDto);

        console.log('El publisher en el metodo: ', CommandPublisher)

        //* USAR EL COMMANDBUS
        this.commandPublisher.connect();
        this.commandPublisher.publish('prueba', 'Prueba de caso de uso');
        // const publisher = new RabbitMQPublisher();
        // await publisher.connect();
        // publisher.publish('prueba', 'Mensaje enviado desde caso de uso')

        //* REGRESAR EL RESULTADO DEL CASO DE USO
        return 
    }
}