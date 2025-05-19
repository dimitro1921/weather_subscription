const request = require('supertest');
const app = require('../index');
const { Subscription, sequelize } = require('../app/models');

describe('GET /api/confirm/:token', () => {
  let token;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    const sub = await Subscription.create({
      email: 'confirm@example.com',
      city: 'Kyiv',
      frequency: 'daily',
      token: 'confirm-token',
      confirmed: false
    });

    token = sub.token;
  });

  it('should confirm subscription with valid token', async () => {
    const res = await request(app).get(`/api/confirm/${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Subscription confirmed/i);
  });

  // 🔧 було: expect(...).toBe(400) — це невірно
  it('should return 404 for invalid token', async () => {
    const res = await request(app).get('/api/confirm/!!invalid!!');
    expect(res.statusCode).toBe(404);
  });

  it('should return 404 for non-existent token', async () => {
    const res = await request(app).get('/api/confirm/nonexistent-token');
    expect(res.statusCode).toBe(404);
  });
});
