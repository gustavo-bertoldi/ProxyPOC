import express from 'express';
import morgan from 'morgan';
import { createProxyMiddleware, requestInterceptor } from 'http-proxy-middleware'
import fetch from 'node-fetch'
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const PORT = 3000;
const HOST = 'localhost';

// Logging
app.use(morgan('dev'));

app.get('/info', (req, res) => {
  res.send("This is a proxy service");
});

async function amadeusToken() {
  const args = {
    method: 'POST',
    body: new URLSearchParams({
      client_id: process.env.AMADEUS_CLIENT_ID,
      client_secret: process.env.AMADEUS_CLIENT_SECRET,
      grant_type: 'client_credentials'
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  let response = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", args);
  let auth = await response.json();
  console.log(auth);
  return auth.access_token;
}

app.use('/amadeus-apis/airport-city-search', createProxyMiddleware({
  target: 'https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=MUC&countryCode=DE',
  changeOrigin: true,
  pathRewrite: {
    [`^/amadeus-apis/airport-city-search`]: '',
  },
  headers: {
    Authorization: `Bearer ${await amadeusToken()}`
  },
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.
  }
}));

app.listen(PORT, HOST, () => console.log(`Proxy service listening on ${HOST}:${PORT}`));