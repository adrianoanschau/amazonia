import express, { Application, Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import packageJson from '../package.json';

export class App {
  #appName: string;
  #appVersion: string;
  #application: Application;
  #beforeInitFunction: () => Promise<void>;

  constructor() {
    this.#appName = process.env.APP_NAME || 'App';
    this.#appVersion = packageJson.version;
    this.#application = express();

    this.middlewares();

    this.#beforeInitFunction = async () => {};
  }

  get appName() {
    return this.#appName;
  }

  get appVersion() {
    return this.#appVersion;
  }

  beforeInit(beforeInit: () => Promise<void>) {
    this.#beforeInitFunction = beforeInit;
  }

  private middlewares() {
    this.#application.use(
      cors({
        origin: '*',
        allowedHeaders: ['Accept', 'Content-Type'],
        methods: ['GET'],
      })
    );

    this.#application.use(
      bodyParser.urlencoded({
        extended: false,
      })
    );

    this.#application.use(bodyParser.json());
  }

  registerRouter(router: Router) {
    this.#application.use(router);
  }

  listen(port: number, host: string, callback = () => {}) {
    this.#application.listen(port, host, async () => {
      try {
        await this.#beforeInitFunction();

        callback();
      } catch (error) {
        throw new Error("API can't init");
      }
    });
  }
}
