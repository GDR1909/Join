let allContacts = [];
let lastActivePage = 'sidebarSummary';


/**
 * Initializes the application by loading contacts, tasks, including HTML, and initializing the summary.
 */
async function init() {
    await loadContacts();
    await loadTasks();
    includeHTML();
    initSummary();
    removeClassContentSectionAddTask();
}


/**
 * Renders the summary page, initializes the summary, and highlights the corresponding sidebar button.
 */
function renderSummary() {
    initSummary();
    let sidebarSummary = document.getElementById('sidebarSummary');
    highlightSidebarBtn(sidebarSummary);
    lastActivePage = 'sidebarSummary';
}


/**
 * Renders the board page, gives task ID, renders the HTML, and highlights the corresponding sidebar button.
 */
function renderBoard() {
    giveTaskId();
    renderBoardHTML();
    let sidebarBoard = document.getElementById('sidebarBoard');
    highlightSidebarBtn(sidebarBoard);
    lastActivePage = 'sidebarBoard';
}


/**
 * Renders the add task page, initializes the add task, and highlights the corresponding sidebar button.
 */
function renderAddTask() {
    initAddTask();
    let sidebarAddTask = document.getElementById('sidebarAddTask');
    highlightSidebarBtn(sidebarAddTask);
    lastActivePage = 'sidebarAddTask';
}


/**
 * Renders the contacts page, initializes the contacts, and highlights the corresponding sidebar button.
 */
function renderContacts() {
    initContacts();
    let sidebarContacts = document.getElementById('sidebarContacts');
    highlightSidebarBtn(sidebarContacts);
    lastActivePage = 'sidebarContacts';
}


/**
 * Shows the legal notice screen by generating HTML and highlighting the corresponding sidebar button.
 */
function showLegalNoticeScreen() {
    contentSection.innerHTML = generateLegalNoticeScreenHTML();
    let sidebarLegal = document.getElementById('sidebarLegal');
    document.getElementById('headerContentRightLogout').style.display = 'none'
    highlightSidebarBtn(sidebarLegal);
}


/**
 * Shows the help screen by generating HTML and highlighting the corresponding sidebar button.
 */
function showHelpScreen() {
    contentSection.innerHTML = generateHelpScreenHTML();
    let helpLogoBtn = document.getElementById('helpLogoBtn');
    document.getElementById('headerContentRightLogout').style.display = 'none'
    highlightSidebarBtn(helpLogoBtn);
}


/**
 * Extracts relevant data from the provided object.
 * @param {Object} allData - Object containing contact information.
 * @returns {Object} Object with properties: name, email, phone, color, initials, and group.
 */
function getJoinData(allData) {
    let name = allData['name'];
    let email = allData['email'];
    let phone = allData['phone'];
    let color = allData['color'];
    let initials = allData['initials'];
    let group = allData['group'];
    return { name, email, phone, color, initials, group };
}


/**
 * Prevents the event from propagating.
 * @param {Event} event - The event object.
 */
function doNotClose(event) {
    event.stopPropagation();
}


/**
 * Logs out the user and redirects to the login page.
 */
function logOut() {
    window.location.replace("./templates/html/login.html");
    localStorage.removeItem("currentEmail");
}


/**
 * Toggles the display of the logout options.
 */
function showLogOut() {
    if (document.getElementById('headerContentRightLogout').style.display == 'none') {
        document.getElementById('headerContentRightLogout').style.display = 'block';
    } else {
        document.getElementById('headerContentRightLogout').style.display = 'none';
    }
}


/**
 * Highlights the active sidebar button and removes the highlight from others.
 * @param {HTMLElement} element - The sidebar button element to highlight.
 */
function highlightSidebarBtn(element) {
    const buttons = document.getElementsByClassName('sidebarBtn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('sidebarBtnActive');
    }
    element.classList.add('sidebarBtnActive');
}


/**
 * Returns to the last active page by triggering a click on the corresponding sidebar button.
 */
function returnToLastActivePage() {
    let nextScreen = document.getElementById(`${lastActivePage}`);
    nextScreen.click();
}


/**
 * Removes a CSS class from the content section.
 */
function removeClassContentSectionAddTask() {
    document.getElementById('contentSection').classList.remove('contentSectionAddTask');
}