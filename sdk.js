import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express();

const PORT = 3000;
const HOST = 'localhost';

app.get('/info', (req, res) => {
  res.send("This is a proxy service");
});

app.use('/amadeus-apis/airport-city-search', createProxyMiddleware({
  target: 'http://localhost:8080/airport-city-search',
  changeOrigin: true,
  pathRewrite: {
    [`^/amadeus-apis/airport-city-search`]: '',
  }
}));

app.listen(PORT, HOST, () => console.log(`Proxy service listening on ${HOST}:${PORT}`));