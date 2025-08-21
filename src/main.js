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
      window.location.href = "/chatbot.html";
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
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      // Mobile → use redirect
      signInWithRedirect(auth, provider);
    } else {
      // Desktop → use popup
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          console.log("Signed in (popup):", user);
        })
        .catch((error) => {
          console.error("Popup sign-in error:", error.message);
        });
    }
  });

  // When page loads, check redirect result
  getRedirectResult(auth)
    .then((result) => {
      if (result?.user) {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log("Signed in (redirect):", user);
      }
    })
    .catch((error) => {
      console.error("Redirect sign-in error:", error.message);
    });

  // SIGN IN WITH AN EXISTING ACCOUNT
  SIGNINBTN?.addEventListener("click", handleSignIn);
};
