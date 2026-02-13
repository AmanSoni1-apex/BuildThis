import { Problem } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowBigUp, Bookmark, MessageSquare, User } from "lucide-react";
import Link from "next/link";

interface ProblemCardProps {
    problem: Problem;
}

export default function ProblemCard({ problem }: ProblemCardProps) {
    return (
        <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
            <CardHeader className="flex-none pb-2">
                <div className="flex justify-between items-start gap-4 mb-2">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none px-2 py-0.5 text-xs">
                        {problem.category?.name || "Other"}
                    </Badge>
                    <span className="text-[10px] text-gray-400 font-medium uppercase">
                        {new Date(problem.created_at).toLocaleDateString()}
                    </span>
                </div>
                <Link href={`/problems/${problem.id}`}>
                    <CardTitle className="text-xl font-bold leading-tight hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer">
                        {problem.title}
                    </CardTitle>
                </Link>
            </CardHeader>

            <CardContent className="flex-grow pb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                    {problem.description}
                </p>

                {problem.tags && problem.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                        {problem.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-gray-500">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex-none pt-4 border-t border-gray-100 dark:border-zinc-800 flex justify-between items-center text-sm font-medium text-gray-500">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 hover:text-black dark:hover:text-white cursor-pointer transition-colors">
                        <ArrowBigUp className="h-5 w-5" />
                        <span>{problem.upvotes_count}</span>
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-black dark:hover:text-white cursor-pointer transition-colors">
                        <Bookmark className="h-4 w-4" />
                        <span>{problem.bookmarks_count}</span>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 truncate max-w-[120px]">
                    <User className="h-4 w-4 shrink-0" />
                    <span className="truncate">{problem.author?.username || "Anonymous"}</span>
                </div>
            </CardFooter>
        </Card>
    );
}
