require('dotenv').config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: process.env.POSTGRES_USER,
    operatorsAliases: 'Op',
    migrationStorage: 'json',
    seederStorage: 'json',
  },
  test: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'squad-help-test',
    host: 'localhost',
    dialect: process.env.POSTGRES_USER,
    operatorsAliases: 'Op',
    seederStorage: 'sequelize'
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'squad-help-prod',
    host: 'localhost',
    dialect: process.env.POSTGRES_USER,
    operatorsAliases: 'Op',
    seederStorage: 'sequelize'
  }
};