from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langchain_text_splitters import RecursiveCharacterTextSplitter
from google import genai
import pypdf
import chromadb
import io
import os
from dotenv import load_dotenv

load_dotenv()

gemini_client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY"),
    http_options={"api_version": "v1"}
)

chroma_client = chromadb.HttpClient(
    host=os.getenv("CHROMA_HOST", "localhost"),
    port=int(os.getenv("CHROMA_PORT", 8001))
)

app = FastAPI(title="ContextQ API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def embed_and_store(chunks: list[str], document_id: str):
    collection = chroma_client.get_or_create_collection(name="documents")
    
    embeddings = []
    for chunk in chunks:
        result = gemini_client.models.embed_content(
            model="models/gemini-embedding-001",
            contents=chunk,
        )
        embeddings.append(result.embeddings[0].values)
    
    collection.add(
        documents=chunks,
        embeddings=embeddings,
        ids=[f"{document_id}_chunk_{i}" for i in range(len(chunks))],
        metadatas=[{"document_id": document_id, "chunk_index": i} for i in range(len(chunks))]
    )
    
    return len(chunks)

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
    print(f"-------------------------------\n")
    
    document_id = file.filename.replace(".pdf", "").replace(" ", "_")
    stored_chunks = embed_and_store(chunks, document_id)
    
    print(f"\n--- Embedding Complete ---")
    print(f"Stored {stored_chunks} chunks in ChromaDB")
    print(f"Document ID: {document_id}")
    print(f"--------------------------\n")
    
    return {
        "filename": file.filename,
        "document_id": document_id,
        "pages": len(pdf_reader.pages),
        "total_chunks": stored_chunks,
        "preview": chunks[0][:200] if chunks else ""
    }