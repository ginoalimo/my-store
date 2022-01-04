const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = 3000;
const { logErrors, errorHandler, boomHandler } = require('./middlewares/errorHandler');
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Nueva ruta en express');
});

routerApi(app);

app.use(logErrors);
app.use(boomHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
