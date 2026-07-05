# Multimodal Cybersecurity AI Assistant

A production-style cybersecurity assistant built with React, Tailwind CSS, Vite, and FastAPI, using Groq for LLM-powered chat and analysis.

## Features

- Cybersecurity-focused AI chat
- Log analysis for auth, firewall, app, and server logs
- URL and phishing analysis
- File and screenshot analysis
- Threat intelligence helper for IPs, hashes, domains, and IOCs
- Dashboard with threat summaries
- Markdown report generator

## Project Structure

- `frontend/` React + Vite + Tailwind UI
- `backend/` FastAPI API with Groq integration

## Setup

### 1. Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Edit `.env` and set:

- `GROQ_API_KEY`
- `GROQ_MODEL`
- `GROQ_VISION_MODEL`

Recommended multimodal default:

- `meta-llama/llama-4-scout-17b-16e-instruct`

### 2. Frontend

```bash
cd frontend
npm install
copy .env.example .env
```

Set `VITE_API_BASE_URL` to your backend URL. For local development:

```env
VITE_API_BASE_URL=http://localhost:8000
```

## Run Locally

### Backend

```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend
npm run dev
```

The frontend runs on `http://localhost:5173` by default.

## How Frontend Connects to Backend

The frontend uses `frontend/src/services/api.js` and reads `VITE_API_BASE_URL`.

Example:

```env
VITE_API_BASE_URL=http://localhost:8000
```

The backend exposes these endpoints:

- `POST /api/chat`
- `POST /api/analyze/logs`
- `POST /api/analyze/url`
- `POST /api/analyze/indicator`
- `POST /api/upload/analyze`
- `POST /api/report/generate`

## Getting a Groq API Key

1. Sign in to the Groq Console.
2. Open the API Keys page.
3. Create a new secret key in your project.
4. Store it only in the backend `.env` file.

Official links:

- API Keys: https://console.groq.com/keys
- Groq docs overview: https://console.groq.com/docs/overview

Groq docs note that the platform is OpenAI-compatible and supports image recognition / OCR in its documentation.

## Testing

- Launch the backend and frontend locally.
- Try a short chat prompt in the Assistant page.
- Paste firewall or auth logs into the Log Analyzer.
- Upload a `.txt`, `.csv`, `.json`, `.pdf`, or image file.
- Run a URL analysis with a suspicious link.
- Generate a report and copy/download the markdown.

## Deployment Notes

### Frontend on Netlify

- Use the repo-level [`netlify.toml`](/C:/Users/Mohamed%20Yousuf/Downloads/Professional/MultimodalCybersecurityConversationalAI/netlify.toml)
- Netlify settings:
  - Base directory: `frontend`
  - Build command: `npm run build`
  - Publish directory: `dist`
- Add `VITE_API_BASE_URL` to Netlify environment variables and point it to your Render backend URL
- If you use the Netlify dashboard only, make sure the deployed site still serves `index.html` for client-side navigation

### Backend on Render or Railway

- Use the repo-level [`render.yaml`](/C:/Users/Mohamed%20Yousuf/Downloads/Professional/MultimodalCybersecurityConversationalAI/render.yaml)
- Render settings:
  - Root directory: `backend`
  - Build command: `pip install -r requirements.txt`
  - Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
  - Health check path: `/health`
- Set environment variables in Render:
  - `GROQ_API_KEY`
  - `GROQ_MODEL`
  - `GROQ_VISION_MODEL`
  - `ALLOWED_ORIGINS`
  - `FRONTEND_ORIGIN`
  - `MAX_UPLOAD_MB`
- Add your Netlify site URL to `ALLOWED_ORIGINS`, for example `https://your-site.netlify.app`
- Set `FRONTEND_ORIGIN` to the exact Netlify URL

## Security Notes

- API keys stay in the backend only
- File uploads are size-limited and type-restricted
- Inputs are validated before analysis
- CORS is restricted through environment configuration
- The assistant is instructed to stay defensive and educational
