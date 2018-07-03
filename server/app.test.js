const request = require('supertest');
const app = require('./app');

describe('AppServer', () => {
  it('shall respond with status 200 when the body is provided and parameter > 0.', async () => {
    const response = await request(app).post('/api/ping').send({ sieveNumber: 4 });
    expect(response.statusCode).toBe(200);
  });

  it('shall respond with status 200 when the body is provided and parameter is a numeric string.', async () => {
    const response = await request(app).post('/api/ping').send({ sieveNumber: '6' });
    expect(response.statusCode).toBe(200);
  });

  it('shall respond with a body of [3,5] when the body is provided and parameter = 10.', async () => {
    const response = await request(app).post('/api/ping').send({ sieveNumber: 10 });
    expect(response.body).toEqual([3, 5]);
  });

  it('shall respond with status 500 when the body is provided and parameter = 0.', async () => {
    const response = await request(app).post('/api/ping').send({ sieveNumber: 0 });
    expect(response.statusCode).toBe(500);
  });

  it('shall respond with status 500 when the body is provided and parameter < 0.', async () => {
    const response = await request(app).post('/api/ping').send({ sieveNumber: -50 });
    expect(response.statusCode).toBe(500);
  });

  it('shall respond with status 500 when the body is provided and parameter is a string.', async () => {
    const response = await request(app).post('/api/ping').send({ sieveNumber: 'a' });
    expect(response.statusCode).toBe(500);
  });

  it('shall respond with status 500 when the body is empty.', async () => {
    const response = await request(app).post('/api/ping').send({});
    expect(response.statusCode).toBe(500);
  });

  it('shall respond with status 500 when the body is null.', async () => {
    const response = await request(app).post('/api/ping').send(null);
    expect(response.statusCode).toBe(500);
  });
});
