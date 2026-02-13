import SubmitForm from "@/components/submit/SubmitForm";

export default function SubmitPage() {
    return (
        <div className="bg-zinc-50 dark:bg-black min-h-screen">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight text-black dark:text-white sm:text-6xl">
                        Submit a Problem
                    </h1>
                    <p className="mt-4 text-xl text-gray-500">
                        Turn your frustration into the next big opportunity.
                    </p>
                </div>

                <SubmitForm />
            </div>
        </div>
    );
}
