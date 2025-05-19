const request = require('supertest');
const app = require('../index');
const { Subscription, sequelize } = require('../app/models');

describe('GET /api/unsubscribe/:token', () => {
  let token;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    const sub = await Subscription.create({
      email: 'unsubscribe@example.com',
      city: 'Odesa',
      frequency: 'hourly',
      token: 'unsubscribe-token',
      confirmed: true
    });

    token = sub.token;
  });

  it('should unsubscribe with valid token', async () => {
    const res = await request(app).get(`/api/unsubscribe/${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Unsubscribed successfully/i);
  });

  it('should return 404 for non-existent token', async () => {
    const res = await request(app).get('/api/unsubscribe/unknown-token');
    expect(res.statusCode).toBe(404);
  });
});