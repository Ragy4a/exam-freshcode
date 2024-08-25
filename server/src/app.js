const path = require('path');
const express = require('express');
const cors = require('cors');
const router = require('./router');
const handlerError = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use('/api', router);
app.use(handlerError);

module.exports = app