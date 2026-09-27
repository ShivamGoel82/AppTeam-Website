# AppTeam Website 🚀

Official website for AppTeam NITH — showcasing achievements, outreach, projects, and contact. Built with a modern full-stack setup including React, Tailwind CSS, and Node.js + MongoDB backend.

---

## 🔗 Live Demo

🌐 [appteamwebsite.vercel.app](https://appteamwebsite.vercel.app)

---

## 📁 Project Structure
project/
├── backend/ # Express + MongoDB API server
├── frontend/ # React + Vite + Tailwind client
└── .gitignore

---

## ✨ Features

- Beautiful glassmorphic UI with Lucide icons
- Responsive and interactive design
- Achievements and team section
- Contact form (saved to MongoDB)
- Toast notifications on form submission
- Deployed via Vercel (frontend)

---

## 🚀 Tech Stack

### Frontend
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- Custom components (GlassCard, GlowButton)

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB + Mongoose](https://mongoosejs.com/)

---

## 🛠️ Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/ShivamGoel82/AppTeam-Website.git
cd AppTeam-Website
```

### 2. Environment Setup

#### Backend Environment Variables
1. Navigate to the backend directory:
```bash
cd backend
```

2. Copy the example environment file:
```bash
cp .env.example .env
```

3. Edit the `.env` file and add your actual values:
```bash
# Required: Add your MongoDB connection string
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# Optional: Customize other settings
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Install Dependencies

Install dependencies for both frontend and backend:
```bash
# From the root directory
npm run install-deps

# Or install separately
cd frontend && npm install
cd ../backend && npm install
```

### 4. Start Development Servers

#### Option 1: Start both servers simultaneously
```bash
# From root directory
npm run dev  # Starts frontend
npm run backend  # In another terminal, starts backend
```

#### Option 2: Start servers separately
```bash
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - Backend
cd backend
npm run dev
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.

---

## 🚀 Deployment

### Netlify Deployment (Frontend)

1. **Build the project:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify:**
   - Connect your GitHub repository to Netlify
   - Set build command: `cd frontend && npm run build`
   - Set publish directory: `frontend/dist`
   - The `netlify.toml` file is already configured

### Backend Deployment

The backend is currently deployed on Render. For your own deployment:

1. **Environment Variables:** Make sure to set all required environment variables in your hosting platform
2. **Database:** Ensure your MongoDB Atlas cluster allows connections from your hosting platform
3. **CORS:** Update the CORS configuration in `backend/server.js` to include your frontend domain

---

## 🔒 Security Notes

- Never commit `.env` files to version control
- Always use environment variables for sensitive data
- The `.env.example` file shows the required variables without sensitive values
- Make sure your MongoDB cluster has proper access controls

---

## 📁 Project Structure (Updated)
```
project/
├── backend/                 # Express + MongoDB API server
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── .env.example        # Environment variables template
│   └── server.js           # Main server file
├── frontend/               # React + Vite + Tailwind client
│   ├── src/                # Source code
│   ├── public/             # Static assets
│   └── dist/               # Build output (generated)
├── .gitignore              # Git ignore rules
├── netlify.toml            # Netlify configuration
└── README.md               # This file
```