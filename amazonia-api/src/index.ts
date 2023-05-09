import { app } from './app';
import { deliveryTimeData } from './data/delivery-time.data';
import { deliveryTimeRouter } from './routers/delivery-time.router';

const HOST = process.env.HOST || '0.0.0.0';
const PORT = parseInt(process.env.PORT || '3000', 10);

app.registerRouter(deliveryTimeRouter);

app.listen(PORT, HOST, async () => {
  console.log(`Running on http://${HOST}:${PORT}`);

  await deliveryTimeData.init();
});
