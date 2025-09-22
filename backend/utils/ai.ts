import config from "../config";
import axios from "axios";

export async function summarizeText(text: string): Promise<string> {
  if (config.ai.provider === "openai") {
    // Example using OpenAI completion (replace with latest API structure)
    const key = config.ai.openaiKey;
    if (!key) return "AI key not configured.";
    const resp = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini", // placeholder; change as needed
        messages: [
          { role: "system", content: "Summarize medical record in 2 lines." },
          { role: "user", content: text },
        ],
        max_tokens: 150,
      },
      {
        headers: { Authorization: `Bearer ${key}` },
      }
    );
    return resp.data?.choices?.[0]?.message?.content || "No summary.";
  } else if (config.ai.provider === "hf") {
    // Hugging Face summarization example (text-generation endpoint)
    const key = config.ai.hfKey;
    if (!key) return "HF key not configured.";
    const resp = await axios.post(
      "https://api-inference.huggingface.co/models/google/flan-t5-large",
      { inputs: text },
      {
        headers: { Authorization: `Bearer ${key}` },
      }
    );
    return resp.data?.[0]?.generated_text || "No summary.";
  } else {
    return "No AI provider configured.";
  }
}
