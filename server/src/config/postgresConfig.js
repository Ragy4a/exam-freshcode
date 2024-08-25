require('dotenv').config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    operatorsAliases: 'Op',
    seederStorage: 'sequelize'
  },
  test: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'squad-help-test',
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: 'Op',
    seederStorage: 'sequelize'
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'squad-help-prod',
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: 'Op',
    seederStorage: 'sequelize'
  }
};