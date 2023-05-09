import express, { Application, Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
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
    this.routes();
  }

  private middlewares() {
    this.application.use(
      cors({
        origin: '*',
        allowedHeaders: ['Accept', 'Content-Type'],
        methods: ['GET'],
      })
    );

    this.application.use(
      bodyParser.urlencoded({
        extended: false,
      })
    );

    this.application.use(bodyParser.json());
  }

  private routes() {
    this.application.get('/', (req, res) => {
      res.json({ name: this.appName, version: `v${this.appVersion}` });
    });
  }

  registerRouter(router: Router) {
    this.application.use(router);
  }

  listen(port: number, host: string, callback?: (() => void) | undefined) {
    this.application.listen(port, host, callback);
  }
}

export const app = new App();
