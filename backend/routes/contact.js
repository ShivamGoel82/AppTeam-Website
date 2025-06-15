const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  console.log("📩 Received data:", req.body);

  if (!name || !email || !subject || !message) {
    console.log("❌ Missing field(s)");
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  try {
    const newMessage = new Message({ name, email, subject, message });
    console.log("💾 Saving message to DB...");
    await newMessage.save();
    console.log("✅ Message saved!");
    res.status(200).json({ message: "Message received successfully" });
  } catch (err) {
    console.error("❌ Error while saving:", err);
    res.status(500).json({ error: "Server error" });
  }
});




module.exports = router;
