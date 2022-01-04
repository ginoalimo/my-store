const express = require('express');
const ProductServices = require('../services/productServices');
const { validatorHandler } = require('../middlewares/validatorHandler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/productSchemas');

const router = express.Router();
const service = new ProductServices();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.status(200).json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});
// Antes de ejecutar la busqueda por ID, llamamos al validatorHandler
router.get('/:id',
  validatorHandler( getProductSchema, 'params'),
    async (req, res, next) => {
      try {
        const { id } = req.params;
      const product = await service.findOne(parseInt(id));
      res.json(product);
      } catch (error) {
        next(error);
      }
});

router.post('/',
  validatorHandler( createProductSchema, 'body'),
    async (req, res) => {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
});

router.patch('/:id',
  validatorHandler( getProductSchema, 'params'),
    validatorHandler( updateProductSchema, 'body'),
      async (req, res, next) => {
        try {
          const { id } = req.params;
          const body = req.body;
          const product = await service.update(parseInt(id), body);
          res.status(200).json(product);
        } catch (error) {
          next(error);
        }
});

router.delete('/:id',
  validatorHandler( getProductSchema, 'params'),
    async (req, res) => {
      const { id } = req.params;
      const product = await service.delete(parseInt(id));
      res.json(product);
});

module.exports = router;
