require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('../frontend')); // Serve frontend files

app.get('/api/crypto', async (req, res) => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/some_endpoint', {
      headers: {
        'Authorization': `Bearer ${process.env.COINGECKO_API_KEY}`
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