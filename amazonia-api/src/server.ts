import main from './main';

const HOST = process.env.HOST || '0.0.0.0';
const PORT = parseInt(process.env.PORT || '3000', 10);

main.listen(PORT, HOST, async () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
