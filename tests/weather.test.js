const request = require('supertest');
const app = require('../index');

describe('GET /api/weather', () => {
  it('should return weather for a valid city', async () => {
    const res = await request(app)
      .get('/api/weather')
      .query({ city: 'Lviv' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('temperature');
    expect(res.body).toHaveProperty('humidity');
    expect(res.body).toHaveProperty('description');
  });

  it('should return 400 if city is missing', async () => {
    const res = await request(app).get('/api/weather');
    expect(res.statusCode).toBe(400);
  });
});