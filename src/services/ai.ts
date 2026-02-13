import { GoogleGenerativeAI } from "@google/generative-ai";

const OLLAMA_URL = "http://localhost:11434/api/generate";
const MODEL_NAME = "qwen2:1.5b";

export async function refineProblem(roughIdea: string): Promise<string> {
    const prompt = `
    You are an expert product manager. Convert the following rough idea into a professional, clear, and concise problem statement.

    Rough Idea: "${roughIdea}"

    Strict Rules:
    1. Do NOT use introductory phrases like "As an expert..." or "I understand...".
    2. Focus ONLY on the core problem and its impact.
    3. Keep the entire response under 3-4 sentences.
    4. Be direct, professional, and actionable.
    5. No placeholders.

    Professional Problem Statement:
  `;

    // Hybrid AI Logic
    const geminiApiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    // Use Gemini if API key is present (e.g., in Production)
    if (geminiApiKey) {
        try {
            const genAI = new GoogleGenerativeAI(geminiApiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text().trim();
        } catch (error) {
            console.error("Gemini AI Error:", error);
            // Don't throw here, try to fallback if we are in dev, 
            // but in prod this will be the only option.
        }
    }

    // Fallback/Local Development: Use Ollama
    try {
        const response = await fetch(OLLAMA_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: MODEL_NAME,
                prompt: prompt,
                stream: false,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to communicate with local Ollama");
        }

        const data = await response.json();
        return data.response.trim();
    } catch (error) {
        console.error("Ollama Service Error:", error);
        throw new Error("AI Refinement failed. (Make sure Ollama is running locally for development)");
    }
}
