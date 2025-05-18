require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./app/routes');
const { sequelize } = require('./app/models');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const bodyParser = require('body-parser');

const app = express();

// ✅ Гнучкий парсер, що підтримує json і form-encoded запити зі зламаними заголовками
app.use((req, res, next) => {
  const contentType = req.headers['content-type'] || '';

  if (contentType.includes('application/json')) {
    express.json()(req, res, (err) => {
      if (err) {
        console.warn('⚠️ JSON parse error. Fallback to urlencoded');
        express.urlencoded({ extended: true })(req, res, next);
      } else {
        next();
      }
    });
  } else {
    express.urlencoded({ extended: true })(req, res, next);
  }
});

// ✅ Додаткові сервіси
app.use(cors());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Database connected.');
    return sequelize.sync(); // опціонально: .sync({ alter: true }) для dev
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('Unable to start server:', err));
