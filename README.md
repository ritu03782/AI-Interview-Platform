# AuraInterviewer: AI Smart Interview Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit-brightgreen)](https://ai-interview-platform-ten-blush.vercel.app/)

**Live Demo:** [https://ai-interview-platform-ten-blush.vercel.app/](https://ai-interview-platform-ten-blush.vercel.app/)

AuraInterviewer is a full-stack AI mock interview platform. Upload your resume, choose a Technical or HR interview, answer personalized questions by typing or speaking, and get instant AI feedback with a final performance report.

<!-- Add screenshots here, for example:
![Home](docs/home.png)
![Interview](docs/interview.png)
![Report](docs/report.png)
-->

## Features

- **Google sign-in** with JWT sessions stored in httpOnly cookies
- **Resume analysis:** upload a PDF (up to 5 MB); the AI extracts your target role, experience, projects, and skills
- **Technical or HR interviews** with 5 personalized questions per session, progressing from easy to hard
- **Voice and text answers:** speak using browser speech recognition or type; questions can be read aloud with text-to-speech
- **Timed questions:** 60, 60, 90, 90, and 120 seconds per question
- **AI answer evaluation:** each answer is scored from 0 to 10 on confidence, communication, and correctness, with a short feedback line
- **Performance report:** overall score, skill breakdown, question-wise results, and charts, with PDF download
- **Interview history:** reopen any past report
- **Credit system with Razorpay:** new users get 100 free credits, and each interview costs 50 credits

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS, React Router, Redux Toolkit, Axios, Framer Motion, Recharts, jsPDF, Firebase Authentication |
| Backend | Node.js, Express, MongoDB, Mongoose, JWT, Multer, pdf.js (resume text extraction) |
| AI service | Python, FastAPI, OpenRouter (LLM access) |
| Payments | Razorpay |
| Voice | Web Speech API (speech recognition and speech synthesis, runs in the browser) |

## How It Works

```
React client  --HTTPS + cookie-->  Express API  --HTTP-->  FastAPI AI service  -->  OpenRouter LLM
                                       |
                                    MongoDB
```

1. The user signs in with Google.
2. The user uploads a resume PDF. The server extracts the text and the AI service returns role, experience, projects, and skills.
3. The user picks Technical or HR. The server generates 5 questions and deducts 50 credits.
4. For each answer, the AI service scores confidence, communication, and correctness, and returns feedback.
5. When the interview ends, the report page shows the averages, question-wise results, and a downloadable PDF.

## Credit Plans

| Plan | Price | Credits |
|---|---|---|
| Free (on signup) | ₹0 | 100 |
| Starter Pack | ₹100 | 150 |
| Pro Pack | ₹500 | 650 |

Each interview uses 50 credits.

## Project Structure

```text
AI-Interview-Platform/
├── client/                  # React + Vite frontend
│   └── src/
│       ├── pages/           # Home, Auth, Interview, History, Pricing, Report
│       ├── components/      # Setup, interview, and report steps
│       └── utils/           # Firebase setup
├── server/                  # Express backend
│   ├── controllers/         # auth, user, interview, payment
│   ├── models/              # User, Interview, Payment
│   ├── routes/
│   ├── middlewares/         # auth check, file upload
│   ├── services/            # Razorpay and helper services
│   ├── ai_service/          # FastAPI service (OpenRouter client)
│   └── index.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- Python 3.10 or later
- A MongoDB database (local or Atlas)
- An OpenRouter API key
- A Firebase project with Google sign-in enabled
- Razorpay test keys (only needed to test payments)

### 1. Clone

```bash
git clone https://github.com/ritu03782/AI-Interview-Platform.git
cd AI-Interview-Platform
```

### 2. AI service

```bash
cd server/ai_service
python -m venv venv
# Windows: venv\Scripts\activate    macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
```

Create `server/ai_service/.env`:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
```

Start it:

```bash
uvicorn main:app --reload --port 8001
```

### 3. Backend

```bash
cd server
npm install
mkdir -p public        # temporary folder used for resume uploads
```

Create `server/.env`:

```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=a_long_random_string
AI_SERVICE_URL=http://localhost:8001
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Start it:

```bash
npm run dev
```

### 4. Frontend

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_SERVER_URL=http://localhost:8000
VITE_FIREBASE_APIKEY=your_firebase_web_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Start it:

```bash
npm run dev
```

Open `http://localhost:5173`.

> Never commit `.env` files or real keys. Only values prefixed with `VITE_` are exposed to the browser, so never put secrets there. The Firebase web API key is a public identifier. Restrict it by domain in the Firebase console.

## API Overview

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/google` | Sign in with Google |
| GET | `/api/auth/logout` | Sign out |
| GET | `/api/user/current-user` | Get the signed-in user and credits |
| POST | `/api/interview/resume` | Upload and analyze a resume |
| POST | `/api/interview/generate-questions` | Create an interview with 5 questions |
| POST | `/api/interview/submit-answer` | Evaluate one answer |
| POST | `/api/interview/finish` | Finish the interview and get results |
| GET | `/api/interview/get-interview` | List past interviews |
| GET | `/api/interview/report/:id` | Get a report |
| POST | `/api/payment/order` | Create a Razorpay order |
| POST | `/api/payment/verify` | Verify a payment and add credits |

## Browser Support

Voice input and spoken questions use the browser's Web Speech API. Chrome and Edge work best. In browsers without it, use text answers.

## Roadmap

- Stricter server-side validation, rate limiting, and ownership checks on every route
- Separate question styles and rubrics for Technical and HR interviews
- More interview categories and difficulty levels
- Deeper performance analytics across sessions

## Author

**Ritu Singh**, B.Tech in Computer Science and Engineering, IET Lucknow
[GitHub](https://github.com/ritu03782) · [LinkedIn](https://www.linkedin.com/in/ritu-singh-6b07592aa)

If you find this project useful, consider giving it a star.
