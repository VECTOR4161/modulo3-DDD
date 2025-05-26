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

//? proveedor
export * from './ValueObjects/Proveedor/ProveedorId'
export * from './ValueObjects/Proveedor/ProveedorIdPersona'
export * from './ValueObjects/Proveedor/ProveedorBorrado'

//? entidad
export * from './ValueObjects/Entidad/EntidadId'
export * from './ValueObjects/Entidad/EntidadIdProveedor'
export * from './ValueObjects/Entidad/EntidadNombre'
export * from './ValueObjects/Entidad/EntidadNit'
export * from './ValueObjects/Entidad/EntidadTelefono'
export * from './ValueObjects/Entidad/EntidadDescripcion'
export * from './ValueObjects/Entidad/EntidadBorrado'

//* EVENTS
//? PERSONA
export * from './Events/Persona/personaCreated'
//? CLIENTE
export * from './Events/Cliente/clienteCreated'
//? proveedor
export * from './Events/Proveedor/proveedorCreated'
//? Entidad
export * from './Events/Entidad/entidadCreated'

//* AGREGADOS
export * from './Aggregates/persona'
export * from './Aggregates/cliente'
export * from './Aggregates/usuario'
export * from './Aggregates/proveedor'
export * from './Aggregates/entidad'

