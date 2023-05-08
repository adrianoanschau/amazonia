import express, { Application, json } from 'express';
import packageJson from '../package.json';

class App {
  private appName: string;
  private appVersion: string;
  private application: Application;

  constructor() {
    this.appName = process.env.APP_NAME || 'App';
    this.appVersion = packageJson.version;
    this.application = express();

    this.middlewares();
    this.root();
  }

  private get appNameAndVersion() {
    return `${this.appName} :: v${this.appVersion}`;
  }

  private middlewares() {
    this.application.use(json());
  }

  private root() {
    this.application.get('/', (req, res) => {
      res.send(this.appNameAndVersion);
    });
  }

  listen(port: number, host: string, callback?: (() => void) | undefined) {
    this.application.listen(port, host, callback);
  }
}

export const app = new App();
