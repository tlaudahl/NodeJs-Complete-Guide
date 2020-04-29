require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', process.env.DB_PASSWORD, {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;