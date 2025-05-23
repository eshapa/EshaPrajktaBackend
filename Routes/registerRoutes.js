// Routes/registerRoutes.js
const express = require("express");
const router = express.Router();

// POST /api/register/:role
router.post("/:role", async (req, res) => {
  const { role } = req.params;
  const { email } = req.body;

  try {
    // Validate role
    if (!["user", "shopkeeper", "tailor"].includes(role)) {
      return res.status(400).json({ message: "❌ Invalid role selected." });
    }

    // For now, just simulate success
    console.log(`✅ Registered: ${email} as ${role}`);

    // You can insert into database later if needed

    res.status(200).json({ message: `✅ Successfully registered as ${role}` });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
