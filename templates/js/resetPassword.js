let index = localStorage.getItem('index');


/**
 * Displays the email pop-up message animation.
 */
function popUpMessageEmail() {
    document.getElementById('buttonAnimationEmail').classList.remove('d-none');
}


/**
 * Displays the password pop-up message animation.
 */
function popUpMessagePw() {
    document.getElementById('buttonAnimationPw').classList.remove('d-none');
}


/**
 * Initiates the password reset process, displays the password pop-up message animation,
 * and redirects to the reset password page after a delay.
 */
function resetPassword() {
    let email = document.getElementById('forgotPwEmail').value;
    popUpMessagePw();
    i = resetUserPassword(email);
    setTimeout(function () {
        window.location.href = "resetPassword.html";
    }, 1800);
    localStorage.setItem('index', i);
}


/**
 * Initiates the process to go back to the login page, displays the email pop-up message animation,
 * sets a new password, and redirects to the login page after a delay.
 */
async function backToLogin() {
    popUpMessageEmail();
    await setNewPassword();
    setTimeout(function () {
        window.location.href = "login.html";
    }, 1800);
}


/**
 * Finds the index of the user with the specified email for password reset.
 * @param {string} email - The email for which the password is being reset.
 * @returns {number} - The index of the user in the userLogin array.
 */
function resetUserPassword(email) {
    let i = userLogin.findIndex(function (a) {
        return a.email === email;
    });
    console.log(i);
    return i;
}


/**
 * Sets a new password for the user based on the stored index.
 */
async function setNewPassword() {
    let password = document.getElementById('resetPassword').value;
    let passwordRepeat = document.getElementById('repeatPassword').value;
    if (password === passwordRepeat) {
        userLogin[index]['password'] = password;
        await setItem("userLogin", JSON.stringify(userLogin));
    }
}