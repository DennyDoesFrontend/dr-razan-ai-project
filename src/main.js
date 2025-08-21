import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

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
const provider = new GoogleAuthProvider();

// =============================
// UI Elements
// =============================
const body = document.body;

// Signup
const SIGNUP = document.querySelector(".signup");
const SIGNUPBTN = document.querySelector(".signup-btn");
const GETSTARTED = document.querySelector(".getstarted-btn");
const CLOSESIGNUPBTN = document.querySelector(".signup-close-btn");
const SIGNINWITHGOOGLE = document.querySelector(".continue-with-google-btn");

// Login
const LOGIN = document.querySelector(".login");
const LOGINBTN = document.querySelector(".login-btn");
const CLOSELOGINBTN = document.querySelector(".close-log-in-btn");
const SIGNINBTN = document.querySelector(".log-in-btn2");

// Animated name text
const nameContainer = document.querySelector(".name-text");

// =============================
// Helper Functions
// =============================

// Animate name
function animateName() {
  if (!nameContainer) return;
  const nameArray = ["D", "r", ".", " ", "R", "a", "z", "a", "n"];
  let i = 0;
  nameContainer.textContent = "";

  const interval = setInterval(() => {
    nameContainer.textContent += nameArray[i];
    i++;
    if (i === nameArray.length) clearInterval(interval);
  }, 200);
}

// Show / Hide Popup
function showPopup(element) {
  if (!element) return;
  element.classList.remove("collapse");
  body.style.overflow = "hidden";
}

function hidePopup(element) {
  if (!element) return;
  element.classList.add("collapse");
  body.style.overflow = "scroll";
}

// Sign up new user
function handleSignUp() {
  const emailInput = document.querySelector(".email-input");
  const passwordInput = document.querySelector(".password-input");

  if (!emailInput || !passwordInput) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    console.log("Please enter both email and password");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User created:", userCredential.user);
    })
    .catch((error) => {
      console.error("Signup error:", error.message);
    });
}

function handleSignIn() {
  const emailInput = document.querySelector(".email-log-in-input");
  const passwordInput = document.querySelector(".password-log-in-input");

  if (!emailInput || !passwordInput) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    console.log("Please enter both email and password");
    return;
  }

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      window.location.href = "/src/pages/chatbot.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

// =============================
// Event Listeners
// =============================
window.onload = () => {
  // Animate name repeatedly
  animateName();
  setInterval(animateName, 6000);

  // Signup popup
  GETSTARTED?.addEventListener("click", () => showPopup(SIGNUP));
  CLOSESIGNUPBTN?.addEventListener("click", () => hidePopup(SIGNUP));
  SIGNUPBTN?.addEventListener("click", handleSignUp);

  // Login popup
  LOGINBTN?.addEventListener("click", () => showPopup(LOGIN));
  CLOSELOGINBTN?.addEventListener("click", () => hidePopup(LOGIN));
  SIGNINWITHGOOGLE?.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  });
  // SIGN IN WITH AN EXISTING ACCOUNT
  SIGNINBTN?.addEventListener("click", handleSignIn);
};
