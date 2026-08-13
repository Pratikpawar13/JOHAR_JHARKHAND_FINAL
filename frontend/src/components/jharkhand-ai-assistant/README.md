# 🌐 Jharkhand Assistive AI Chatbot + Trip Planner 🚀

An **AI-powered multilingual RAG chatbot** integrated with an **interactive trip planner** for Jharkhand tourism.  
It combines **Retrieval-Augmented Generation (RAG)** with **LLM-based reasoning** to provide cultural, historical, and travel-related assistance in an engaging conversational manner.

---

## ✨ Features

✅ **Knowledge-Grounded Chatbot**  
- Answers queries about **Jharkhand’s culture, history, art, food, and tourist spots**.  
- Uses a **local Knowledge Base (KB)** + RAG for reliable factual responses.  

✅ **AI Trip Planner**  
- Collects user preferences (budget, duration, food, interests, etc.).  
- Generates **personalized day-by-day itineraries** for Jharkhand.  
- Supports **constraints** like must-see spots, avoidable conditions, and group type.  

✅ **Interactive CLI**  
- Lightweight **terminal chat interface** (`python -m cli.chat_terminal`).  
- Feels like a personal travel assistant.  

✅ **Extendable Knowledge Base**  
- Add your own JSON entries in `kb/kb.json`.  
- Supports **vector search** with embeddings for retrieval.  

✅ **Deployment Ready**  
- Designed for **local development & GitHub hosting**.  
- Can be extended into a **web or mobile app** frontend.  

---

## 📂 Project Structure

AI_CHATBOT/
│
├── app/
│ ├── llm.py # LLM API call wrapper
│ ├── config.py # API keys & constants
│ ├── retriever.py # Knowledge Base search (RAG)
│ ├── trip_planner.py # Trip planner logic
│
├── cli/
│ ├── chat_terminal.py # Terminal chat interface
│
├── kb/
│ ├── kb.json # Knowledge base snippets
│
├── logs/
│ ├── trips/ # Saved generated trip plans
│
├── requirements.txt # Python dependencies
├── README.md # 📖 Project documentation
└── .env.example # Template for environment variables

yaml
Copy code

---

## ⚡ Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd YOUR-REPO
2. Setup Virtual Environment
bash
Copy code
python -m venv env
source env/bin/activate   # For Linux/Mac
env\Scripts\activate      # For Windows
3. Install Dependencies
bash
Copy code
pip install -r requirements.txt
4. Configure Environment
Create a .env file:

ini
Copy code
OPENROUTER_API_KEY=your_openrouter_api_key
MODEL_ID=mistralai/mistral-7b-instruct
OPENAI_API_BASE=https://openrouter.ai/api/v1
MIN_SIMILARITY=0.70
TOP_K=3
5. Run the Chatbot
bash
Copy code
python -m cli.chat_terminal
🧩 Usage
Example: Asking a cultural question
vbnet
Copy code
You: Tell me about Paitkar Painting
Bot: Paitkar Painting is one of the oldest tribal paintings of Jharkhand...
Example: Planning a trip
vbnet
Copy code
You: make my trip
Bot: Let's build your Jharkhand trip — answer these briefly.
Start city (e.g., Ranchi): Ranchi
How many days? (e.g., 4): 4
Approx total budget in INR (numbers only): 8000
...
✅ Your personalized itinerary is ready!
🛠️ Tech Stack
Python 3.10+

LLM API (Groq / OpenRouter / HuggingFace models)

RAG (Retrieval-Augmented Generation) with ChromaDB

JSON-based Knowledge Base

CLI Interface for interactive usage

📌 Roadmap
 🌍 Add multilingual support (Hindi, Santhali, Nagpuri).

 🎨 Build a web-based chatbot frontend (React + FastAPI).

 📱 Mobile-first UI for tourist accessibility.

 🗺️ Integrate maps & live transport APIs.

 🤝 Connect with Jharkhand tourism board datasets.

🤝 Contributing
We welcome contributions! 🚀

Fork the repo

Create your feature branch (git checkout -b feature-XYZ)

Commit changes (git commit -m 'Added XYZ feature')

Push branch (git push origin feature-XYZ)

Open a Pull Request

📜 License
This project is licensed under the MIT License – free to use, modify, and distribute.

🌟 Acknowledgments
Jharkhand Tourism & Culture References

OpenAI / Groq / HuggingFace for LLM APIs

ChromaDB for vector search
