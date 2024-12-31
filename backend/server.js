require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// In-memory store for users (for demonstration purposes)
const users = {};

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Route to handle cryptocurrency API request
app.get('/api/crypto', async (req, res) => {
    const query = req.query.query; // Get the query parameter from the request
    try {
        const response = await fetch(`http://api.coinlayer.com/live?access_key=${process.env.COINLAYER_API_KEY}&symbols=${query}`, {
            method: 'GET'
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Route to handle sign-in form submission
app.post('/api/signin', (req, res) => {
    const { email, password } = req.body;
    // Perform your authentication logic here
    if (users[email] && users[email].password === password) {
        res.json({ success: true, message: 'Sign in successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
});

// Route to handle sign-up form submission
app.post('/api/signup', (req, res) => {
    const { email, password } = req.body;
    // Perform your sign-up logic here
    if (users[email]) {
        res.status(400).json({ success: false, message: 'User already exists' });
    } else {
        users[email] = { password };
        res.json({ success: true, message: 'Sign up successful' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});