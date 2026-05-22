# 🤖 AI Career Coach

A full-stack AI web application that analyses your CV against a job description and gives you instant feedback — built with **React**, **FastAPI**, and the **Claude API by Anthropic**.

---

## 💡 What It Does

Paste your CV and a job description and get:

- **Match Score** — how well your CV matches the role (out of 100)
- **Matching Skills** — what you already have that they want
- **Missing Skills** — what you need to learn
- **Rewritten CV Summary** — your summary tailored to that specific job

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React |
| Backend | FastAPI (Python) |
| AI | Claude API (Anthropic) — claude-sonnet-4-6 |

---

## 🚀 How to Run It

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install fastapi uvicorn anthropic python-dotenv
python -m uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm start
```

---

## 🔒 Security Note

Never commit your `.env` file. Add it to `.gitignore`.

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
