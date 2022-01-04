const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = 3000;
const { logErrors, errorHandler, boomHandler } = require('./middlewares/errorHandler');
const cors = require('cors');

app.use(express.json());

const whitelist = [ 'http://localhost:8080', 'https://ginoshop.netlify.app', 'http://localhost:3000' ];
const options = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}
app.use(cors(options));

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
