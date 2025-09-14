**📄 AI Resume Analyzer**

🚀 An AI-powered web application that helps candidates analyze their resumes against job descriptions.
It highlights skill matches, missing skills, similarity score, and AI recommendations using Flask (backend) and React + Bootstrap (frontend).

**🌟 Features**

✅ Upload resumes in PDF, DOCX, or TXT format

✅ Paste any job description for comparison

✅ Local ML model (Sentence Transformers) for free similarity & skill matching

✅ Optional GPT-powered AI recommendations (if OPENAI_API_KEY provided)

✅ Highlighted skills found vs missing skills

✅ Clean and responsive Bootstrap frontend

✅ Deployable on Render (backend) + Vercel (frontend)

**🛠️ Tech Stack**
**Frontend**

React (Vite)

Bootstrap 5

Framer Motion (animations)

**Backend**

Flask (Python)

Flask-CORS

Sentence Transformers (all-MiniLM-L6-v2)

PDFMiner & python-docx for resume parsing

**Optional: OpenAI GPT (enhanced analysis)**

**⚙️ Installation & Setup**

1️⃣ Clone the Repository
git clone https://github.com/your-username/AI_RESUME_ANALYZER.git
cd AI_RESUME_ANALYZER

2️⃣ Backend Setup (Flask + Python)
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt


**Create a .env file in /backend:**

OPENAI_API_KEY=your_api_key_here   # optional


**Run backend:**

python app.py


By default it runs on http://localhost:5000

**3️⃣ Frontend Setup (React + Vite + Bootstrap)**
cd frontend
npm install
npm run dev


By default it runs on http://localhost:5173

**🚀 Deployment**
Backend (Flask → Render)
Push backend folder to GitHub
Connect repo to Render
Add environment variables (OPENAI_API_KEY, PORT=5000)
Deploy → Render provides your API URL
Frontend (React → Vercel)
Push frontend folder to GitHub
Connect repo to Vercel
In UploadPage.js, replace:
fetch("http://localhost:5000/api/analyze", {
with your Render backend URL, e.g.:
fetch("https://your-backend.onrender.com/api/analyze", {
Deploy → Vercel provides frontend URL

**📊 API Endpoints**
POST /api/analyze

Upload resume + job description

Returns similarity, skills found, missing skills, and AI recommendations

GET /api/health

Health check endpoint

**📂 Project Structure**

AI_RESUME_ANALYZER/
│── backend/
│ ├── app.py
│ ├── requirements.txt
│ ├── uploads/ # temporary resume uploads (gitignored)
│ └── .env # environment variables (gitignored)
│
│── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── UploadForm.jsx
│ │ │ ├── ResultCard.jsx
│ │ │ └── LoadingSpinner.jsx
│ │ ├── pages/
│ │ │ └── UploadPage.jsx
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── package.json
│ └── vite.config.js
│
│── .gitignore
│── README.md



**🔮 Future Improvements**

Add multi-language support
Provide resume formatting tips
Export results as PDF report

**🤝 Contributing**

Contributions are welcome!
Fork the repo
Create a feature branch
Submit a Pull Request

**📜 License**

MIT License © 2025
