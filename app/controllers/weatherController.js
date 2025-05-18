const { getWeather } = require('../services/weatherService');

exports.getWeather = async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const weather = await getWeather(city);
    return res.json(weather);
  } catch (error) {
    if (error.message === 'City not found') {
      return res.status(404).json({ error: 'City not found' });
    }
    return res.status(500).json({ error: error.message });
  }
};
