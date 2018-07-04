const request = require('supertest');
const app = require('./app');
const helper = require('./app.helper');

describe('AppServer', () => {
  it('shall respond with status 200 when the parameter is provided and parameter > 0.', async () => {
    const response = await request(app).get('/api/sieve-number/4');
    expect(response.statusCode).toBe(200);
  });

  it('shall respond with a body of [3,5] when the parameter is provided and parameter = 10.', async () => {
    const response = await request(app).get('/api/sieve-number/10');
    expect(response.body).toEqual([3, 5]);
  });

  it('shall respond with status 412 when the parameter is provided and parameter = 0.', async () => {
    const response = await request(app).get('/api/sieve-number/0');
    expect(response.statusCode).toBe(412);
  });

  it('shall respond with status 412 when the parameter is provided and parameter < 0.', async () => {
    const response = await request(app).get('/api/sieve-number/-50');
    expect(response.statusCode).toBe(412);
  });

  it('shall respond with status 412 when the parameter is provided and parameter is a letter.', async () => {
    const response = await request(app).get('/api/sieve-number/a');
    expect(response.statusCode).toBe(412);
  });

  it('shall respond with status 412 when the parameter is not provided.', async () => {
    const response = await request(app).get('/api/sieve-number');
    expect(response.statusCode).toBe(412);
  });

  it('shall respond with status 412 when the parameter is not provided.', async () => {
    const response = await request(app).get('/api/sieve-number');
    expect(response.statusCode).toBe(412);
  });

  it('shall respond with status 412 when the parameter exceeds max sieve.', async () => {
    const response = await request(app).get(`/api/sieve-number/${helper.MAX_SIEVE + 1}`);
    expect(response.statusCode).toBe(412);
  });
});
