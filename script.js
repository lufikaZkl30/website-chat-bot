async function summarizeText() {
  const input = document.getElementById("inputText").value.trim();
  const outputDiv = document.getElementById("output");

  if (!input) {
    outputDiv.innerText = "Masukkan teks dulu ya 📝";
    return;
  }

  outputDiv.innerText = "Sedang merangkum... ✨";

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `Ringkas teks berikut dengan bahasa yang mudah dimengerti:\n\n${input}` }]
          }]
        }),
      }
    );

    const data = await response.json();
    console.log(data); // biar kamu bisa lihat di console
    const result = data.candidates?.[0]?.content?.parts?.[0]?.text || "Gagal membuat ringkasan 😢";
    outputDiv.innerText = result;

  } catch (error) {
    outputDiv.innerText = "Terjadi kesalahan saat menghubungi AI 😭";
    console.error(error);
  }
}
