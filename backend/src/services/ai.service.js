// services/ai.service.js
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateText(prompt) {
  if (!prompt) throw new Error("Prompt is required");

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // 🔥 best for ATS / reasoning
      messages: [
        {
          role: "system",
          content: `
You are JobScribe AI, an ATS-focused resume optimization engine.
Return ONLY valid JSON when JSON is requested.
Be factual, concise, and ATS-oriented.
Never hallucinate or add fluff.
          `,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
    });

    const text = completion.choices[0]?.message?.content;

    if (!text) {
      throw new Error("Groq returned empty response");
    }

    return text;
  } catch (err) {
    console.error("Groq error:", err);
    throw err;
  }
}

module.exports = { generateText };
