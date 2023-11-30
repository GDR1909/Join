/**
 * Retrieves the "msg" parameter from the URL and displays it in the message box.
 * If no "msg" parameter is found, hides the message box.
 */
function getMsg() {
  const urlParams = new URLSearchParams(window.location.search);
  const msg = urlParams.get("msg");

  if (msg) {
    document.getElementById("msgBox").innerHTML = `${msg}`;
    document.getElementById("msgBoxDiv").classList.remove("d-none");
  } else {
    document.getElementById("msgBoxDiv").classList.remove("d-flex");
  }
}


/**
 * Redirects the user to the sign-up page.
 */
function leadToSignUp() {
  window.location.href = "signUp.html";
}


/**
 * Redirects the user to the guest login page.
 */
function guestLogIn() {
  window.location.replace("https://gruppenarbeit-join-578.developerakademie.net/Join/index.html");
}


/**
 * Performs user login based on provided email and password.
 * If successful, stores the current email in local storage and redirects to the main page.
 * Otherwise, displays an error message.
 */
async function login() {
  let email = document.getElementById("loginEmail");
  let password = document.getElementById("loginPassword");
  let user = userLogin.find(
    (u) => u.email == email.value && u.password == password.value
  );

  localStorage.setItem('currentEmail', email.value);

  console.log(user);
  if (user) {
    console.log("user gefunden");
    window.location.replace("https://gruppenarbeit-join-578.developerakademie.net/Join/index.html");
  } else {
    document.getElementById("msgBox").innerHTML = `Email oder Passwort nicht korrekt!`;
    document.getElementById("msgBoxDiv").classList.remove("d-none");
  }
}