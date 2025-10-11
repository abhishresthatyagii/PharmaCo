import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/analyze", async (req, res) => {
  const { symptoms } = req.body;
  if (!symptoms) return res.status(400).json({ message: "No symptoms provided" });

  try {
    // Use GPT model for actual AI prediction
    const prompt = `
You are a medical AI assistant.
Given the patient's symptoms: "${symptoms}",
predict the most likely condition and suggest 2-3 over-the-counter medicines (if safe).
Respond with structured JSON like:
{
  "prediction": "...",
  "medicines": ["...", "..."],
  "advice": "..."
}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
    });

    const content = completion.choices[0].message.content;
    const parsed = JSON.parse(content);

    res.json({ success: true, data: parsed });
  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ success: false, message: "AI symptom analysis failed" });
  }
});

export default router;
