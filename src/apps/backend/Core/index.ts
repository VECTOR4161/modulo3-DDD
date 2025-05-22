//* DOMAIN
export * from './DomainEvent'
export * from './AggregateRoot'


//* VALUE OBJECTS
//? PERSONA
export * from './ValueObjects/Persona/PersonaId'
export * from './ValueObjects/Persona/PersonaNombre'
export * from './ValueObjects/Persona/PersonaApellidos'
export * from './ValueObjects/Persona/PersonaTelefono'
export * from './ValueObjects/Persona/PersonaDni'
export * from './ValueObjects/Persona/PersonaBorrado'

//? CLIENTE 
export * from './ValueObjects/Cliente/ClienteId'
export * from './ValueObjects/Cliente/ClienteIdPersona'
export * from './ValueObjects/Cliente/ClienteBorrado'

//? USUARIO
export * from './ValueObjects/Usuario/UsuarioId'
export * from './ValueObjects/Usuario/UsuarioIdPersona'
export * from './ValueObjects/Usuario/UsuarioIdRol'
export * from './ValueObjects/Usuario/UsuarioContrasena'
export * from './ValueObjects/Usuario/UsuarioBorrado'

//* EVENTS
//? PERSONA
export * from './Events/Persona/personaCreated'
//? CLIENTE
export * from './Events/Cliente/clienteCreated'

//* AGREGADOS
export * from './Aggregates/persona'
export * from './Aggregates/cliente'
export * from './Aggregates/usuario'

