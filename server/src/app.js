const path = require('path');
const express = require('express');
const cors = require('cors');
const router = require('./router');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('..', process.env.STATIC_PATH)));
app.use('/api', router);
app.use(errorHandler);

module.exports = app