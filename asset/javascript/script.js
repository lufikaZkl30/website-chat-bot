// const API_KEY = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro?key=AIzaSyB3bt76NB4aGLgBw70--qowPl1x7b4BYow"; 

const API_KEY = "AIzaSyB3bt76NB4aGLgBw70--qowPl1x7b4BYow";

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage("user", message);
  userInput.value = "";

  addMessage("bot", "⏳ Sedang mengetik...");

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: "Kamu adalah chatbot ramah bernama Nora yang suka ngobrol santai dengan Para Pengguna." }],
            },
            { parts: [{ text: message }] },
          ],
        }),
      }
    );

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Aku nggak yakin harus jawab apa 😅";

    removeTyping();
    addMessage("bot", reply);
  } catch (error) {
    removeTyping();
    addMessage("bot", "⚠️ Terjadi kesalahan: " + error.message);
  }
}

function addMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);

  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.textContent = text;

  messageDiv.appendChild(bubble);
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
  const typing = document.querySelector(".bot .bubble");
  if (typing && typing.textContent.includes("Sedang mengetik")) {
    typing.parentElement.remove();
  }
}

