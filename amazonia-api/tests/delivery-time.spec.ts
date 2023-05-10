import request from 'supertest';
import { App } from '../src/app';
import appMock from './mocks/app.mock';

describe('Delivery Time endpoint', () => {
  let app: App;

  beforeAll(async () => {
    app = await appMock();
  });

  it('GET /delivery-time should return correct better path and cost', async () => {
    const search = new URLSearchParams();
    search.set('start_on', 'A1');
    search.set('object_location', 'H8');
    search.set('delivery_on', 'B1');

    const expectedCost = 398.16;
    const expectedPath = [
      'A1',
      'B1',
      'C1',
      'C2',
      'C3',
      'D3',
      'E3',
      'F3',
      'F4',
      'F5',
      'F6',
      'G6',
      'G7',
      'H7',
      'H8',
      'H7',
      'G7',
      'G6',
      'F6',
      'F5',
      'F4',
      'F3',
      'E3',
      'D3',
      'C3',
      'C2',
      'C1',
      'B1',
    ];

    return request(app.application)
      .get(`/delivery-time?${search.toString()}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toStrictEqual({
          path: expectedPath,
          cost: expectedCost,
        });
      });
  });

  it('GET /delivery-time should throw an validation error when input data incorrect', async () => {
    const search = new URLSearchParams();
    search.set('start_on', 'A1');
    search.set('object_location', 'H8');
    search.set('delivery_on', 'B');

    return request(app.application)
      .get(`/delivery-time?${search.toString()}`)
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toStrictEqual({
          status: 400,
          error: 'ValidationError',
          message: 'Invalid data entry, make sure to submit fields correctly.',
        });
      });
  });
});
