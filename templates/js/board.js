let taskStatus = ['To Do', 'In progress', 'Awaiting Feedback', 'Done'];
let dragTargets = ['todo', 'in progress', 'awaiting feedback', 'done'];
let taskStatusClasses = ['todo', 'inProgress', 'awaitingFeedback', 'done'];
let priories = ['low', 'medium', 'urgent'];
let currentDraggedTask;
let currentDraggedOnStatus;
let filteredTasks = [];
let newPrio;
let chosenStat = 'todo';

/**
 * This function assigns an id to each json from the task list.
 */
function giveTaskId() {
    for (let i = 0; i < newTaskArray.length; i++) {
        const currentTask = newTaskArray[i];
        
        currentTask['id'] = i;
    }
    removeClassContentSectionAddTask();
}


///////////////RenderFunktionen////////////////////////
/**
 * This function updates all dynamic elements on the board.
 */
function updateBoardTasks() {
    renderTodoTasksHTML(newTaskArray);
    renderInProgressHTML(newTaskArray);
    renderAwaitingFeedbackHTML(newTaskArray);
    renderDoneHTML(newTaskArray);
    showProgressbar();
}

/**
 * Renders the Headsection and the Boardsection
 */
function renderBoardHTML() {
    let content = document.getElementById('contentSection');
    
    content.innerHTML = '';
    content.innerHTML += renderBoardTemplateHTML();
    document.getElementById('body').classList.add('hideScrollBarY');
    document.getElementById('boardBody').classList.add('showScrollBarY');
    renderBoardHeaderHTML();
    renderStatusFieldsHTML();
}

/**
 * Renders Headline, Searchfield and Button into the Headsection
 */
function renderBoardHeaderHTML() {
    let content = document.getElementById('boardHeadlineContainer');

    content.innerHTML = '';

    content.innerHTML += renderBoardHeaderTemplateHTML();
}

/**
 * Renders the status bars to the boardsection
 */
function renderStatusFieldsHTML() {
    let content = document.getElementById('boardContentContainer');

    content.innerHTML = '';

    for (let i = 0; i < taskStatus.length; i++) {
        const stat = taskStatus[i];
        const statClass = taskStatusClasses[i];

        content.innerHTML += renderStatusfieldsTemplateHTML(i, stat, statClass);
    }
    updateBoardTasks();
}

/**
 * Renders all Tasks with the stat:'todo'.
 * @param {string} arrayName - The name of the array which is called.
 */
function renderTodoTasksHTML(arrayName) {
    let content = document.getElementById('statContainer0');
    let todos = arrayName.filter(task => task['stat'] == 'todo');

    content.innerHTML = '';


    for (let i = 0; i < todos.length; i++) {
        const task = todos[i];
        let subtasksAmount = task['subtasks'].length;
        let doneSubtasks = task['doneSubTasks'];
        let ProgressPercent = calculateProgress(subtasksAmount, doneSubtasks);

        content.innerHTML += generatePinnedTaskHTML(task, ProgressPercent);
        renderAssignedToHTML(task);
    }
}

/**
 * Renders all Tasks with the stat:'in Progress'.
 * @param {string} arrayName - The name of the array which is called.
 */
function renderInProgressHTML(arrayName) {
    let content = document.getElementById('statContainer1');
    let inProgress = arrayName.filter(task => task['stat'] == 'inProgress');

    content.innerHTML = '';

    for (let i = 0; i < inProgress.length; i++) {
        const task = inProgress[i];
        let subtasksAmount = task['subtasks'].length;
        let doneSubtasks = task['doneSubTasks'];
        let ProgressPercent = calculateProgress(subtasksAmount, doneSubtasks);

        content.innerHTML += generatePinnedTaskHTML(task, ProgressPercent);
        renderAssignedToHTML(task);
    }
}

/**
 * Renders all Tasks with the stat:'awaiting Feedback'.
 * @param {string} arrayName - The name of the array which is called.
 */
function renderAwaitingFeedbackHTML(arrayName) {
    let content = document.getElementById('statContainer2');
    let awaitingFeedback = arrayName.filter(task => task['stat'] == 'awaitingFeedback');

    content.innerHTML = '';

        for (let i = 0; i < awaitingFeedback.length; i++) {
            const task = awaitingFeedback[i];
            let subtasksAmount = task['subtasks'].length;
            let doneSubtasks = task['doneSubTasks'];
            let ProgressPercent = calculateProgress(subtasksAmount, doneSubtasks);
    
            content.innerHTML += generatePinnedTaskHTML(task, ProgressPercent);
            renderAssignedToHTML(task);
        }
}

/**
 * Renders all Tasks with the stat:'done'.
 * @param {string} arrayName - The name of the array which is called.
 */
function renderDoneHTML(arrayName) {
    let content = document.getElementById('statContainer3');
    let done = arrayName.filter(task => task['stat'] == 'done');

    content.innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const task = done[i];
        let subtasksAmount = task['subtasks'].length;
        let doneSubtasks = task['doneSubTasks'];
        let ProgressPercent = calculateProgress(subtasksAmount, doneSubtasks);

        content.innerHTML += generatePinnedTaskHTML(task, ProgressPercent);
        renderAssignedToHTML(task);
    }
}

/**
 * Checks the amount of assignments and controls how many are displayed.
 * @param {object} task - current Object from the Array, that is iterated in the for-loop.
 */
function renderAssignedToHTML(task) {
    let content = document.getElementById(`assignedToContainer${task['id']}`);
    let assignmentCount = task['assignedTo'].length -3;

    content.innerHTML = '';
    if (task['assignedTo'].length <= 3) {
        renderTaskAssignmentListHTML(task, task['assignedTo'].length);
    } else {
        renderTaskAssignmentListHTML(task, '3');
    }

    if(task['assignedTo'].length > 3) {
        content.innerHTML += renderTaskAssignmentCountHTML(assignmentCount);
    }
}

/**
 * Renders all assignments for every JSON
 * @param {object} task - current JSON.
 * @param {string} count - the number of assignments that are not displayed.
 */
function renderTaskAssignmentListHTML(task, count) {
    let content = document.getElementById(`assignedToContainer${task['id']}`);

    for (let i = 0; i < count; i++) {
        const assignment = task['assignedTo'][i];
        let initials = getInitials(assignment);
        let bgColor = task['color'][i];
   
        content.innerHTML += renderTaskAssignmentsTemplateHTML(task, bgColor, initials);
    }
}

/**
 * If a JSOn from the array contains subtasks, a proggressbar is rendered. 
 */
function showProgressbar() {
    for (let i = 0; i < newTaskArray.length; i++) {
        const task = newTaskArray[i];

        if(task['subtasks'].length > 0) {
            document.getElementById(`progressContainer${task['id']}`).classList.remove('d-none');
        }
    }
}


///////////////////////Task-Pop-Up/////////////////////////////////

/**
 * Shows the Pop-Up Overview of the clicked Task.
 * @param {number} Id - the index of the Task of the newTaskArray.
 */
function openExistingTaskPopUp(Id) {
    renderClickedTaskPopUpHTML(Id);
    document.getElementById('overlaySection').classList.remove('d-none');
}

/**
 * the popup disappears by using display: none.
 */
function closeTaskPopUp() {
    document.getElementById('overlaySection').classList.add('d-none');
}

/**
 * Renders all Informations from the JSON into the Pop-up.
 * @param {number} Id - the index of the Task.
 */
function renderClickedTaskPopUpHTML(Id) {
    let content = document.getElementById('overlaySection');
    let clickedTask = newTaskArray[Id];
    content.innerHTML = '';

    content.innerHTML += renderClickedTaskOverviewPopUpTemplateHTML(clickedTask, Id);

    renderTaskPopUpTableHTML(clickedTask);
    renderTaskPopUpAssignmentsHTML(clickedTask);
    renderSubtasksOverview(Id);
}

/**
 * Renders the date and the prio to the pop-up.
 * @param {object} clickedTask - current JSON from the newTaskArray.
 */
function renderTaskPopUpTableHTML(clickedTask) {
    let content = document.getElementById('taskPopUpTable');

    content.innerHTML = '';

    content.innerHTML += renderTaskPopUpTableTemplateHTML(clickedTask);
}

/**
 * Renders all assignments to the pop-up.
 * @param {object} clickedTask - current JSON from the newTaskArray.
 */
function renderTaskPopUpAssignmentsHTML(clickedTask) {
    let content = document.getElementById('taskPopUpAssignmentsList');

    content.innerHTML = '';

    for (let i = 0; i < clickedTask['assignedTo'].length; i++) {
        const assignment = clickedTask['assignedTo'][i];
        let initials = getInitials(assignment);
        let bgColor = clickedTask['color'][i];
        
        content.innerHTML += renderTaskAssignmentsPlusInitialsTemplateHTML(assignment, initials, bgColor);
    } 
}

/**
 * Calls the renderfunction for the modify-pop-up.
 * @param {number} Id - the inndex of the current Task.
 */
function openModifyTaskPopUp(Id) {
    modifyCurrentTaskHTML(Id);
}

/**
 * renders the pop-up, where you can modify the clicked Task.
 * @param {nummber} Id - the index of the current Task.
 */
function modifyCurrentTaskHTML(Id) {
    let content = document.getElementById('overlaySection');
    let currentTask = newTaskArray[Id];
    let prio = currentTask['prio'];
    
    content.innerHTML = '';
    content.innerHTML = renderModifyTaskTemplateHTML(currentTask);

    renderModifyAssignmentsHTML(Id);
    setMinDate('modifyDate');
    modifyPrio(prio);
    renderModifySubtaskList(Id);

}

/**
 * Renders all assignments to the modify-pop-up.
 * @param {number} Id - the index of the current Task.
 */
function renderModifyAssignmentsHTML(Id) {
    let currentTask = newTaskArray[Id];
    let content = document.getElementById(`modifyPopUpAssignmentContainer${currentTask['id']}`);

    content.innerHTML = '';

    for (let i = 0; i < currentTask['assignedTo'].length; i++) {
        const assignment = currentTask['assignedTo'][i];
        let initials = getInitials(assignment);
        let bgColor = currentTask['color'][i];
        
        content.innerHTML += modifyAssignmentsTemplateHTML(i, Id, bgColor, initials);
    }
}


function renderSubtasksOverview(Id) {
    let content = document.getElementById('subtasksOverview');

    content.innerHTML = '';
    let task = newTaskArray[Id];

    for (let i = 0; i < task['subtasks'].length; i++) {
        const subtask = task['subtasks'][i];
        let isChecked = task['isChecked'][i];

            content.innerHTML += /*html*/`
                <div>${i + 1}. ${subtask}</div>
            `;
    }
}

/**
 * controls which priobutton is highlighted on the modify-pop-up.
 * @param {object} currentPriority - current priority, selected for this task.
 */
function modifyPrio(currentPriority) {
    let currentPrio = capitalizeFirstLetter(currentPriority);
    let prioValue = document.getElementById(`modify${currentPrio}`).value;
    newPrio = prioValue;
    let otherPrios = priories.filter(currentPriority => currentPriority !== `${prioValue}`);
    let otherPrio1 = capitalizeFirstLetter(otherPrios[0]);
    let otherPrio2 = capitalizeFirstLetter(otherPrios[1]);

    document.getElementById(`modify${currentPrio}`).classList.add(`${prioValue}`);
    document.getElementById(`modify${currentPrio}Icon`).src = `./img/${prioValue}WhiteIcon.png`;

    document.getElementById(`modify${otherPrio1}`).classList.remove(`${otherPrios[0]}`);
    document.getElementById(`modify${otherPrio1}Icon`).src = `./img/${otherPrios[0]}Icon.png`;

    document.getElementById(`modify${otherPrio2}`).classList.remove(`${otherPrios[1]}`);
    document.getElementById(`modify${otherPrio2}Icon`).src = `./img/${otherPrios[1]}Icon.png`;
}



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

        if(isChecked == true) {
            content.innerHTML += renderCheckedBoxTemplateHTML(i, Id, subtask);
        } 
        if(isChecked == false) {
            content.innerHTML += renderUncheckedBoxTemplateHTML(i, Id, subtask);
        }
    }
}


function changeImg() {
    let deleteImg = document.getElementById('deleteTask-Img');
    let deleteImgLight = document.getElementById('deleteTask-light-Img');

    deleteImg.classList.add('d-none');
    deleteImgLight.classList.remove('d-none');
}


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

        if(newTaskArray[Id]['assignedTo'].includes(name)) {
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


function changeStat(Id, direction) {
    let currentTask = newTaskArray[Id];
    let index = taskStatusClasses.indexOf(currentTask['stat']);

    if(direction == 'up' && index <= 2) {
        currentTask['stat'] = taskStatusClasses[index + 1];
    } 

    if(direction == 'down' && index > 0) {
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

    if(currentStatus == true) {
        task['doneSubTasks']++;
    } 
    
    if (currentStatus == false) {
        task['doneSubTasks']--;
        console.log(task['doneSubTasks']);
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
    newTaskArray[currentDraggedTask]['stat']  = stat;
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
        let search2 =  capitalizeFirstLetter(search);

        if (currentTask['title'].includes(search) || currentTask['description'].includes(search)) {
            filteredTasks.push(currentTask);
            } else if(currentTask['title'].includes(search2) || currentTask['description'].includes(search2)) {
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














