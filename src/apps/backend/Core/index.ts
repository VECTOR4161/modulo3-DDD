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

//? PRODUCTO
export * from './ValueObjects/Producto/ProductoId'
export * from './ValueObjects/Producto/ProductoNombre'
export * from './ValueObjects/Producto/ProductoDescripcion'
export * from './ValueObjects/Producto/ProductoPrecio'
export * from './ValueObjects/Producto/ProductoStock'
export * from './ValueObjects/Producto/ProductoBorrado'

//? INSUMO
export * from './ValueObjects/Insumo/InsumoId'
export * from './ValueObjects/Insumo/InsumoNombre'
export * from './ValueObjects/Insumo/InsumoPrecio'
export * from './ValueObjects/Insumo/InsumoUnidades'

//? RECETA
export * from './ValueObjects/Receta/RecetaId'
export * from './ValueObjects/Receta/RecetaIdProductoObtenido'

//? INGREDIENTES RECETA
export * from './ValueObjects/IngredientesReceta/IngredientesRecetaId'
export * from './ValueObjects/IngredientesReceta/IngredientesRecetaIdReceta'
export * from './ValueObjects/IngredientesReceta/IngredientesRecetaCantidad'
export * from './ValueObjects/IngredientesReceta/IngredientesRecetaIdInsumo'


//* EVENTS
//? PERSONA
export * from './Events/Persona/personaCreated'
//? CLIENTE
export * from './Events/Cliente/clienteCreated'
//? PRODUCTO
export * from './Events/Producto/productoCreated'
//? INSUMO
export * from './Events/Insumo/insumoCreated'
//? RECETA
export * from './Events/Receta/recetaCreated'
//? INGREDIENTES RECETA
export * from './Events/IngredientesReceta/ingredientesRecetaCreated'


//* AGREGADOS
export * from './Aggregates/persona'
export * from './Aggregates/cliente'
export * from './Aggregates/usuario'
export * from './Aggregates/producto'
export * from './Aggregates/insumo'
export * from './Aggregates/receta'
export * from './Aggregates/ingredientesReceta'
