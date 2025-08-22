import { initializeApp } from "firebase/app";
import { getAuth, getRedirectResult } from "firebase/auth";

// =============================
// Firebase Config & Initialization
// =============================
const firebaseConfig = {
  apiKey: "AIzaSyB084-ENowSoOexW2qMDdP5y2fntGqwU4o",
  authDomain: "razanai-677f7.firebaseapp.com",
  projectId: "razanai-677f7",
  storageBucket: "razanai-677f7.firebasestorage.app",
  messagingSenderId: "1013191736728",
  appId: "1:1013191736728:web:fa8424a8026279ad663fed",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

getRedirectResult(auth)
  .then((result) => {
    if (result) {
      console.log("Signed in:", result.user);
    }
  })
  .catch(console.error);
