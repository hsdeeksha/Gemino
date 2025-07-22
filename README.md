# Gemino

An AI-powered chatbot built using "React.js (Vite)" and "Google Gemini AI" for real-time intelligent responses. It features a responsive UI, fast performance, and easy customization.

## Features
- Google-only login (Firebase Auth)
- Responsive, modern UI
- Chatbot powered by Gemini API
- Secure: API keys and secrets are stored in `.env` (never shared)
- No need to commit `node_modules` or sensitive keys

## Getting Started

### 1. Clone the repository
```sh
git clone https://github.com/hsdeeksha/Gemino.git
cd Gemino
```

### 2. Install dependencies
```sh
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_GEMINI_API_KEY=your_gemini_api_key
```
**Never share your `.env` file or API keys publicly.**

### 4. Start the development server
```sh
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment
- Recommended: Vercel, Netlify, or Firebase Hosting
- Build for production:
```sh
npm run build
```
- Deploy the `dist` folder as per your chosen platform's instructions

## Notes
- Do **not** commit `node_modules` or your `.env` file to GitHub
- For collaborators: share only the `.env.example` (with placeholder values)
- For Gemini API: each user should use their own API key

## License
MIT

---

**Professional setup:**
- Secure API keys
- No sensitive data in repo
- Easy install and run
- Modern best practices
