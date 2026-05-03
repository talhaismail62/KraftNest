// backend/server.js
const express = require('express');
const cors = require('cors');

// 1. Import Routes
const bookRoutes = require('./routes/book');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5001;

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Mount Routes
// This tells Express: "Any request starting with /api/book should be handled by bookRoutes"
app.use('/api/book', bookRoutes);
app.use('/api/contact', contactRoutes);

// Health Check Route
app.get('/api/status', (req, res) => {
    res.json({ message: "KraftNest backend is running smoothly!" });
});

// 4. Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});