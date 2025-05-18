const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeather(city) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });

    const data = response.data;
    return {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description
    };
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('City not found');
    }
    throw new Error('Failed to fetch weather data');
  }
}

module.exports = { getWeather };
