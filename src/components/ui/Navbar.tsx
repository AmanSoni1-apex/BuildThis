"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Hammer } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg dark:border-gray-800 dark:bg-black/75">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Hammer className="h-6 w-6 text-black dark:text-white" />
                    <span className="text-xl font-bold tracking-tight text-black dark:text-white">
                        BuildThis.dev
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex md:items-center md:gap-8">
                    <Link href="/browse" className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white">
                        Browse Problems
                    </Link>
                    <Link href="/submit" className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white">
                        Submit Idea
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white">
                        About
                    </Link>

                    <div className="flex items-center gap-4 border-l border-gray-200 pl-8 dark:border-gray-700">
                        <button className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white">
                            Log in
                        </button>
                        <button className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                            Sign up
                        </button>
                    </div>
                </div>

                {/* Mobile menu button */}
                <div className="flex md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-black md:hidden">
                    <div className="space-y-1 px-4 py-4">
                        <Link
                            href="/browse"
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-black dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            Browse Problems
                        </Link>
                        <Link
                            href="/submit"
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-black dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            Submit Idea
                        </Link>
                        <Link
                            href="/about"
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-black dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </Link>
                        <div className="mt-4 flex flex-col gap-2 border-t border-gray-200 pt-4 dark:border-gray-700">
                            <button className="w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-black dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-white">
                                Log in
                            </button>
                            <button className="w-full rounded-md bg-black px-3 py-2 text-center text-base font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
