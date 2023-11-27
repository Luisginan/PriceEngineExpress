const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db-connector');
const PriceEngine = require('./managers/price-engine');

const app = express();
const port = 3000;

// Parse incoming JSON requests
app.use(bodyParser.json());

app.get('/price-suggestion', async (req, res) => {
  const priceEngine = new PriceEngine(connection);
  const productId = req.query.id;
  const priceRequested = req.query.price;
  console.log(`Getting price suggestion for product ${productId}`);
  const priceSuggestion = await priceEngine.getPriceSuggestion(productId, priceRequested);
  res.json(priceSuggestion);
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

