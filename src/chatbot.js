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

// navigation toggle
const NAVTOGGLE = document.querySelector(".nav-toggle");
const NAVBAR = document.querySelector(".navbar");
NAVTOGGLE.addEventListener("click", () => {
  if (NAVBAR.classList.contains("left-[-100%]")) {
    NAVBAR.classList.remove("left-[-100%]");
    NAVBAR.classList.add("left-0");

    // Animate in
    gsap.fromTo(
      NAVBAR,
      { x: "-100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 0.5, ease: "power3.out" }
    );

    NAVTOGGLE.classList.toggle("right-0");
  } else {
    NAVBAR.classList.remove("left-0");
    NAVBAR.classList.add("left-[-100%]");

    // Animate out
    gsap.to(NAVBAR, {
      x: "-100%",
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
    });

    NAVTOGGLE.classList.toggle("right-0");
  }
});

// NAVBAR.classList.toggle("left-[-100%]");
// NAVTOGGLE.classList.toggle("right-0");
