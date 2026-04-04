const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

// Chatbot
app.post("/chat", (req, res) => {
  const msg = req.body.message.toLowerCase();

  let reply = "I didn't understand.";

  if (msg.includes("hello")) reply = "Hello 👋 Welcome!";
  else if (msg.includes("library")) reply = "Digital Library available 📚";

  res.json({ reply });
});

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Login Page.html"));
});

app.listen(3000, () => console.log("Server running"));