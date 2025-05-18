const express = require('express');
const router = express.Router();

const weatherController = require('../controllers/weatherController');
const subscriptionController = require('../controllers/subscriptionController');

router.get('/weather', weatherController.getWeather);
router.post('/subscribe', subscriptionController.subscribe);
router.get('/confirm/:token', subscriptionController.confirm);
router.get('/unsubscribe/:token', subscriptionController.unsubscribe);

module.exports = router;
