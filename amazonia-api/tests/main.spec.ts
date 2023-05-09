import request from 'supertest';
import main from '../src/main';
import packageJson from '../package.json';

describe('Health Check', () => {
  it('GET / => app name and version', async () => {
    const appName = process.env.APP_NAME || 'App';
    const appVersion = packageJson.version;

    return request(main.application)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          name: appName,
          version: `v${appVersion}`,
        });
      });
  });
});
