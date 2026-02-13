import { NextRequest, NextResponse } from "next/server";
import { refineProblem } from "@/services/ai";

export async function POST(req: NextRequest) {
    try {
        const { roughIdea } = await req.json();

        if (!roughIdea) {
            return NextResponse.json(
                { error: "Rough idea is required" },
                { status: 400 }
            );
        }

        const refinedDescription = await refineProblem(roughIdea);

        return NextResponse.json({
            success: true,
            data: {
                description: refinedDescription,
            },
        });
    } catch (error) {
        console.error("API Route Error:", error);
        return NextResponse.json(
            { error: "Failed to refine problem with AI. Make sure Ollama is running." },
            { status: 500 }
        );
    }
}
