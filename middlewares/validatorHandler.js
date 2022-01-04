const boom = require('@hapi/boom');

function validatorHandler( schema, property) {
  // retornar una funcion de tipo closure, parecido a un middleware
  return ( req, res, next ) => {
    // validar el req.body o req.query o req.params, dependiendo de la propiedad del middlware si es POST, GET, PATCH, DELETE
    // Pero como no sabemos cual sera, lo mejor seria pasarlo de forma dinamica utilizando req[property]
    // utlizamos { error } porque es una propiedad de la validacion de joi.
    const { error } = schema.validate(req[property]);
    // si hay un error, lo manejamos con boom
    if ( error ) {
      next(boom.badRequest(error));
    }
    // si no hay error, continuamos con el siguiente middleware
    else {
      next();
    }
  }
}

module.exports = { validatorHandler };
