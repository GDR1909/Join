/**
 * Adds a new subtask to the task identified by the given ID and updates the subtask list.
 * @param {number} Id - The index of the task in the newTaskArray.
 */
function newModifySubtask(Id) {
    let newSubtask = document.getElementById('subtasks').value;

    newTaskArray[Id]['subtasks'].push(newSubtask);
    document.getElementById('subtasks').value = '';
    renderModifySubtaskList(Id);
}


/**
 * Renders all Subtasks for the current Task.
 * @param {number} Id - index of the current Task.
 */
function renderModifySubtaskList(Id) {
    let content = document.getElementById('subtasksList');
    let task = newTaskArray[Id];

    content.innerHTML = '';
    for (let i = 0; i < task['subtasks'].length; i++) {
        const subtask = task['subtasks'][i];
        let isChecked = task['isChecked'][i];

        if (isChecked == true) {
            content.innerHTML += renderCheckedBoxTemplateHTML(i, Id, subtask);
        }

        if (isChecked == false) {
            content.innerHTML += renderUncheckedBoxTemplateHTML(i, Id, subtask);
        }
    }
}


/**
 * Changes the visibility of the delete task image by adding a 'd-none' class
 * and reveals a light version of the image by removing the 'd-none' class.
 */
function changeImg() {
    let deleteImg = document.getElementById('deleteTask-Img');
    let deleteImgLight = document.getElementById('deleteTask-light-Img');

    deleteImg.classList.add('d-none');
    deleteImgLight.classList.remove('d-none');
}


/**
 * Reverts the visibility of the delete task image by removing the 'd-none' class
 * and hides the light version of the image by adding the 'd-none' class.
 */
function changeImgBack() {
    let deleteImg = document.getElementById('deleteTask-Img');
    let deleteImgLight = document.getElementById('deleteTask-light-Img');

    deleteImg.classList.remove('d-none');
    deleteImgLight.classList.add('d-none');
}


/**
 * Renders all contacts in the select-area.
 * @param {number} Id - index of the current task.
 */
function renderContactsModifyAddTask(Id) {
    activateEvent();
    let content = document.getElementById('assignedTo');

    content.innerHTML = /*html*/`
        <option value="" disabled selected>Select contacts to assign</option>
    `;

    for (let i = 0; i < allContacts.length; i++) {
        const allData = allContacts[i];
        const { name } = getJoinData(allData);
        const { color } = getJoinData(allData);

        if (newTaskArray[Id]['assignedTo'].includes(name)) {
            content.innerHTML += /*html*/ `
                <option disabled id="${color}" value="${Id}">${name}</option>
        ` } else {
            content.innerHTML += /*html*/ `
                    <option id="${color}" value="${Id}">${name}</option>
                `
        }
    }
}


/**
 * Calls the function modifyAssignedTo(), when an option is pressed.
 */
function activateEvent() {
    let modifyAssignBtn = document.getElementById('assignedTo');
    modifyAssignBtn.addEventListener("change", modifyAssignedTo);
}


/**
 * Modifies the assigned team member for a task based on user selection.
 */
function modifyAssignedTo() {
    let assignee = document.getElementById("assignedTo");
    let Id = assignee.options[assignee.selectedIndex].value;
    let color = assignee.options[assignee.selectedIndex].id;
    let name = assignee.options[assignee.selectedIndex].innerHTML;
    let selectedAssignee2 = assignee.options[assignee.selectedIndex];
    selectedAssignee2.disabled = true;
    let i = (assignee.selectedIndex) - 1;

    if (newTaskArray[Id]['assignedTo'].indexOf(name) === -1) {
        newTaskArray[Id]['assignedTo'].push(name);
        newTaskArray[Id]['color'].push(color);
    }
    renderModifyAssignmentsHTML(Id);
}


/**
 * Changes the status of the task based on the specified direction.
 * @param {number} Id - The index of the current task.
 * @param {string} direction - The direction of the status change ('up' or 'down').
 */
function changeStat(Id, direction) {
    let currentTask = newTaskArray[Id];
    let index = taskStatusClasses.indexOf(currentTask['stat']);

    if (direction == 'up' && index <= 2) {
        currentTask['stat'] = taskStatusClasses[index + 1];
    }

    if (direction == 'down' && index > 0) {
        currentTask['stat'] = taskStatusClasses[index - 1];
    }
    saveTasks();
    updateBoardTasks();
}


/**
 * Delets the cklicked Assignment from the Task.
 * @param {number} i - index of the current assignment.
 * @param {number} Id - index of the current Task.
 */
function deleteAssignmentOption(i, Id) {
    let currentTask = newTaskArray[Id];

    currentTask['assignedTo'].splice(i, 1);
    renderModifyAssignmentsHTML(Id);

    let assignee = document.getElementById("modifyAssignedTo");
    let selectedAssignee2 = assignee.options[i];
    selectedAssignee2.disabled = false;

    if (currentTask['assignedTo'].length === 0) {
        assignee.selectedIndex = 0;
    }
}


/**
 * Controls the Amount of done Subtasks.
 * @param {number} i - index of current subtask.
 * @param {number} Id - index of current task.
 */
function configDoneSubtask(i, Id) {
    let task = newTaskArray[Id];
    let currentStatus = document.getElementById(`subtaskCheckBox${i}`).checked;

    if (currentStatus == true) {
        task['doneSubTasks']++;
    }

    if (currentStatus == false) {
        task['doneSubTasks']--;
    }
    task['isChecked'][i] = currentStatus;
}


/**
 * Calculates the progress in percent.
 * @param {number} subTaskAmount - amount of all subtasks from the currentt task. 
 * @param {number} doneAmount - amount of done subtasks.
 * @returns - progress in percent
 */
function calculateProgress(subTaskAmount, doneAmount) {
    if (doneAmount > subTaskAmount) {
        doneAmount = subTaskAmount;
    }

    let progressInPercent = 100 / subTaskAmount * doneAmount;
    return progressInPercent;
}


/** 
 * Confirms the changes on the current task and save them on the server.
*/
function confirmChangesOnTask(Id) {
    let currentTask = newTaskArray[Id];
    let newTitle = document.getElementById('modifyTitle').value;
    let newDescription = document.getElementById('modifyDescription').value;
    let newDate = document.getElementById('modifyDate').value;

    currentTask['title'] = newTitle;
    currentTask['description'] = newDescription;
    currentTask['date'] = newDate;
    currentTask['prio'] = newPrio;

    closeTaskPopUp();
    saveTasks();
    updateBoardTasks();
}


/**
 * Delets the current Task.
 * @param {number} Id - index of the current Task.
 */
function deleteTask(Id) {
    newTaskArray.splice(Id, 1);
    giveTaskId();
    closeTaskPopUp();
    saveTasks();
    updateBoardTasks();
}


///////////////////////Drag & Drop/////////////////////////////////

/**
 * highlighted the current dragged task
 * @param {number} id - index of the current task.
 */
function startDragging(id) {
    currentDraggedTask = id;
    document.getElementById(`pinnedTaskContainer${currentDraggedTask}`).classList.add('rotateDeg');
}


/**
 * Allows to drop off elements.
 * @param {Event} ev -
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * Changes the stat of the dragged task.
 * @param {string} stat - status of the statusbar above which the dragged element is dropped off.
 */
function drop(stat) {
    newTaskArray[currentDraggedTask]['stat'] = stat;
    document.getElementById(`pinnedTaskContainer${currentDraggedTask}`).classList.remove('rotateDeg');
    saveTasks();
    updateBoardTasks();
}


////////////Search for Task////////////////////////////

/**
 * Filters all tasks that contain the value of the search field and pushs them in the filterArray.
 */
function searchTask() {
    let searchInput = document.getElementById('searchInput').value;

    for (let i = 0; i < newTaskArray.length; i++) {
        const currentTask = newTaskArray[i];
        let search = searchInput.toLowerCase();
        let search2 = capitalizeFirstLetter(search);

        if (currentTask['title'].includes(search) || currentTask['description'].includes(search)) {
            filteredTasks.push(currentTask);
        } else if (currentTask['title'].includes(search2) || currentTask['description'].includes(search2)) {
            filteredTasks.push(currentTask);
        }
    }
    renderFilteredTasks('filteredTasks');
}


/**
 * makes the initial letter uppercase.
 * @param {string} string - chosen Contact.
 * @returns string with inital letter uppercase
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


/**
 * renders all tasks that are in the filterarray. At the end the array is emptied.
 */
function renderFilteredTasks() {
    renderTodoTasksHTML(filteredTasks);
    renderInProgressHTML(filteredTasks);
    renderAwaitingFeedbackHTML(filteredTasks);
    renderDoneHTML(filteredTasks);
    filteredTasks = [];
}