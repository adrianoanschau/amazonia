import express, {
  Application,
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ValidationError } from 'joi';
import packageJson from '../package.json';

export class App {
  #appName: string;
  #appVersion: string;
  #application: Application;

  constructor() {
    this.#appName = process.env.APP_NAME || 'App';
    this.#appVersion = packageJson.version;
    this.#application = express();

    this.middlewares();
  }

  get appName() {
    return this.#appName;
  }

  get appVersion() {
    return this.#appVersion;
  }

  get application() {
    return this.#application;
  }

  private errorHandler(
    error: Error | ValidationError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const response = {
      status: 500,
      error: error.name,
      message: error.message,
    };
    if ('details' in error && error.name === 'ValidationError') {
      response.status = 400;
      response.message =
        'Invalid data entry, make sure to submit fields correctly.';
    }
    return res.status(response.status).json(response);
  }

  private middlewares() {
    this.#application.use(
      cors({
        origin: 'same-origin',
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

  registerRouters(routers: Array<Router>) {
    this.#application.use(...routers);
    // @ts-ignore
    this.#application.use(this.errorHandler);
  }

  async listen(port: number, host: string, callback = () => {}) {
    this.#application.listen(port, host, async () => {
      try {
        callback();
      } catch (error) {
        throw new Error("API can't init");
      }
    });
  }
}
