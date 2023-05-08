import express from 'express';

const HOST = process.env.HOST || '0.0.0.0';
const PORT = parseInt(process.env.PORT || '3000', 10);

const app = express();
app.get('/', (req, res) => {
  res.send('Amazonia API :: v0.1.0');
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
