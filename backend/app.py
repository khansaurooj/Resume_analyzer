import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from pdfminer.high_level import extract_text
from docx import Document

# Try OpenAI import (optional)
try:
    from openai import OpenAI
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
except Exception as e:
    print("OpenAI client not available:", e)
    client = None

# Flask app
app = Flask(__name__)
CORS(app)  # allow frontend requests (Vercel → Render)

# Ensure uploads folder exists
os.makedirs("uploads", exist_ok=True)

# Local free model
embedder = SentenceTransformer("all-MiniLM-L6-v2")

# Expanded skills database
skills_db = [
    "python", "java", "c++", "javascript", "typescript",
    "flask", "django", "react", "angular", "vue",
    "sql", "mysql", "mongodb", "postgresql",
    "nlp", "machine learning", "deep learning", "pytorch", "tensorflow",
    "docker", "kubernetes", "aws", "azure", "gcp"
]

# ---------- Helpers ----------

def extract_resume_text(file_path):
    """Extract text from PDF, DOCX, or TXT resumes"""
    if file_path.endswith(".pdf"):
        return extract_text(file_path)
    elif file_path.endswith(".docx"):
        doc = Document(file_path)
        return "\n".join([p.text for p in doc.paragraphs])
    elif file_path.endswith(".txt"):
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            return f.read()
    return ""


def analyze_with_local(resume_text, job_desc):
    """Local free analysis: similarity + skill matching"""
    embeddings = embedder.encode([resume_text, job_desc], convert_to_numpy=True)
    similarity = float(cosine_similarity([embeddings[0]], [embeddings[1]])[0][0])

    found = [s for s in skills_db if s in resume_text.lower()]
    missing = [s for s in skills_db if s in job_desc.lower() and s not in found]

    suggestions = []
    if missing:
        suggestions.append(f"Add these skills to match the job: {', '.join(missing)}")
    if similarity < 0.6:
        suggestions.append("Your resume could be better aligned with this job description.")
    if not suggestions:
        suggestions.append("Your resume already aligns well! 🎉")

    return {
        "similarity": round(similarity, 2),
        "skills_found": found,
        "missing_skills": missing,
        "suggestions": suggestions
    }


def analyze_with_ai(resume_text, job_desc):
    """Optional AI-powered enhancement if API key is available"""
    if client is None:
        return None
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a professional career advisor."},
                {"role": "user", "content": f"""
                Resume: {resume_text}
                Job Description: {job_desc}
                Please provide:
                - Candidate summary
                - Matching job roles
                - Recommended industries
                - Missing skills & certifications
                """}
            ],
            max_tokens=600
        )
        return response.choices[0].message.content
    except Exception as e:
        print("OpenAI error:", e)
        return None

# ---------- Routes ----------

@app.route("/api/analyze", methods=["POST"])
def analyze_resume():
    """Main endpoint for resume analysis"""
    file = request.files.get("file")
    job_desc = request.form.get("job_desc", "")

    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    # Save temporarily
    path = os.path.join("uploads", file.filename)
    file.save(path)

    # Extract text
    resume_text = extract_resume_text(path)
    os.remove(path)  # cleanup

    # Always run local analysis
    local_results = analyze_with_local(resume_text, job_desc)

    # Try AI enhancement
    ai_report = analyze_with_ai(resume_text, job_desc)

    return jsonify({
        "resume_text": resume_text[:500] + "...",  # truncate preview
        "local_analysis": local_results,
        "ai_recommendations": ai_report or "AI enhancement unavailable — using local analysis only."
    })


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "message": "Resume Analyzer API running"})


# ---------- Run ----------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)), debug=True)
