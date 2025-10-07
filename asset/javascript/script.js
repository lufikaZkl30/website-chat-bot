const API_KEY = "ISI_DENGAN_API_KEY_GEMINI_KAMU"; // ← ganti dengan API key kamu

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("userInput");

async function sendMessage() {
  const userText = input.value.trim();
  if (!userText) return;

  addMessage("Kamu", userText);
  input.value = "";

  addMessage("Bot", "⏳ Sedang berpikir...");

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: userText }] }]
        })
      }
    );

    const data = await response.json();
    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, aku gak paham 😅";

    // ganti "⏳ Sedang berpikir..." dengan jawaban bot
    const lastBot = messagesDiv.querySelector("div:last-child");
    lastBot.innerHTML = `<b>Bot:</b> ${botReply}`;
  } catch (error) {
    console.error(error);
    addMessage("Bot", "⚠️ Terjadi kesalahan, coba lagi nanti ya.");
  }
}

function addMessage(sender, text) {
  const div = document.createElement("div");
  div.innerHTML = `<b>${sender}:</b> ${text}`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
