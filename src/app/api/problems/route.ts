import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
    try {
        const supabase = await createClient();
        const body = await req.json();
        const { title, description, category_id, tags } = body;

        if (!title || !description) {
            return NextResponse.json(
                { error: "Title and description are required" },
                { status: 400 }
            );
        }

        // Note: In a real app, we would get the user_id from the session.
        // For now, we'll allow anonymous submissions or use a placeholder if not logged in.
        const { data: { user } } = await supabase.auth.getUser();

        const { data, error } = await supabase
            .from('problems')
            .insert([
                {
                    title,
                    description,
                    category_id,
                    tags,
                    user_id: user?.id || null, // Allow anonymous for now if RLS allows
                    status: 'active'
                }
            ])
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({
            success: true,
            data: data
        });
    } catch (error: any) {
        console.error("Submission Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to submit problem" },
            { status: 500 }
        );
    }
}
