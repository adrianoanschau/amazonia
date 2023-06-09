import { Router } from 'express';
import { App } from './app';
import { HttpClient } from './core/http-client';
import { DeliveryTimeData } from './data/delivery-time.data';
import { DeliveryTimeRouter } from './routers/delivery-time.router';
import { DeliveryTimeService } from './services/delivery-time.service';

const main = async function (app: App) {
  const deliveryTimeData = new DeliveryTimeData(
    new HttpClient(process.env.DELIVERY_TIMES_API)
  );

  const deliveryTimeRouter = new DeliveryTimeRouter(
    new DeliveryTimeService(deliveryTimeData)
  );

  const rootRouter = Router();

  rootRouter.get('/', (req, res) => {
    res.json({ name: app.appName, version: `v${app.appVersion}` });
  });

  app.registerRouters([rootRouter, deliveryTimeRouter.getRouter()]);

  await deliveryTimeData.init();

  return app;
};

export default main;
