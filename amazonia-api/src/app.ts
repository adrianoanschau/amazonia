import express, {
  Application,
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
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
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return res.status(500).json({ message: error.message });
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
