import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBKvV10bNGTamfXVQ_2cbNpyTuqDOEExgY",
  authDomain: "cleanframe-f66e2.firebaseapp.com",
  projectId: "cleanframe-f66e2",
  storageBucket: "cleanframe-f66e2.firebasestorage.app",
  messagingSenderId: "111422317452",
  appId: "1:111422317452:web:8cb1623212b2291767eca9",
  measurementId: "G-KJR0LJRX21"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
