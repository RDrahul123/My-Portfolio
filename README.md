
# Rahul Dodke - 3D Data Scientist Portfolio

This is an interactive 3D portfolio website for Data Scientist Rahul Dodke, featuring a resume, project showcase, and a Gemini-powered AI chatbot to answer questions about Rahul's experience.

## Features

- **Interactive 3D Background:** Engaging hero section with a dynamic particle sphere created with React Three Fiber.
- **Smooth Animations:** Sleek, animated sections that activate on scroll for a modern user experience.
- **Dynamic Project Filtering:** Filter projects by technology to easily view relevant work.
- **AI Resume Assistant:** A chatbot powered by the Google Gemini API that can answer questions about the resume content.
- **Fully Responsive:** Designed to look and work great on all devices, from mobile phones to desktops.

## Running the Project

This project is set up to run in a development environment like Google's AI Studio, which handles the live compilation of TypeScript (`.ts`) and JSX (`.tsx`) files automatically. To run it, simply open the project files in a compatible environment.

## Deploying to GitHub Pages

Deploying to a static hosting service like GitHub Pages requires a "build step" to convert the TypeScript/JSX code into standard HTML, CSS, and JavaScript that browsers can understand.

Here’s a recommended approach using **Vite**, a popular and fast web development build tool.

### Step 1: Set Up a Vite Project

First, create a new Vite project with the React and TypeScript template.

```bash
npm create vite@latest your-project-name -- --template react-ts
cd your-project-name
```

### Step 2: Copy Project Files

- **Copy all components, services, types, and constants** (`App.tsx`, `constants.ts`, `components/`, etc.) into the `src/` directory of your new Vite project.
- **Replace the content of `src/main.tsx`** with the content from the original `index.tsx`.
- **Copy the content of the original `index.html`** into Vite's `index.html` at the root of the project. Make sure to adjust the script tag to point to `src/main.tsx`:
  ```html
  <!-- In Vite's index.html -->
  <script type="module" src="/src/main.tsx"></script> 
  ```
- **Copy the Tailwind CSS config** from the `<script>` tag in the original `index.html` into a new `tailwind.config.js` file and set up Tailwind CSS for Vite by following the [official guide](https://tailwindcss.com/docs/guides/vite).

### Step 3: Install Dependencies

Install the necessary libraries for the project.

```bash
npm install react react-dom three @react-three/fiber @react-three/drei @google/genai
```

### Step 4: Configure Vite for GitHub Pages

In your `vite.config.ts` file, you need to set the `base` path to match your GitHub repository name. This ensures that all assets are loaded correctly.

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Set this to your repository name
  base: '/your-repo-name/', 
})
```

### Step 5: Handle the Gemini API Key

The chatbot will not work out-of-the-box because `process.env.API_KEY` is not available in a browser environment. To fix this securely, you must use **GitHub Secrets** and **GitHub Actions**.

1.  **Create a Repository Secret:**
    -   In your GitHub repository, go to `Settings` > `Secrets and variables` > `Actions`.
    -   Click `New repository secret`.
    -   Name the secret `VITE_GEMINI_API_KEY`.
    -   Paste your Gemini API key as the value.

2.  **Update the Code:**
    -   In `services/geminiService.ts`, change how you access the API key to use Vite's environment variable syntax:

    ```typescript
    // services/geminiService.ts
    // Before: const API_KEY = process.env.API_KEY;
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
    ```

3.  **Set up GitHub Actions for Deployment:**
    -   Create a file at `.github/workflows/deploy.yml`.
    -   Add the following workflow, which will automatically build and deploy your site whenever you push to the `main` branch.

    ```yml
    # .github/workflows/deploy.yml
    name: Deploy to GitHub Pages

    on:
      push:
        branches: [main] # Or your default branch

    jobs:
      build-and-deploy:
        runs-on: ubuntu-latest
        steps:
          - name: Checkout 🛎️
            uses: actions/checkout@v3

          - name: Setup Node.js
            uses: actions/setup-node@v3
            with:
              node-version: '18' # Or a later version

          - name: Install and Build 🔧
            run: |
              npm install
              npm run build
            env:
              VITE_GEMINI_API_KEY: ${{ secrets.VITE_GEMINI_API_KEY }}

          - name: Deploy 🚀
            uses: JamesIves/github-pages-deploy-action@v4
            with:
              folder: dist # The folder the build script generates
    ```

### Step 6: Deploy

Commit and push all your changes to your GitHub repository. The GitHub Action will run automatically, and your site will be deployed to `https://<your-username>.github.io/<your-repo-name>/`. You may need to enable GitHub Pages in your repository settings to point to the `gh-pages` branch.
