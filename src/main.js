import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB084-ENowSoOexW2qMDdP5y2fntGqwU4o",
  authDomain: "razanai-677f7.firebaseapp.com",
  projectId: "razanai-677f7",
  storageBucket: "razanai-677f7.firebasestorage.app",
  messagingSenderId: "1013191736728",
  appId: "1:1013191736728:web:fa8424a8026279ad663fed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// sign up / create an account functionality here
const SIGNUPBTN = document.querySelector(".signup-btn");
SIGNUPBTN.addEventListener("click", () => {
  const email = document.querySelector(".email-input").value;
  const password = document.querySelector(".password-input").value;
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});

window.onload = function () {
  const nameArray = ["D", "r", ".", " ", "R", "a", "z", "a", "n"];
  let nameContainer = document.querySelector(".name-text");

  function showNameDisplay() {
    let i = 0;
    nameContainer.textContent = ""; // clear before animation
    let interval = setInterval(() => {
      nameContainer.textContent += nameArray[i];
      i++;
      if (i === nameArray.length) {
        clearInterval(interval);
      }
    }, 200);
  }

  // run immediately on load
  showNameDisplay();

  // repeat every 5 seconds
  setInterval(() => {
    showNameDisplay();
  }, 6000);

  // log in pop up && functionality
  const LOGINBTN = document.querySelector(".login-btn");
  const CLOSEBTN = document.querySelector(".close-btn");
  const SIGNUP = document.querySelector(".signup");

  LOGINBTN.addEventListener("click", () => {
    SIGNUP.classList.remove("collapse");
  });

  CLOSEBTN.addEventListener("click", () => {
    SIGNUP.classList.add("collapse");
  });
};
