<div align="center">
  <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200&h=400" alt="BuildThis.dev Banner" width="100%" />

  # 🚀 BuildThis.dev
  **Turn frustrations into foundations. The community-powered problem discovery engine.**

  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
  [![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)
  [![Ollama](https://img.shields.io/badge/AI-Ollama-blue?style=for-the-badge&logo=ollama)](https://ollama.com)
  [![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

  [Browse Problems](https://github.com/AmanSoni1-apex/BuildThis/blob/main/src/app/browse/page.tsx) • [Submit Idea](https://github.com/AmanSoni1-apex/BuildThis/blob/main/src/app/submit/page.tsx) • [Read the PRD](https://github.com/AmanSoni1-apex/BuildThis/blob/main/documents/02%20-%20Product%20Requirements.md)
</div>

---

### 💡 What is BuildThis.dev?

BuildThis.dev is a "Problem-as-a-Service" platform. Most developers struggle to find a good project idea. BuildThis.dev bridges the gap between people with real-world problems and developers with the skills to solve them.

### ✨ Key Features

| Feature | Description |
| :--- | :--- |
| **🧠 AI Articulation** | Turns rough, messy user complaints into professional, actionable problem statements using local AI. |
| **▦ Browse & Filter** | Discover problems by industry, difficulty, or impact. |
| **🛡️ Clean Architecture** | Built with scalability in mind using decoupled services and strongly-typed models. |
| **🚀 Supabase Powered** | Real-time updates, secure authentication, and a robust PostgreSQL backbone. |

### 🛠️ Technical Architecture

The project follows the **Clean Architecture** pattern, providing a strict separation of concerns that makes it easy to test and scale.

```mermaid
graph TD
    A[UI Components] --> B[Server Components]
    B --> C[Service Layer]
    C --> D[Domain Models]
    C --> E[Data Layer / Supabase]
    C --> F[AI Layer / Ollama]
```

#### 📁 Directory Structure
```text
src/
├── app/          # App Router (Endpoints & Pages)
├── components/   # Atomic UI primitives & complex organisms
├── lib/          # Hard-wired integrations (Supabase, Auth)
├── services/     # Pure business logic & AI orchestration
└── types/        # Global TypeScript interfaces
```

---

### 🚀 Getting Started

Launch your local development environment in 60 seconds.

#### 1. Requirements
- Node.js 18+ & npm
- [Ollama](https://ollama.com) (Running `qwen2:1.5b`)

#### 2. Installation
```bash
git clone https://github.com/AmanSoni1-apex/BuildThis.git
cd BuildThis
npm install
```

#### 3. Environment Setup
Copy the template and add your Supabase keys.
```bash
cp .env.example .env.local
```

#### 4. Run the Engine
```bash
ollama run qwen2:1.5b
npm run dev
```

---

### 📄 Strategic Documentation

Detailed insights into why and how we are building this:
- [Technical Architecture](./documents/03%20-%20Technical%20Architecture.md)
- [YC Strategy & Roadmap](./documents/08%20-%20YC%20Strategy%20Startup%20Roadmap.md)
- [GTM & Social Strategy](./documents/09%20-%20Open%20Source%20Social%20Media%20Strategy.md)

<div align="center">
  <sub>Built with ❤️ by Aman Soni & Antigravity.</sub>
</div>
