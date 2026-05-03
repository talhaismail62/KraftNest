// backend/routes/contact.js
const express = require('express');
const router = express.Router();

// This handles the POST request to the root of this specific route
router.post('/', (req, res) => {
    const contactData = req.body;
    
    // Logic for contact message goes here
    console.log("✉️ New Contact Message Received:", contactData);
    
    res.status(200).json({ message: "Message received successfully!" });
});

module.exports = router;