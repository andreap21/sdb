const express = require('express');
const path = require('path');
const app = express();

// Force HTTPS on Heroku
app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') && req.header('x-forwarded-proto') !== 'https') {
        res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
        next();
    }
});

app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
