/**
 * This function opens the AddTask overlay and executes another function.
 * 
 * @param {string} stat - This is the status that orders the task on the board.
 */
function openAddTaskOverlay(stat) {
    chosenStat = stat;
    document.getElementById('overlaySection').classList.remove('d-none');
    document.getElementById('overlaySection').innerHTML = /*html*/ `
        <form class="addTaskOverlay" id="addTaskForm" onclick="doNotClose(event); closeCategoryDropdownOverlay();">
            <div class="headlineContainerOverlay" id="headlineContainerOverlay"></div>
            <div class="contentLeftAndRightContainerOverlay" id="contentLeftAndRightContainerOverlay"></div>
            <div class="twoButtonsContainerOverlay" id="twoButtonsContainerOverlay"></div>
        </form>
    `;
    renderHeadlineOverlay();
}


/**
 * This function renders the headline in the overlay and executes 3 other functions.
 */
function renderHeadlineOverlay() {
    document.getElementById('headlineContainerOverlay').innerHTML = /*html*/ `
        <h1>Add Task</h1>
        <img src="./img/cancelIcon.png" onclick="closeOverlay()">
    `;
    renderContentLeftAndRightOverlay();
    renderContactsAddTask('assignedToOverlay');
    activatePrioButtonsOverlay();
}


/**
 * This function closes the overlay.
 */
function closeOverlay() {
    document.getElementById('overlaySection').classList.add('d-none');
}


/**
 * This function renders a div-container in the overlay called 'contentLeftAndRightContainerOverlay' and executes 2 other functions.
 */
function renderContentLeftAndRightOverlay() {
    document.getElementById('contentLeftAndRightContainerOverlay').innerHTML = generateContentLeftAndRightContainerOverlay();
    renderTwoButtonsContainerOverlay();
    setMinDate('dateOverlay');
}


/**
 * This function renders the contacts as an option-tag to the assignedTo-List.
 */
function renderContactsAddTaskOverlay() {
    for (let i = 0; i < allContacts.length; i++) {
        const allData = allContacts[i];
        const { name } = getJoinData(allData);
        const { color } = getJoinData(allData);
        document.getElementById('assignedToOverlay').innerHTML += /*html*/ `
            <option value="${color}">${name}</option>
        `;
    }
}


/**
 * This function renders a div-container with a 'clear' button and a 'create task' button and executes another function.
 */
function renderTwoButtonsContainerOverlay() {
    document.getElementById('twoButtonsContainerOverlay').innerHTML = generateTwoButtonsContainerOverlay();
    clearFieldsOverlay();
}


/**
 * This function updates the date in the dateArray with the new due date.
 */
function pushDateOverlay() {
    let dueDate = document.getElementById('dateOverlay').value;
    dateArray.splice(0, 1, dueDate);
}


/**
 * Activates priority buttons and associated event listeners in the overlay.
 * - The 'Urgent', 'Medium', and 'Low' buttons change the selected priority and update the button styles.
 * - The 'Reset' button resets the priority to 'Low'.
 * - The 'Assigned To' dropdown triggers the 'assignedTo' function.
 * - The form submission triggers the 'createTask' function.
 */
function activatePrioButtonsOverlay() {
    selectedPrioBtnOverlay('lowOverlay', 'low', 'lowIconOverlay', './img/lowWhiteIcon.png');

    let urgentBtn = document.getElementById('urgentOverlay');
    urgentBtn.addEventListener("click", function() {
        selectedPrioBtnOverlay('urgentOverlay', 'urgent', 'urgentIconOverlay', './img/urgentWhiteIcon.png');
        unselectPrioBtnOverlay('mediumOverlay', 'medium', 'mediumIconOverlay', './img/mediumIcon.png');
        unselectPrioBtnOverlay('lowOverlay', 'low', 'lowIconOverlay', './img/lowIcon.png');
    });

    let mediumBtn = document.getElementById('mediumOverlay');
    mediumBtn.addEventListener("click", function() {
        selectedPrioBtnOverlay('mediumOverlay', 'medium', 'mediumIconOverlay', './img/mediumWhiteIcon.png');
        unselectPrioBtnOverlay('urgentOverlay', 'urgent', 'urgentIconOverlay', './img/urgentIcon.png');
        unselectPrioBtnOverlay('lowOverlay', 'low', 'lowIconOverlay', './img/lowIcon.png');
    });

    let lowBtn = document.getElementById('lowOverlay');
    lowBtn.addEventListener("click", function() {
        selectedPrioBtnOverlay('lowOverlay', 'low', 'lowIconOverlay', './img/lowWhiteIcon.png');
        unselectPrioBtnOverlay('urgentOverlay', 'urgent', 'urgentIconOverlay', './img/urgentIcon.png');
        unselectPrioBtnOverlay('mediumOverlay', 'medium', 'mediumIconOverlay', './img/mediumIcon.png');
    });

    let resetBtn = document.getElementById('resetOverlay');
    resetBtn.addEventListener("click", function() {
        selectedPrioBtnOverlay('lowOverlay', 'low', 'lowIconOverlay', './img/lowWhiteIcon.png');
        unselectPrioBtnOverlay('urgentOverlay', 'urgent', 'urgentIconOverlay', './img/urgentIcon.png');
        unselectPrioBtnOverlay('mediumOverlay', 'medium', 'mediumIconOverlay', './img/mediumIcon.png');
    });

    let assignBtn = document.getElementById('assignedToOverlay');
    assignBtn.addEventListener("change", assignedToOverlay);

    document.getElementById('addTaskForm').addEventListener('submit', function (event) {
        event.preventDefault();
        createTaskOverlay();
    });
}


/**
 * Updates the style of the selected priority button in the overlay.
 * @param {string} prioBtnId - The ID of the priority button.
 * @param {string} prioBtnClassList - The CSS class to be added to the priority button.
 * @param {string} prioBtnIconId - The ID of the priority button icon.
 * @param {string} prioBtnWhiteIconSrc - The source of the white version of the priority button icon.
 */
function selectedPrioBtnOverlay(prioBtnId, prioBtnClassList, prioBtnIconId, prioBtnWhiteIconSrc) {
    let prioValue = document.getElementById(prioBtnId).value;
    prio = prioValue;

    document.getElementById(prioBtnId).classList.add(prioBtnClassList);
    document.getElementById(prioBtnIconId).src = prioBtnWhiteIconSrc;
}


/**
 * Resets the style of the unselected priority button in the overlay.
 * @param {string} prioBtnId - The ID of the priority button.
 * @param {string} prioBtnClassList - The CSS class to be removed from the priority button.
 * @param {string} prioBtnIconId - The ID of the priority button icon.
 * @param {string} prioBtnIconSrc - The source of the default version of the priority button icon.
 */
function unselectPrioBtnOverlay(prioBtnId, prioBtnClassList, prioBtnIconId, prioBtnIconSrc) {
    document.getElementById(prioBtnId).classList.remove(prioBtnClassList);
    document.getElementById(prioBtnIconId).src = prioBtnIconSrc;
}


/**
 * This function opens the dropdown menu to select a category.
 */
function openCategoryDropdownOverlay() {
    doNotClose(event);
    document.getElementById('categoryDropdownOverlay').classList.remove('d-none');
    document.getElementById('categoryOverlay').style.cssText = `
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        border-bottom: none;
    `;
    document.getElementById('categoryOverlay').onclick = closeCategoryDropdownOverlay;
}


/**
 * This function allows the user to create a new category.
 */
function newCategoryOverlay() {
    closeCategoryDropdownOverlay();
    document.getElementById('newCategoryContainerOverlay').classList.remove('d-none');
    document.getElementById('newCategoryColorsOverlay').classList.remove('d-none');
    document.getElementById('categoryOverlay').style.display = 'none';
}


/**
 * This function lets the user choose the color for the new category.
 * 
 * @param {string} color - The color that gets added to the new category.
 */
function addColorToNewCategoryOverlay(color) {
    document.getElementById('newCategoryColorOverlay').style.backgroundColor = color;
}


/**
 * This function cancels the new category and close the input field.
 */
function cancelNewCategoryOverlay() {
    document.getElementById('newCategoryInputOverlay').value = '';
    document.getElementById('newCategoryColorOverlay').style.backgroundColor = '';
    document.getElementById('newCategoryContainerOverlay').classList.add('d-none');
    document.getElementById('newCategoryColorsOverlay').classList.add('d-none');
    document.getElementById('categoryOverlay').style.display = 'flex';
    document.getElementById('categoryOverlay').innerHTML = 'Select task category';
}


/**
 * This function confirms the new category if the input field isn't empty.
 */
function confirmNewCategoryOverlay() {
    let newCategory = document.getElementById('newCategoryInputOverlay').value;
    let newCategoryColor = document.getElementById('newCategoryColorOverlay').style.backgroundColor;
    let newCategoryInput = document.getElementById('newCategoryInputOverlay');

    if (newCategoryInput.value == '') {
        newCategoryInput.focus();
    } else {
        selectedCategoryOverlay(newCategory, newCategoryColor);
        document.getElementById('newCategoryInputOverlay').value = '';
        document.getElementById('newCategoryColorOverlay').style.backgroundColor = '';
        document.getElementById('newCategoryContainerOverlay').classList.add('d-none');
        document.getElementById('newCategoryColorsOverlay').classList.add('d-none');
        document.getElementById('categoryOverlay').style.display = 'flex';
    }
}


/**
 * This function shows the selected category and executes another function.
 * 
 * @param {string} category - This is the name of the selected category.
 * @param {string} color - This is the color of the selected category.
 */
function selectedCategoryOverlay(category, color) {
    category = category.charAt(0).toUpperCase() + category.slice(1);
    document.getElementById('categoryOverlay').innerHTML = /*html*/ `
        ${category}
        <div class="categoryColor" style="background-color: ${color}; margin-left: 10px"></div>
    `;
    closeCategoryDropdownOverlay();
}


/**
 * This function closes the dropdown menu that shows the categories that are selectable.
 */
function closeCategoryDropdownOverlay() {
    document.getElementById('categoryDropdownOverlay').classList.add('d-none');
    document.getElementById('categoryOverlay').style.cssText = `
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border-bottom: 1px solid #D1D1D1;
    `;
    document.getElementById('categoryOverlay').onclick = openCategoryDropdownOverlay;
}


/**
 * This function disables the selected contact and if it's not already existend it will be pushed in arrays, and also another function will executed.
 */
function assignedToOverlay() {
    let assignee = document.getElementById("assignedToOverlay");
    let selectedAssignee = assignee.options[assignee.selectedIndex].value;
    let color = assignee.options[assignee.selectedIndex].id;
    let selectedAssignee2 = assignee.options[assignee.selectedIndex];
    selectedAssignee2.disabled = true;
    let i = assignee.selectedIndex - 1;
    let objId = i + 1;

    if (assignedToNames.indexOf(selectedAssignee) === -1) {
        assignedToNames.push(selectedAssignee);
        contactsColors.push(color);
        objIds.push(objId);
    }
    showAssignedToListOverlay();
}


/**
 * This function shows a list of the assigned contacts.
 */
function showAssignedToListOverlay() {
    let content = document.getElementById("assignedToListOverlay");
    content.innerHTML = "";

    for (let i = 0; i < assignedToNames.length; i++) {
        const name = assignedToNames[i];
        let bgColor = contactsColors[i];
        let objId = objIds[i];
        let initials = getInitials(name);
        content.innerHTML += /*html*/ `
            <div class="assigneeContainer" style="background-color: ${bgColor}" onclick="removeAssigneeOverlay(${i}, ${objId})">
                ${initials}
            </div>
        `;
    }
}


/**
 * This function remove an assigned contact when clicked on and enables it again.
 * 
 * @param {number} position - This is the position in the assignee in the assignedToNames array. 
 * @param {number} objId - This is the position in the objIds array.
 */
function removeAssigneeOverlay(position, objId) {
    assignedToNames.splice(position, 1);
    contactsColors.splice(position, 1);
    objIds.splice(position, 1);
    showAssignedToListOverlay();

    let assignee = document.getElementById("assignedToOverlay");
    let selectedAssignee2 = assignee.options[objId];
    selectedAssignee2.disabled = false;

    if (assignedToNames.length === 0) {
        assignee.selectedIndex = 0;
    }
}


/**
 * This function clears all selectable fields, input fields and arrays, and resets all buttons.
 */
function clearFieldsOverlay() {
    allSubtasks = [];
    assignedToNames = [];
    contactsColors = [];
    objIds = [];
    dateArray = [];
    document.getElementById('categoryOverlay').innerHTML = 'Select task category';
    document.getElementById('assignedToListOverlay').innerHTML = '';
    document.getElementById('subtasksList').innerHTML = '';
    closeCategoryDropdownOverlay();
    cancelNewCategoryOverlay();
    enableContactsForAssignedToOverlay();
}


/**
 * This function enables a contact.
 */
function enableContactsForAssignedToOverlay() {
    let assignee = document.getElementById("assignedToOverlay");
    for (let i = 1; i < assignee.options.length; i++) {
        let option = assignee.options[i];
        option.disabled = false;
    }
}


/**
 * This function creates a new Task, pushes it in the 'newTaskArray' and executes 3 other functions.
 */
function createTaskOverlay() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('categoryOverlay').innerText;
    category = checkIfCategoryIsSelected(category);
    let date = dateArray;

    let newTask = {
        'id': '',
        'title': title,
        'description': description,
        'category': category,
        'assignedTo': assignedToNames,
        'date': date,
        'prio': prio,
        'stat': chosenStat,
        'subtasks': allSubtasks,
        'isChecked': isChecked,
        'doneSubTasks': 0,
        'color': contactsColors
    };

    newTaskArray.push(newTask);
    saveTasks();
    clearFieldsOverlay();
    taskAddedToBoard();
}