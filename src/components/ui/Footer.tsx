import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 py-8 px-4 md:flex-row md:py-6">
                <div className="flex flex-col items-center gap-2 md:items-start">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} BuildThis.dev. Open Source.
                    </p>
                </div>

                <div className="flex gap-6">
                    <Link
                        href="https://github.com/AmanSoni1-apex/BuildThis"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                    >
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                    <Link
                        href="https://twitter.com" // Placeholder
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                    >
                        <Twitter className="h-5 w-5" />
                        <span className="sr-only">Twitter</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
