import express from 'express';
import dotenv from 'dotenv';
import Amadeus from 'amadeus';

dotenv.config();
const app = express();

const PORT = 8080;
const HOST = 'localhost';

let amadeus = new Amadeus();

app.get('/airport-city-search', async (req, res) => {
  res.send(await amadeus.referenceData.locations.get({
    keyword: 'LON',
    subType: 'AIRPORT,CITY'
  }));
});

app.get('/info', async (req, res) => {
  res.send("Request received");
});

app.listen(PORT, HOST, () => console.log(`Listening on port ${PORT}`));