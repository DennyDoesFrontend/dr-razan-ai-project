import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
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

function handleSignUp() {
  const emailInput = document.querySelector(".email-input");
  const passwordInput = document.querySelector(".password-input");
  if (!emailInput || !passwordInput) return;

  createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
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

  signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
    .then((userCredential) => {
      console.log("Signed in with email:", userCredential.user);
      window.location.href = "/chatbot.html";
    })
    .catch((error) => {
      console.error("Email sign-in error:", error.message);
    });
}

// =============================
// Event Listeners
// =============================
window.onload = () => {
  animateName();
  setInterval(animateName, 6000);

  GETSTARTED?.addEventListener("click", () => showPopup(SIGNUP));
  CLOSESIGNUPBTN?.addEventListener("click", () => hidePopup(SIGNUP));
  SIGNUPBTN?.addEventListener("click", handleSignUp);

  LOGINBTN?.addEventListener("click", () => showPopup(LOGIN));
  CLOSELOGINBTN?.addEventListener("click", () => hidePopup(LOGIN));
  SIGNINBTN?.addEventListener("click", handleSignIn);
};

function getdate() {
  const date = new Date();
  const option = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return date.toLocaleDateString("en-Us", option);
}

//array for symptoms
const symptoms = [
  {
    title: "Headache",
    description: "I feel a bit of pain on the left side of my head.",
    date: getdate(),
  },
  {
    title: "Kwashiorkor",
    description: "I feel like I have Kwashiorkor",
    date: getdate(),
  },
  {
    title: "Gonorhoea",
    description:
      "I have been struggling with Gonorhoea for months now and i just have one thing to say i would not wish this on anyone after all life is very valuable and fragile",
    date: getdate(),
  },
];

