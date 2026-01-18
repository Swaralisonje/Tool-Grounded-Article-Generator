**SourceCraft AI 🚀**

The Tool-Grounded Article Generator

SourceCraft AI is a full-stack content generation platform that harnesses the power of Groq (Llama 3) and DuckDuckGo Search to create accurate, SEO-optimized, and search-grounded articles in seconds.

**✨ Features**

🔍 Search Grounding: Real-time web search integration using DuckDuckGo to provide factual context to the AI.

🔗 URL Context: Optionally analyze a specific URL to use as a primary source for the article.

⚡ Blazing Fast AI: Powered by Groq's Llama-3-70b inference engine for near-instant generation.

📄 Structured Output: Generates a complete HTML article and separate JSON SEO metadata (Title, Description, Keywords).

🎨 Modern UI: A beautiful, responsive interface built with Next.js and Tailwind CSS (Glassmorphism design).

🔐 Authentication: Secure JWT-based login system (Demo mode: accepts any credentials).

📥 Export Options: One-click download of the generated article as an HTML file.

✨ Gen Z Mode: "Regenerate" feature to instantly rewrite content for a younger audience using a different tonality.


**🛠️ Tech Stack**

Backend Framework: FastAPI (Python)

AI Model: Groq API (Llama-3.3-70b-versatile)

Search Tool: duckduckgo-search (No API key required)

Auth: JWT (JSON Web Tokens) with python-jose

Frontend Framework: Next.js 14 (App Router)

Styling: Tailwind CSS

State: React Hooks & LocalStorage


**🚀 Installation & Setup**

1. Backend Setup
Navigate to the backend folder and set up the Python environment.

Bash

cd backend

# 1. Create a virtual environment
python -m venv venv

# 2. Activate the virtual environment
Windows:
venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt
Create a .env file in the backend/ folder:

Code snippet

# Get a free key at https://console.groq.com
GROQ_API_KEY=your_actual_groq_api_key_here

# Security settings (can be anything for local dev)
SECRET_KEY=supersecretkey123
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
Run the Backend Server:

Bash

uvicorn main:app --reload
Server will start at http://127.0.0.1:8000

2. Frontend Setup
Open a new terminal and navigate to the frontend folder.

Bash

cd frontend

# 1. Install Node dependencies
npm install

# 2. Run the development server
npm run dev
Frontend will start at http://localhost:3000

📖 Usage Guide
Login: Open http://localhost:3000. You will be redirected to the login page.

Username: admin (or anything)

Password: password (or anything)

Note: This is a demo auth system; any input works.

Generate Article:

Query: Enter a topic (e.g., "Latest breakthroughs in Solid State Batteries").

Reference URL (Optional): Paste a link if you want the AI to focus on a specific source.

Click "Generate Article".

View & Export:

Read the generated HTML article on the left.

Check the SEO Metadata (Title, Description, Keywords) on the right sidebar.

Click "Export HTML" to download the file.

Regenerate:

Click "✨ Regenerate for Gen Z Audience" at the bottom of the article to see a completely rewritten version with a casual, younger tone.


