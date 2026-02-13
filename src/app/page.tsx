import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-black dark:text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center w-full">
          BuildThis.dev <br />
          <span className="text-xl font-normal text-gray-400">
            The Problem Discovery Platform for Developers
          </span>
        </h1>
      </div>

      <div className="mt-12">
        <p className="text-center text-lg mb-8 text-gray-600 dark:text-gray-300">
          Stop building to-do apps. Solve real-world problems.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/browse">
            <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Browse Problems
            </button>
          </Link>
          <Link href="/submit">
            <button className="px-6 py-3 border border-black rounded-lg hover:bg-gray-50 transition dark:border-white dark:hover:bg-zinc-900">
              Submit a Problem
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
