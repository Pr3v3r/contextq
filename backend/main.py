from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langchain_text_splitters import RecursiveCharacterTextSplitter
import pypdf
import io

app = FastAPI(title="ContextQ API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/process-pdf")
async def process_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files allowed")
    
    contents = await file.read()
    
    pdf_reader = pypdf.PdfReader(io.BytesIO(contents))
    
    raw_text = ""
    for page_num, page in enumerate(pdf_reader.pages):
        text = page.extract_text()
        if text:
            raw_text += f"\n[Page {page_num + 1}]\n{text}"
    
    if not raw_text.strip():
        raise HTTPException(status_code=400, detail="No text could be extracted from this PDF")
    
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
    )
    
    chunks = text_splitter.split_text(raw_text)
    
    print(f"\n--- PDF Processing Complete ---")
    print(f"Pages: {len(pdf_reader.pages)}")
    print(f"Total characters: {len(raw_text)}")
    print(f"Total chunks: {len(chunks)}")
    print(f"First chunk preview:\n{chunks[0][:200]}")
    print(f"-------------------------------\n")
    
    return {
        "filename": file.filename,
        "pages": len(pdf_reader.pages),
        "total_chunks": len(chunks),
        "preview": chunks[0][:200] if chunks else ""
    }