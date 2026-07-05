# Cybersecurity Conversational AI Assistant

A cybersecurity-only conversational assistant built with React, Vite, Tailwind CSS, FastAPI, and Groq.

## What It Does

- Handles only cybersecurity-related conversation
- Explains threats, defenses, attack patterns, incident response, and security best practices
- Refuses requests that are outside cybersecurity

## What It Does Not Do

- It does not provide general-purpose assistance
- It does not perform log review, URL scanning, file inspection, threat intelligence lookups, or report generation as product features

## Project Structure

- `frontend/` React + Vite + Tailwind UI
- `backend/` FastAPI chat API with Groq integration

## Setup

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Set:

- `GROQ_API_KEY`
- `GROQ_MODEL`

### Frontend

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

## API

- `POST /api/chat`

## Security Behavior

- The system prompt limits the assistant to cybersecurity topics only
- Non-cybersecurity prompts are refused and redirected back to security topics
- API keys remain in the backend only
- Inputs are handled defensively through the backend chat service
