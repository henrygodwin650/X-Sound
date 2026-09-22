import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR3RbYqCcXCWxazyNzI7tMZWDwgCxRSdI",
  authDomain: "xsound-web.firebaseapp.com",
  projectId: "xsound-web",
  storageBucket: "xsound-web.firebasestorage.app",
  messagingSenderId: "411810294193",
  appId: "1:411810294193:web:653c90948656215f76f590",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;