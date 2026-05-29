from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import anthropic
import os
from dotenv import load_dotenv
from pypdf import PdfReader
import io

load_dotenv()

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    #allow_origins=["http://localhost:3000","http://localhost:5173"],
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

class AnalyseRequest(BaseModel):
    cv: str
    job_description: str

@app.post("/analyse")
async def analyse(request: AnalyseRequest):

    prompt = f"""
    you are a career coach. Analyse this CV against this job description.

    CV:

    {request.cv}

    Job Description:
    {request.job_description}

    Give me:
    1. A match score out of 100
    2. Top 3 matching skills
    3. Top 3 missing skills
    4. A rewritten CV summary tailored to this job

    Reply in this exact format:
    SCORE: [number]
    MATCHING: [skill1], [skill2], [skill3]
    MISSING: [skill1], [skill2], [skill3]
    SUMMARY: [rewritten summary]
    """

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )

    return {"result": message.content[0].text}

@app.post("/upload-cv")
async def upload_cv(file: UploadFile = File(...)):
    # Read the uploaded file into memory
    contents = await file.read()
    
    # Open the PDF from memory
    pdf = PdfReader(io.BytesIO(contents))
    
    # Extract all text from every page
    text = ""
    for page in pdf.pages:
        text += page.extract_text()
    
    # Chunk the text into 500 word pieces
    words = text.split()
    chunks = []
    current_chunk = []
    
    for word in words:
        current_chunk.append(word)
        if len(current_chunk) >= 500:
            chunks.append(" ".join(current_chunk))
            current_chunk = []
    
    if current_chunk:
        chunks.append(" ".join(current_chunk))
    
    # Join all chunks into one CV text
    cv_text = "\n\n".join(chunks)
    
    return {"cv_text": cv_text}

@app.get("/health")
async def health():
    return {"status": "Server is running!"}