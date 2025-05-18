require('dotenv').config();
const express = require('express');
const routes = require('./app/routes');
const { sequelize } = require('./app/models');

const app = express();
app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('Unable to connect to DB:', err));