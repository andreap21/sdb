const express = require('express');
const basicAuth = require('express-basic-auth');
const path = require('path');

const app = express();

// --- BASIC AUTH ---
app.use(basicAuth({
  users: { 'stefania': process.env.SITE_PASSWORD || 'dreambig030118' },
  challenge: true,
  realm: 'Family Site'
}));

// --- STATIC FILES ---
app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
