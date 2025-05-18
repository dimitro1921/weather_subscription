require('dotenv').config();

module.exports = {
  DB_NAME: process.env.DB_NAME || 'weather_db',
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASS: process.env.DB_PASS || 'postgres',
  DB_HOST: process.env.DB_HOST || 'localhost'
};
