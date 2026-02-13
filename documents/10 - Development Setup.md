# Development Setup Guide

## 1. Install Node.js (Required)
Since the `npx` command failed, it means **Node.js is not installed** on your computer. Next.js requires Node.js to run.

1.  **Download:** Go to [nodejs.org](https://nodejs.org/)
2.  **Version:** Download the **LTS (Long Term Support)** version (Recommended).
3.  **Install:** Run the installer.
    *   **IMPORTANT:** During installation, make sure "Add to PATH" is checked (it usually is by default).
    *   Keep clicking "Next" until finished.
4.  **Restart:** After installation, **restart your computer** (or at least close and reopen VS Code) for the changes to take effect.

## 2. Verify Installation
Once you have installed Node.js and restarted:

1.  Open a new terminal in VS Code (Ctrl+`).
2.  Type: `node -v` and press Enter.
    *   *Success:* It should print a version number (e.g., `v20.11.0`).
3.  Type: `npm -v` and press Enter.
    *   *Success:* It should print a version number.

## 3. Initialize the Project
Once Node.js is verified, you can initialize the project.

**Run this command in your `BuildThis` folder:**

```powershell
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
```

## 4. VS Code Extensions (Recommended)
To code like a pro, install these extensions in VS Code:
*   **ESLint:** Finds bugs in your code.
*   **Prettier:** Formats your code automatically.
*   **Tailwind CSS IntelliSense:** Gives you autocomplete for styling.
*   **Pretty TypeScript Errors:** Makes error messages easier to read.
