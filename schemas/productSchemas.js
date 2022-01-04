const joi = require('joi');

const id = joi.number().integer().min(0);
const name = joi.string().min(3).max(50);
const price = joi.number().integer().min(10);

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required()
});

const updateProductSchema = joi.object({
  name: name,
  price: price
});

const getProductSchema = joi.object({
  id: id.required()
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
