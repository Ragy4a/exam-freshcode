require('dotenv').config();

module.exports = {
  development: {
    database: process.env.MONGO_DB,
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
  },
  production: {
    database: process.env.MONGO_DB,
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
  }
};