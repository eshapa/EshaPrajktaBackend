// controller/tailorChatController.js
const ChatHistory = require("../Models/chatHistory");
const Tailor = require("../Models/tailorModel");
const OpenAI = require("openai");

// Load API key from environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.chatWithTailor = async (req, res) => {
  const { userId, tailorId, message } = req.body;

  try {
    const tailor = await Tailor.findById(tailorId);
    if (!tailor) return res.status(404).json({ error: "Tailor not found" });

    const chatMessages = [
      {
        role: "system",
        content: `You are ${tailor.name}, a professional tailor specializing in ${tailor.specialty} with ${tailor.experience} years of experience. Answer user queries politely.`,
      },
      { role: "user", content: message },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 150,
    });

    const reply = response.choices[0].message.content.trim();

    // Save messages to DB
    await ChatHistory.findOneAndUpdate(
      { userId, tailorId },
      { $push: { messages: { sender: "user", text: message } } },
      { upsert: true }
    );
    await ChatHistory.findOneAndUpdate(
      { userId, tailorId },
      { $push: { messages: { sender: "tailor", text: reply } } }
    );

    res.json({ reply });
  } catch (error) {
    console.error("Chat Error:", error);

    // Fallback reply if OpenAI API call fails
    const fallbackReply = `Sorry, the chat service is currently unavailable. Here's a fallback reply to your message: "${message}"`;

    // Save fallback conversation to DB
    await ChatHistory.findOneAndUpdate(
      { userId, tailorId },
      { $push: { messages: { sender: "user", text: message } } },
      { upsert: true }
    );
    await ChatHistory.findOneAndUpdate(
      { userId, tailorId },
      { $push: { messages: { sender: "tailor", text: fallbackReply } } }
    );

    res.json({ reply: fallbackReply });
  }
};


exports.getChatHistory = async (req, res) => {
  const { userId, tailorId } = req.query;
  try {
    const history = await ChatHistory.findOne({ userId, tailorId });
    res.json(history?.messages || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
};
