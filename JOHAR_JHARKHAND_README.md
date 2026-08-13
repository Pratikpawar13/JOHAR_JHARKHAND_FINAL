# 🌿 JOHAR JHARKHAND

> A modern digital tourism platform designed to showcase the culture, heritage, destinations, attractions, and tourism experiences of Jharkhand.

[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?logo=github)](https://github.com/Pratikpawar13/JOHAR_JHARKHAND_FINAL)
[![Frontend](https://img.shields.io/badge/Frontend-React-blue?logo=react)](https://react.dev/)
[![Backend](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb)](https://www.mongodb.com/)

---

## 📖 About the Project

**JOHAR JHARKHAND** is a tourism-focused web application that provides an engaging and informative platform for exploring the beauty, culture, heritage, and attractions of Jharkhand.

The platform brings together information about tourist destinations, waterfalls, forests, temples, historical places, tribal culture, local food, and other tourism experiences in a modern and user-friendly interface.

The goal of the project is to make discovering Jharkhand easier for tourists while promoting the state's natural beauty, cultural heritage, and local experiences.

---

## ✨ Features

### 🏞️ Tourism Exploration

- Explore popular tourist destinations across Jharkhand.
- Discover waterfalls, forests, temples, historical sites, and cultural attractions.
- View detailed information about different destinations.
- Browse tourism content through an interactive interface.

### 🗺️ Destination Information

- Destination descriptions
- Location information
- Images and visual content
- Cultural and historical information
- Travel-related details

### 👤 Authentication

- User registration
- User login
- Authentication management
- Protected application functionality

### 🤖 AI-Powered Features

- AI-based interactions
- Intelligent content processing
- AI-assisted tourism experience
- Smart tourism-related assistance

### 📱 Responsive Design

- 💻 Desktop
- 📱 Mobile
- 📲 Tablet

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- Axios

### Backend
- Node.js
- Express.js
- JavaScript

### Database
- MongoDB

### Authentication
- Authentication APIs
- JWT / session-based authentication

### AI / APIs
- Groq API
- Other third-party APIs used by the application

### Development Tools
- Git
- GitHub
- VS Code
- npm

---

## 📂 Project Structure

```text
JOHAR_JHARKHAND/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── services/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controller/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── setup-auth.js
│   ├── server.js
│   └── package.json
│
├── .env
├── .env.example
├── .gitignore
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/Pratikpawar13/JOHAR_JHARKHAND_FINAL.git
cd JOHAR_JHARKHAND_FINAL
```

---

# 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will usually be available at:

```text
http://localhost:5173
```

---

# ⚙️ Backend Setup

Open another terminal:

```bash
cd backend
npm install
npm run dev
```

If the project uses a standard start command:

```bash
npm start
```

---

# 🔐 Environment Variables

Create a `.env` file according to the environment variables required by the project.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
JWT_SECRET=your_jwt_secret
```

> **Never commit your `.env` file to GitHub.**

Create a `.env.example` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key_here
JWT_SECRET=your_jwt_secret_here
```

---

# 🛡️ Security

Make sure `.gitignore` contains:

```gitignore
.env
.env.*
!.env.example

node_modules/
dist/
build/
```

### ❌ Do Not Hardcode API Keys

Never do this:

```javascript
const GROQ_API_KEY = "gsk_xxxxxxxxx";
```

Instead:

```javascript
const GROQ_API_KEY = process.env.GROQ_API_KEY;
```

If an API key is accidentally pushed to GitHub:

1. Revoke the exposed key immediately.
2. Generate a new API key.
3. Remove the secret from Git history.
4. Update your local `.env` file.

---

# 👥 Team Collaboration

All team members should follow the Git workflow below.

## 1. Clone the Repository

```bash
git clone https://github.com/Pratikpawar13/JOHAR_JHARKHAND_FINAL.git
cd JOHAR_JHARKHAND_FINAL
```

## 2. Create a Feature Branch

Do **not** directly work on the `main` branch.

```bash
git checkout -b feature/your-feature-name
```

Example:

```bash
git checkout -b feature/login-screen
```

Other examples:

```text
feature/destination-page
feature/navbar
feature/ai-chatbot
feature/authentication
fix/login-error
fix/mobile-responsive
```

## 3. Make Your Changes

Implement and test your changes locally before committing them.

## 4. Commit Your Changes

```bash
git add .
git commit -m "Add login screen"
```

## 5. Push Your Branch

```bash
git push origin feature/your-feature-name
```

## 6. Create a Pull Request

Open GitHub and create a Pull Request from your feature branch into `main`.

### Recommended Workflow

```text
main
 │
 ├── feature/login-screen
 ├── feature/navbar
 ├── feature/destination-page
 ├── feature/ai-chatbot
 └── fix/mobile-responsive
```

---

# 🌐 Repository

[View Repository on GitHub](https://github.com/Pratikpawar13/JOHAR_JHARKHAND_FINAL)

---

# 📄 License

This project is developed for educational and project-based purposes.

---

# 👨‍💻 Author

**Pratik Pawar**

Built with ❤️ to promote the beauty, culture, heritage, and tourism of Jharkhand.
