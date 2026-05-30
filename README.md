# 🤖 AI Career Coach

A full-stack AI web application that analyses your CV against a job description and gives you instant, structured feedback — built with **React**, **FastAPI**, and the **Claude API by Anthropic**.

🔗 **Live Demo:** [https://ai-career-coach-frontend.onrender.com](https://ai-career-coach-frontend.onrender.com)

---

## 💡 What It Does

Upload your CV as a PDF or paste it directly, add a job description, and get:

- **Match Score** — how well your CV matches the role (out of 100)
- **Matching Skills** — what you already have that they want
- **Missing Skills** — what you need to learn or add
- **Rewritten CV Summary** — your summary tailored to that specific job

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React |
| Backend | FastAPI (Python) |
| AI | Claude API (Anthropic) — claude-sonnet-4-6 |
| PDF Processing | pypdf |
| Deployment | Render |

---

## ✨ Features

- 📄 **PDF Upload** — upload your CV directly as a PDF (no copy-pasting needed)
- 🔍 **RAG-based CV Processing** — CV is chunked and processed intelligently
- 🎯 **Match Score** — instant percentage score out of 100
- ✅ **Skills Analysis** — see exactly what matches and what's missing
- 📝 **CV Rewriter** — get a tailored CV summary for the specific role
- ⚡ **Real-time Results** — results appear instantly after analysis

---

## 🚀 How to Run Locally

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file in the backend folder:
```
ANTHROPIC_API_KEY=your-api-key-here
```

Run the server:
```bash
python -m uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm start
```

Open `http://localhost:3000` in your browser.

---

## 🧠 How It Works

```
📄 Upload CV (PDF)
    ↓ pypdf extracts text
✂️ Text split into 500-word chunks (RAG)
    ↓ chunks joined into context
🤖 FastAPI sends CV + Job Description to Claude
    ↓ Claude analyses and scores
📊 React displays Score, Skills, Summary
```

---

## 🔒 Security Note

Never commit your `.env` file. This repo includes a `.gitignore` that automatically excludes it.

---

## 👩‍💻 Author

**Ananthi Muthu**
Backend & Full Stack Software Engineer | Dublin, Ireland
[LinkedIn](https://www.linkedin.com/in/ananthi-muthu-76b3101a8/) | [GitHub](https://github.com/AnanthiMuthu02)

---

## 📌 Part of my AI/ML Portfolio

- ✅ Project 1: [AI Resume Tailor](https://github.com/AnanthiMuthu02/ai-resume-tailor)
- ✅ Project 2: [AI Chatbot with Memory](https://github.com/AnanthiMuthu02/ai-chatbot-memory)
- ✅ Project 3: [AI Document Q&A with RAG](https://github.com/AnanthiMuthu02/ai-document-qa)
- ✅ Project 4: [Autonomous AI Agent](https://github.com/AnanthiMuthu02/ai-agent)
- ✅ Project 5: AI Career Coach ← You are here
