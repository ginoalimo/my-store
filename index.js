const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Nueva ruta en express');
});

app.get('/products', (req, res) => {
  res.json([
    {
      name: 'Producto 1',
      price: '$100',
    },
    {
      name: 'Producto 2',
      price: '$200',
    },
  ]);
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Producto 1',
    price: '$100',
  });
})

app.get('/categories/:categoryID/products/:productID', (req, res) => {
  const { categoryID, productID } = req.params;
  res.json({
    categoryID,
    productID,
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
