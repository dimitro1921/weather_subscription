const request = require('supertest');
const app = require('../index'); // тепер це express app
const { sequelize, Subscription } = require('../app/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(
    async () => {
  await sequelize.close();
});

describe('POST /api/subscribe', () => {
  it('should subscribe a new email', async () => {
    const res = await request(app)
      .post('/api/subscribe')
      .type('form')
      .send({
        email: 'test@example.com',
        city: 'Lviv',
        frequency: 'daily'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Confirmation email sent/);
  });

  it('should not allow duplicate emails', async () => {
    const res = await request(app)
      .post('/api/subscribe')
      .type('form')
      .send({
        email: 'test@example.com',
        city: 'Kyiv',
        frequency: 'hourly'
      });

    expect(res.statusCode).toBe(409);
    expect(res.body.error).toMatch(/already subscribed/);
  });

  it('should return 400 on missing fields', async () => {
    const res = await request(app)
      .post('/api/subscribe')
      .type('form')
      .send({
        email: '',
        city: '',
        frequency: ''
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/Missing fields/);
  });
});
