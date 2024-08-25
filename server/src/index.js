const { createServer } = require('http');
const app = require('./app');
require('./database/dbMongo/mongoose');
const controller = require('./socketInit');
require('dotenv').config();
// ============================

const PORT = process.env.PORT || 3000;

const server = createServer(app);
server.listen(PORT, () =>  console.log(`Example app listening on port ${PORT}!`));
controller.createConnection(server);
