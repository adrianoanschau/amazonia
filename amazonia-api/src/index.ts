import { app } from './app';
import { HttpClient } from './core/http-client';
import { DeliveryTimeData } from './data/delivery-time.data';
import { DeliveryTimeRouter } from './routers/delivery-time.router';
import { DeliveryTimeService } from './services/delivery-time.service';

const HOST = process.env.HOST || '0.0.0.0';
const PORT = parseInt(process.env.PORT || '3000', 10);

const deliveryTimeData = new DeliveryTimeData(
  new HttpClient(process.env.DELIVERY_TIMES_API)
);

const deliveryTimeRouter = new DeliveryTimeRouter(
  new DeliveryTimeService(deliveryTimeData)
);

app.registerRouter(deliveryTimeRouter.getRouter());

app.listen(PORT, HOST, async () => {
  console.log(`Running on http://${HOST}:${PORT}`);

  await deliveryTimeData.init();
});
