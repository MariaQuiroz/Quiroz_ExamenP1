const express = require('express');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes/index');

const app = express();

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api', routes);

app.use(errorHandler);

module.exports = app;