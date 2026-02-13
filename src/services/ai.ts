/**
 * Service to interact with the local Ollama instance.
 */

const OLLAMA_URL = "http://localhost:11434/api/generate";
const MODEL_NAME = "qwen2:1.5b";

export interface RefineProblemResponse {
    refined_title: string;
    refined_description: string;
    suggested_tags: string[];
}

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

    try {
        const response = await fetch(OLLAMA_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: MODEL_NAME,
                prompt: prompt,
                stream: false,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to communicate with Ollama");
        }

        const data = await response.json();
        return data.response.trim();
    } catch (error) {
        console.error("Ollama Service Error:", error);
        throw error;
    }
}
