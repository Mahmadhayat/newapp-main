# Full-Stack Application

A modern full-stack web application built with React (frontend) and FastAPI (backend).

## 🚀 Tech Stack

**Frontend:**
- React 19
- Tailwind CSS
- Radix UI Components
- React Router DOM
- Axios for API calls

**Backend:**
- FastAPI
- MongoDB with Motor (async driver)
- Pydantic for data validation
- CORS middleware

## 📁 Project Structure

```
├── frontend/          # React application
├── backend/           # FastAPI server
├── tests/            # Test files
└── README.md         # This file
```

## 🛠️ Local Development

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- MongoDB

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Backend Setup
```bash
cd backend
pip install fastapi uvicorn motor python-dotenv
uvicorn server:app --reload
```

### Environment Variables

**Backend (.env):**
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=your_database_name
```

**Frontend (.env):**
```
REACT_APP_BACKEND_URL=http://localhost:8000
```

## 🚀 Deployment

This application can be deployed on various platforms:

- **Frontend**: Vercel, Netlify, or any static hosting
- **Backend**: Railway, Render, or Heroku
- **Database**: MongoDB Atlas

## 📝 API Endpoints

- `GET /api/` - Health check
- `POST /api/status` - Create status check
- `GET /api/status` - Get all status checks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
