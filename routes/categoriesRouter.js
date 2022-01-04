const express = require('express');
const faker = require('faker');
const router = express.Router();

router.get('/', (req, res) => {
  const users = [];
  const {size} = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    users.push({
      categoryName: faker.commerce.department(),
      company: faker.company.companyName(),
      image: faker.image.image(),
    });
  }
  res.json(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    categoryName: faker.commerce.department(),
    company: faker.company.companyName(),
    image: faker.image.image(),

  });
});


router.get('/:categoryID/products/:productID', (req, res) => {
  const { categoryID, productID } = req.params;
  res.json({
    categoryID,
    productID,
  });
});

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: 'Creation',
    data: body
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'Patched',
    data: body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    message: 'Deleted',
    id,
  });
});



module.exports = router;
