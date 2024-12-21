require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('../frontend')); // Serve frontend files

app.get('/api/crypto', async (req, res) => {
  const query = req.query.query; // Get the query parameter from the request
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.COINGECKO_API_KEY}`
      },
      qs: {
        vs_currency: 'usd',
        ids: query
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});