from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langchain_text_splitters import RecursiveCharacterTextSplitter
from google import genai
import pypdf
import chromadb
import io
import os
from dotenv import load_dotenv
from fastapi.responses import StreamingResponse
import json

load_dotenv()

gemini_client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
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

@app.post("/query")
async def query(request: dict):
    question = request.get("question")
    document_id = request.get("document_id")
    
    if not question:
        raise HTTPException(status_code=400, detail="Question is required")
    
    result = gemini_client.models.embed_content(
        model="models/gemini-embedding-001",
        contents=question,
    )
    question_embedding = result.embeddings[0].values
    
    collection = chroma_client.get_or_create_collection(name="documents")
    
    where_filter = {"document_id": document_id} if document_id else None
    
    results = collection.query(
        query_embeddings=[question_embedding],
        n_results=5,
        where=where_filter,
    )
    
    chunks = results["documents"][0]
    metadatas = results["metadatas"][0]
    distances = results["distances"][0]
    
    print(f"\n--- Query Results ---")
    print(f"Question: {question}")
    print(f"Top {len(chunks)} chunks found")
    print(f"Distances: {distances}")
    print(f"--------------------\n")
    
    return {
        "question": question,
        "chunks": [
            {
                "text": chunk,
                "metadata": metadata,
                "distance": distance
            }
            for chunk, metadata, distance in zip(chunks, metadatas, distances)
        ]
    }

@app.post("/ask")
async def ask(request: dict):
    question = request.get("question")
    document_id = request.get("document_id")
    
    if not question or not document_id:
        raise HTTPException(status_code=400, detail="question and document_id are required")
    
    # Embed the question
    result = gemini_client.models.embed_content(
        model="models/gemini-embedding-001",
        contents=question,
    )
    question_embedding = result.embeddings[0].values
    
    # Retrieve relevant chunks
    collection = chroma_client.get_or_create_collection(name="documents")
    results = collection.query(
        query_embeddings=[question_embedding],
        n_results=5,
        where={"document_id": document_id},
    )
    
    chunks = results["documents"][0]
    
    if not chunks:
        raise HTTPException(status_code=404, detail="No relevant content found for this document")
    
    # Construct prompt
    context = "\n\n".join([f"Excerpt {i+1}:\n{chunk}" for i, chunk in enumerate(chunks)])
    
    prompt = f"""You are a helpful assistant that answers questions based on the provided document excerpts.
    
Document excerpts:
{context}

Question: {question}

Answer the question based only on the provided excerpts. If the answer cannot be found in the excerpts, say so clearly."""
    
    # Call Gemini
    response = gemini_client.models.generate_content(
        model="gemini-flash-latest",
        contents=prompt,
    )
    
    answer = response.text
    
    print(f"\n--- Q&A Complete ---")
    print(f"Question: {question}")
    print(f"Answer preview: {answer[:200]}")
    print(f"--------------------\n")
    
    return {
        "question": question,
        "answer": answer,
        "chunks_used": len(chunks),
        "sources": [{"text": chunk[:200], "chunk_index": i} for i, chunk in enumerate(chunks)]
    }

@app.post("/ask-stream")
async def ask_stream(request: dict):
    question = request.get("question")
    document_id = request.get("document_id")

    if not question or not document_id:
        raise HTTPException(status_code=400, detail="question and document_id are required")

    result = gemini_client.models.embed_content(
        model = "models/gemini-embedding-001",
        contents = question,
    )
    question_embedding = result.embeddings[0].values

    collection = chroma_client.get_or_create_collection(name="documents")
    results = collection.query(
        query_embeddings=[question_embedding],
        n_results=5,
        where={"document_id": document_id},
    )

    chunks = results["documents"][0]

    if not chunks:
        raise HTTPException(status_code=404, detail="No relevant content found")

    context = "\n\n".join([f"Excerpt {i+1}:\n{chunk}" for i, chunk in enumerate(chunks)])

    prompt = f"""You are a helpful assistant that answers questions based on the provided document excerpts.

Document excerpts:
{context}

Question: {question}

Answer the question based on the provided excerpts. If the answer cannot be found in the excerpts, say so clearly."""

    async def generate():
        async for chunk in await gemini_client.aio.models.generate_content_stream(
            model="gemini-flash-latest",
            contents=prompt,
        ):
            if chunk.text:
                data = json.dumps({"text": chunk.text})
                yield f"data: {data}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        }
    )
