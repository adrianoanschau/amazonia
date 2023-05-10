import { App } from './app';
import main from './main';

const HOST = process.env.HOST || '0.0.0.0';
const PORT = parseInt(process.env.PORT || '3000', 10);

(async () => {
  const app = await main(new App());

  app.listen(PORT, HOST, async () => {
    console.log(`Running on http://${HOST}:${PORT}`);
  });
})();
