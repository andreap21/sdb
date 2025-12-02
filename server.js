const express = require('express');
const path = require('path');

const app = express();

// --- STATIC FILES ---
app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
