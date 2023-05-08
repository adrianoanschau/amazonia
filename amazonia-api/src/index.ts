import { app } from './app';
import { deliveryTime } from './core/delivery-time';

const HOST = process.env.HOST || '0.0.0.0';
const PORT = parseInt(process.env.PORT || '3000', 10);

app.listen(PORT, HOST, async () => {
  console.log(`Running on http://${HOST}:${PORT}`);

  await deliveryTime.init();
});
