const express = require('express');
const path = require('path');

const fs = require('fs');
const https = require('https');

const app = express();

// --- STATIC FILES ---
app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 8080;

// Try to load SSL certs
let sslOptions = null;
try {
    if (fs.existsSync(path.join(__dirname, 'key.pem')) && fs.existsSync(path.join(__dirname, 'cert.pem'))) {
        sslOptions = {
            key: fs.readFileSync(path.join(__dirname, 'key.pem')),
            cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
        };
    }
} catch (e) {
    console.log("No SSL certs found, falling back to HTTP");
}

if (sslOptions) {
    // Create HTTPS Server (Local Development)
    https.createServer(sslOptions, app).listen(PORT, () => {
        console.log(`✅ HTTPS Server running on port ${PORT}`);
    });
} else {
    // Create HTTP Server (Heroku / Production)
    app.listen(PORT, () => {
        console.log(`✅ HTTP Server running on port ${PORT}`);
    });
}
