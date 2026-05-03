// backend/routes/book.js
const express = require('express');
const router = express.Router();

// This handles the POST request to the root of this specific route
router.post('/', (req, res) => {
    const bookingData = req.body;
    
    // Logic for booking goes here (e.g., saving to database, sending email)
    console.log("🔔 New Booking Request Received:", bookingData);
    
    res.status(200).json({ message: "Booking received successfully!" });
});

module.exports = router;