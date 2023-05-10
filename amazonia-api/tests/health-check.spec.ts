import request from 'supertest';
import packageJson from '../package.json';
import { App } from '../src/app';
import appMock from './mocks/app.mock';

describe('Health Check (Root) endpoint', () => {
  let app: App;

  beforeAll(async () => {
    app = await appMock();
  });

  it('GET / => app name and version', async () => {
    const appName = process.env.APP_NAME || 'App';
    const appVersion = packageJson.version;

    return request(app.application)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toStrictEqual({
          name: appName,
          version: `v${appVersion}`,
        });
      });
  });
});
