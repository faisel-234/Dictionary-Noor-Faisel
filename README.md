# FaiselBot AI Dictionary

A professional, modern, and scalable AI-powered dictionary application built with Next.js (Vite), TypeScript, Tailwind CSS, and Google Gemini API.

## 🔷 Features

- **AI Dictionary Search**: Deep insights, synonyms, and examples using Google Gemini.
- **Word History**: Persistent search history stored in `localStorage`.
- **Dark/Light Mode**: System-based detection with manual toggle.
- **Settings**: Manage preferences and clear data.
- **Developer Info**: Transparency about technology and AI usage.
- **Rate Us**: Interactive feedback system.

## 🔷 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS 4, Motion.
- **Backend**: Express (Node.js) with Gemini API integration.
- **AI**: Google Gemini 3 Flash.
- **Icons**: Lucide React.

## 🔷 Installation & Setup

### 1. Prerequisites
- Node.js (v18+)
- npm or yarn

### 2. Clone and Install
```bash
git clone <repository-url>
cd faiselbot
npm install
```

### 3. Configure Environment
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY="your_google_gemini_api_key"
```
*Get your key at [aistudio.google.com](https://aistudio.google.com/)*

### 4. Run Locally
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

## 🔷 Deployment (Vercel)

1. Push your code to a GitHub repository.
2. Connect your repository to [Vercel](https://vercel.com).
3. Add `GEMINI_API_KEY` to the **Environment Variables** section in Vercel settings.
4. Deploy!

## 🔷 License
Apache-2.0
