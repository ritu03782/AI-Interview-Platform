
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "aurainterview-aebe0.firebaseapp.com",
  projectId: "aurainterview-aebe0",
  storageBucket: "aurainterview-aebe0.firebasestorage.app",
  messagingSenderId: "186597417368",
  appId: "1:186597417368:web:6501a7f8cde3ceaaa48bed",
  measurementId: "G-Y2MK0LXRML"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}