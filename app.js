const express = require('express');
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');
const DbConnector = require('./db-connector');
const PriceEngine = require('./managers/price-engine');

const app = express();
const port = 3000;
const secretKey = '123456'; // Replace with your own secret key

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    req.userId = decoded.userId;
    next();
  });
};

// Parse incoming JSON requests
app.use(bodyParser.json());

app.get('/price-suggestion', verifyToken, async (req, res) => {
  let dbConnector = new DbConnector();
  const priceEngine = new PriceEngine(dbConnector.connection);

  const productId = req.query.id;
  const priceRequested = req.query.price;

  console.log(`Getting price suggestion for product ${productId}`);
  const priceSuggestion = await priceEngine.getPriceSuggestion(productId, priceRequested);
  console.log(`Price suggestion for product ${productId}:`, priceSuggestion);
  dbConnector.close()

  res.json(priceSuggestion);
});

// Generate token for authentication
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Replace with your own authentication logic
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ userId: 1 }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



