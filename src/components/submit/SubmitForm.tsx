"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Hammer, Sparkles, Send, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SubmitForm() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [roughIdea, setRoughIdea] = useState("");
    const [refinedDescription, setRefinedDescription] = useState("");
    const [title, setTitle] = useState("");
    const [categoryId, setCategoryId] = useState<number>(10); // Default to 'Other'

    const handleRefine = async () => {
        if (!roughIdea.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/refine", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ roughIdea }),
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || "Failed to refine idea");
            }

            setRefinedDescription(result.data.description);
            // Generate a cleaner title
            const cleanTitle = roughIdea.split(' ').slice(0, 6).join(' ').replace(/[.,!]$/, "") + "...";
            setTitle(cleanTitle);
            setStep(2);
        } catch (err) {
            setError("AI refinement failed. Make sure Ollama is running locally.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/problems", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    description: refinedDescription,
                    category_id: categoryId,
                    tags: ["ai-refined"]
                }),
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || "Failed to submit");
            }

            router.push("/browse");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Something went wrong during submission.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-12">
            <div className="flex items-center gap-4 mb-8 px-4">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 text-gray-500'} font-bold`}>
                    1
                </div>
                <div className={`h-1 flex-grow rounded-full ${step >= 2 ? 'bg-black dark:bg-white' : 'bg-gray-200'}`} />
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 text-gray-500'} font-bold`}>
                    2
                </div>
            </div>

            {step === 1 && (
                <Card className="border-2 border-gray-100 dark:border-zinc-800 mx-4">
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <Sparkles className="text-blue-500 h-6 w-6" />
                            What's the problem?
                        </CardTitle>
                        <p className="text-gray-500 mt-1">
                            Don't worry about being professional. Just describe it in plain language.
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <textarea
                            className="w-full h-40 p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition resize-none"
                            placeholder="Example: The local park has no lights at night, so it feels unsafe for women and children after 6 PM..."
                            value={roughIdea}
                            onChange={(e) => setRoughIdea(e.target.value)}
                        />
                        {error && (
                            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                                <AlertCircle className="h-4 w-4" />
                                {error}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={handleRefine}
                            disabled={!roughIdea.trim() || loading}
                            className="w-full h-12 text-lg font-semibold"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    AI is thinking...
                                </>
                            ) : (
                                <>
                                    Refine with AI
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            )}

            {step === 2 && (
                <Card className="border-2 border-green-100 dark:border-green-900/30 mx-4">
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <CheckCircle2 className="text-green-500 h-6 w-6" />
                            AI Refinement Complete
                        </CardTitle>
                        <p className="text-gray-500 mt-1">
                            Review the articulated problem statement below.
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Title</label>
                            <input
                                className="w-full p-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Category</label>
                            <select
                                className="w-full p-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
                                value={categoryId}
                                onChange={(e) => setCategoryId(Number(e.target.value))}
                            >
                                <option value={1}>Small Business</option>
                                <option value={2}>Education</option>
                                <option value={3}>Healthcare</option>
                                <option value={4}>Community</option>
                                <option value={5}>Nonprofit</option>
                                <option value={6}>Personal Productivity</option>
                                <option value={7}>Environment</option>
                                <option value={8}>Transportation</option>
                                <option value={9}>Housing</option>
                                <option value={10}>Other</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Refined Description</label>
                            <textarea
                                className="w-full h-48 p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition resize-none"
                                value={refinedDescription}
                                onChange={(e) => setRefinedDescription(e.target.value)}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <div className="flex w-full gap-4">
                            <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                                Back
                            </Button>
                            <Button onClick={handleSubmit} className="flex-[2]" disabled={loading}>
                                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Submit Problem"}
                            </Button>
                        </div>
                        {error && (
                            <div className="flex items-center gap-2 text-red-500 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                {error}
                            </div>
                        )}
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}
