import { createClient } from "@/lib/supabase/server";
import ProblemCard from "@/components/ui/ProblemCard";
import { Problem } from "@/types";

export const dynamic = 'force-dynamic';

export default async function BrowsePage() {
    const supabase = await createClient();

    // Fetch problems with joined categories and authors
    const { data: problems, error } = await supabase
        .from('problems')
        .select(`
      *,
      category:categories(id, name, slug),
      author:profiles(id, username, avatar_url)
    `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching problems:", error);
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-black dark:text-white sm:text-5xl">
                        Browse Problems
                    </h1>
                    <p className="mt-4 text-xl text-gray-500 max-w-2xl">
                        Discover real-world challenges shared by the community. Find your next big project here.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-500">
                        {problems?.length || 0} problems found
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {problems && problems.length > 0 ? (
                    problems.map((problem: Problem) => (
                        <ProblemCard key={problem.id} problem={problem} />
                    ))
                ) : (
                    <div className="col-span-full py-24 text-center border-2 border-dashed border-gray-200 rounded-3xl">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No problems yet</h3>
                        <p className="text-gray-500">
                            Be the first to submit a problem and help the community!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
