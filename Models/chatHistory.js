const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender: String, // "user" or "tailor"
  text: String,
  timestamp: { type: Date, default: Date.now }
});

const ChatHistorySchema = new mongoose.Schema({
  userId: String,
  tailorId: String,
  messages: [MessageSchema]
});

module.exports = mongoose.model("ChatHistory", ChatHistorySchema);
