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
};
