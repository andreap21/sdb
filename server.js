const express = require('express');
const path = require('path');

const fs = require('fs');
const https = require('https');

const app = express();

// --- STATIC FILES ---
app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 8080;

// SSL Options
const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
};

// Create HTTPS Server
https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`✅ HTTPS Server running on port ${PORT}`);
});
