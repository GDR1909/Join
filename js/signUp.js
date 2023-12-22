let test123 = [];
let userLogin = [];


/**
 * Initializes the login functionality by loading user login data and displaying messages.
 */
async function initLogin() {
  await loadUserLogin();
  await getMsg();
}


/**
 * Loads user login data from storage.
 */
async function loadUserLogin() {
  let users = JSON.parse(await getItem("userLogin"));
  userLogin = users;
}


/**
 * Handles the sign-up process, disables the sign-up button, adds a new user to the userLogin array,
 * stores the updated user data, resets the sign-up form, and redirects to the login page.
 */
async function signUp() {
  signUpbtn.disabled = true;
  userLogin.push({
    name: signUpName.value,
    email: signUpEmail.value,
    password: signUpPassword.value,
  });

  await setItem("userLogin", JSON.stringify(userLogin));
  resetForm();
  window.location.href = "login.html?msg=Du hast dich erfolgreich registriert";
}


/**
 * Redirects the user back to the login page.
 */
function goBackToLogin() {
  window.location.href = "login.html";
}


/**
 * Resets the sign-up form by clearing input fields and enabling the sign-up button.
 */
function resetForm() {
  signUpName.value = "";
  signUpEmail.value = "";
  signUpPassword.value = "";
  signUpbtn.disabled = false;
}