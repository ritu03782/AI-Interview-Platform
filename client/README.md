# AuraInterviewer – AI Smart Interview Platform

An AI-powered interview preparation platform that helps candidates practice technical interviews, improve their answers, and evaluate their interview performance through intelligent feedback.

## 🚀 Features

- **User Authentication:** Secure Google authentication and user account management.
- **Resume Analysis:** Upload your resume and analyze your skills and experience.
- **AI Question Generation:** Generate personalized interview questions based on your resume and selected interview preferences.
- **Interactive Interviews:** Practice answering AI-generated interview questions.
- **Answer Evaluation:** Receive AI-powered feedback and performance analysis.
- **Interview Reports:** View interview scores, feedback, and improvement suggestions.
- **Interview History:** Access previously completed interviews and their reports.
- **Credit System:** Manage interview credits through different pricing plans.
- **Online Payments:** Secure payment integration using Razorpay.

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript (JSX)
- Tailwind CSS
- React Router
- Redux Toolkit
- Axios
- Framer Motion / Motion
- Firebase Authentication

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer

### AI Service
- Python
- AI/LLM integration
- Resume analysis
- Interview question generation
- Answer evaluation

### Payment Integration
- Razorpay

## 📁 Project Structure

```text
AI-Interview-Platform/
│
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── .env
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── services/
│   ├── ai_service/
│   ├── index.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd AI-Interview-Platform
```

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

### 3. Backend Setup

Open another terminal:

```bash
cd server
npm install
npm run dev
```

Configure your backend environment variables in `server/.env`.

### 4. AI Service Setup

Navigate to the AI service directory:

```bash
cd server/ai_service
```

Create and activate a Python virtual environment:

**Windows:**

```bash
python -m venv venv
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the AI service using its configured startup command.

## 🔐 Environment Variables

Create the required `.env` files locally. Never commit actual credentials or secret keys to GitHub.

### Backend (`server/.env`)

```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Add your AI provider credentials and service configuration here
```

### Frontend (`client/.env`)

```env
VITE_SERVER_URL=http://localhost:8000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

**Note:** Only public configuration values should use the `VITE_` prefix. Never expose private API keys, database credentials, or payment secrets in frontend variables.

## 💳 Payment Integration

The platform uses Razorpay for payment processing.

Payment workflow:

1. User selects a credit plan.
2. Backend creates a Razorpay order.
3. Razorpay checkout handles the payment.
4. Backend verifies the payment signature.
5. User credits are updated after successful verification.

## 📊 Application Workflow

1. User signs in to the platform.
2. Uploads a resume.
3. AI analyzes the resume.
4. Personalized interview questions are generated.
5. User answers the questions.
6. AI evaluates the responses.
7. A detailed interview report is generated.
8. User can review performance and track interview history.

## 🔒 Security

- Authentication-protected API routes.
- Environment variables for sensitive configuration.
- Server-side payment signature verification.
- Backend-controlled user credit updates.
- Sensitive credentials should never be committed to version control.

## 🔮 Future Enhancements

- Real-time voice-based interviews.
- Advanced speech and communication analysis.
- More personalized interview difficulty levels.
- Detailed performance analytics.
- Support for additional interview categories.

## 👩‍💻 Author

**Ritu Singh**

B.Tech – Computer Science and Engineering

---

⭐ If you find this project useful, consider giving the repository a star!
