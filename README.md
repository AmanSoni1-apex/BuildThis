# BuildThis.dev 🚀

A real-world problem discovery platform for developers. Open source, student-built, and designed to help you find what to build next.

## 🏃‍♂️ How to Run

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run Development Server:**
    ```bash
    npm run dev
    ```

3.  **Open in Browser:**
    Visit [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

We follow **Clean Architecture** principles to keep the code organized and scalable (YC-ready!).

```
BuildThis/
├── public/              # Static assets (images, fonts, icons)
├── src/
│   ├── app/             # Next.js App Router (Pages & API Routes)
│   │   ├── page.tsx     # Homepage
│   │   ├── layout.tsx   # Root layout (Html, Body)
│   │   └── globals.css  # Global styles (Tailwind directives)
│   │
│   ├── components/      # Reusable UI components
│   │   └── ui/          # Basic building blocks (Buttons, Cards, Inputs)
│   │
│   ├── lib/             # External libraries & configurations
│   │   └── supabase.ts  # Supabase client configuration
│   │
│   ├── services/        # Business logic & API calls
│   │   └── api.ts       # Functions to fetch data (keeps UI clean)
│   │
│   ├── types/           # TypeScript interfaces (Data models)
│   │   └── index.ts     # User, Problem, Vote - all types defined here
│   │
│   └── utils/           # Helper functions (dates, formatting)
│
├── documents/           # 📚 Project Documentation (PRD, Strategy, Wireframes)
├── .env.local           # Environment variables (API Keys - DO NOT COMMIT)
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## 🛠️ Tech Stack

-   **Framework:** Next.js 14 (App Router)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS
-   **Database:** Supabase (PostgreSQL)
-   **AI:** Ollama (Llama 3) / Gemini API
-   **Auth:** Supabase Auth

## 🗺️ Roadmap

-   [x] Project Initialization
-   [ ] Supabase Setup
-   [ ] Basic UI Implementation
-   [ ] User Authentication
-   [ ] Problem Submission with AI
