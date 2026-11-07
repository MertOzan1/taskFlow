
// ==========================================
// Step 1 - HTML Elements
// ==========================================

// 1.1 Task Elements
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const clearCompletedButton = document.getElementById("clearCompletedButton");

// 1.2 Filter Buttons
const allTasksButton = document.getElementById("allTasksButton");
const activeTasksButton = document.getElementById("activeTasksButton");
const completedTasksButton = document.getElementById("completedTasksButton");

// 1.3 Language Buttons
const englishButton = document.getElementById("englishButton");
const turkishButton = document.getElementById("turkishButton");

// 1.4 Page Text Elements
const pageTitle = document.querySelector(".page-header h1");
const pageDescription = document.querySelector(".page-header p");
const sidebarDescription = document.querySelector(".sidebar-description");

// 1.5 Section Titles
const addTaskTitle = document.querySelector(".add-task-section h2");
const taskListTitle = document.querySelector(".task-section-header h2");

// 1.6 Task Counters
const totalTasks = document.getElementById("totalTasks");
const activeTasks = document.getElementById("activeTasks");
const completedTasks = document.getElementById("completedTasks");

// 1.7 Counter Titles
const totalTasksTitle = document.getElementById("totalTaskTitle");
const activeTasksTitle = document.getElementById("activeTaskTitle");
const completedTasksTitle = document.getElementById("completedTaskTitle");


// ==========================================
// Step 2 - Variables
// ==========================================

// 2.1 Main Variables
let tasks = [];
let currentFilter = "all";
let currentLanguage = "en";


// ==========================================
// Step 3 - Translations
// ==========================================

// 3.1 Language Texts
const translations = {

    en: {
        myTasks: "My Tasks",
        manageYourDay: "Manage your day",
        pageDescription: "Organize your work and stay productive.",

        allTasks: "All Tasks",
        activeTasks: "Active Tasks",
        completedTasks: "Completed Tasks",

        addNewTask: "Add a New Task",
        addTask: "Add Task",
        taskPlaceholder: "What needs to be done ?",

        myTaskList: "My Task List",
        clearCompleted: "Clear Completed",

        totalTasksLabel: "Total Tasks",
        activeTasksLabel: "Active Tasks",
        completedTasksLabel: "Completed Tasks",

        noTasks: "No tasks to display.",
        edit: "Edit",
        delete: "Delete",
        editPrompt: "Edit Task:"
    },

    tr: {
        myTasks: "Görevlerim",
        manageYourDay: "Gününü yönet",
        pageDescription: "İşlerini düzenle ve verimli kal.",

        allTasks: "Tüm Görevler",
        activeTasks: "Aktif Görevler",
        completedTasks: "Tamamlanan Görevler",

        addNewTask: "Yeni Görev Ekle",
        addTask: "Görev Ekle",
        taskPlaceholder: "Ne yapılması gerekiyor?",

        myTaskList: "Görev Listem",
        clearCompleted: "Tamamlananları Temizle",

        totalTasksLabel: "Toplam Görevler",
        activeTasksLabel: "Aktif Görevler",
        completedTasksLabel: "Tamamlanan Görevler",

        noTasks: "Gösterilecek görev yok.",
        edit: "Düzenle",
        delete: "Sil",
        editPrompt: "Görevi düzenle:"
    }
};


// ==========================================
// Step 4 - Local Storage
// ==========================================

// 4.1 Load Tasks
function loadTasks() {

    let savedTasks = localStorage.getItem("tasks");

    if (savedTasks !== null) {

        let parsedTasks = JSON.parse(savedTasks);

        tasks = parsedTasks.map(function(task) {

            return {
                text: task.text !== undefined ? task.text : task.metin,
                completed: task.completed !== undefined
                    ? task.completed
                    : task.tamamlandi
            };
        });
    }
}


// 4.2 Save Tasks
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// 4.3 Save Language
function saveLanguage() {

    localStorage.setItem("language", currentLanguage);
}


// ==========================================
// Step 5 - Filter Tasks
// ==========================================

// 5.1 Filter Tasks
function filterTasks() {

    if (currentFilter === "active") {

        return tasks.filter(function(task) {
            return task.completed === false;
        });
    }

    if (currentFilter === "completed") {

        return tasks.filter(function(task) {
            return task.completed === true;
        });
    }

    return tasks;
}


// 5.2 Set Filter
function setFilter(filter) {

    currentFilter = filter;

    displayTasks();
}


// ==========================================
// Step 6 - Update Task Counters
// ==========================================

// 6.1 Calculate and Display Task Counts
function updateTaskCounters() {

    let total = tasks.length;

    let active = tasks.filter(function(task) {
        return task.completed === false;
    }).length;

    let completed = tasks.filter(function(task) {
        return task.completed === true;
    }).length;

    totalTasks.textContent = total;
    activeTasks.textContent = active;
    completedTasks.textContent = completed;
}


// ==========================================
// Step 7 - Update Filter Buttons
// ==========================================

// 7.1 Highlight the Active Filter
function updateFilterButtons() {

    allTasksButton.classList.toggle(
        "active-filter",
        currentFilter === "all"
    );

    activeTasksButton.classList.toggle(
        "active-filter",
        currentFilter === "active"
    );

    completedTasksButton.classList.toggle(
        "active-filter",
        currentFilter === "completed"
    );
}


// ==========================================
// Step 8 - Display Tasks
// ==========================================

// 8.1 Display Filtered Tasks
function displayTasks() {

    // 8.2 Clear the Current List
    taskList.innerHTML = "";

    // 8.3 Get Filtered Tasks
    let filteredTasks = filterTasks();

    // 8.4 Display an Empty Message
    if (filteredTasks.length === 0) {

        let emptyMessage = document.createElement("li");

        emptyMessage.classList.add("empty-state");

        emptyMessage.textContent =
            translations[currentLanguage].noTasks;

        taskList.appendChild(emptyMessage);
    }

    // 8.5 Create Each Task
    filteredTasks.forEach(function(task) {

        let li = document.createElement("li");

        let taskText = document.createElement("span");

        taskText.textContent = task.text;

        // 8.6 Apply the Completed Task Style
        if (task.completed) {
            taskText.classList.add("completed");
        }

        // 8.7 Create the Action Container
        let taskActions = document.createElement("div");

        taskActions.classList.add("task-actions");

        // 8.8 Create the Edit Button
        let editButton = document.createElement("button");

        editButton.classList.add("edit-button");

        editButton.type = "button";

        editButton.textContent = "✎";

        // 8.9 Create the Delete Button
        let deleteButton = document.createElement("button");

        deleteButton.classList.add("delete-button");

        deleteButton.type = "button";

        deleteButton.textContent = "X";

        // 8.10 Add Elements to the Task
        li.appendChild(taskText);
        li.appendChild(taskActions);

        taskActions.appendChild(editButton);
        taskActions.appendChild(deleteButton);

        // 8.11 Toggle Task Completion
        li.addEventListener("click", function() {
            toggleTask(task);
        });

        // 8.12 Edit the Task
        editButton.addEventListener("click", function(event) {

            event.stopPropagation();

            editTask(task);
        });

        // 8.13 Delete the Task
        deleteButton.addEventListener("click", function(event) {

            event.stopPropagation();

            deleteTask(task);
        });

        taskList.appendChild(li);
    });

    // 8.14 Update Counters and Filter Buttons
    updateTaskCounters();

    updateFilterButtons();
}


// ==========================================
// Step 9 - Task Functions
// ==========================================

// 9.1 Add Task
function addTask() {

    let taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    let newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    taskInput.value = "";

    displayTasks();
}


// 9.2 Delete Task
function deleteTask(task) {

    tasks = tasks.filter(function(item) {
        return item !== task;
    });

    saveTasks();

    displayTasks();
}


// 9.3 Edit Task
function editTask(task) {

    let newText = prompt(
        translations[currentLanguage].editPrompt,
        task.text
    );

    if (newText === null || newText.trim() === "") {
        return;
    }

    task.text = newText.trim();

    saveTasks();

    displayTasks();
}


// 9.4 Toggle Task Completion
function toggleTask(task) {

    task.completed = !task.completed;

    saveTasks();

    displayTasks();
}


// 9.5 Clear Completed Tasks
function clearCompletedTasks() {

    tasks = tasks.filter(function(task) {
        return task.completed === false;
    });

    saveTasks();

    displayTasks();
}


// ==========================================
// Step 10 - Change Language
// ==========================================

// 10.1 Change the Selected Language
function changeLanguage(language) {

    currentLanguage = language;

    saveLanguage();

    let text = translations[currentLanguage];

    // 10.2 Update Page Texts
    pageTitle.textContent = text.myTasks;

    pageDescription.textContent = text.pageDescription;

    sidebarDescription.textContent = text.manageYourDay;

    // 10.3 Update Filter Buttons
    allTasksButton.textContent = text.allTasks;

    activeTasksButton.textContent = text.activeTasks;

    completedTasksButton.textContent = text.completedTasks;

    // 10.4 Update the Task Input Section
    addTaskTitle.textContent = text.addNewTask;

    taskInput.placeholder = text.taskPlaceholder;

    addTaskButton.textContent = text.addTask;

    // 10.5 Update the Task List Section
    taskListTitle.textContent = text.myTaskList;

    clearCompletedButton.textContent = text.clearCompleted;

    // 10.6 Update Counter Titles
    totalTasksTitle.textContent = text.totalTasksLabel;

    activeTasksTitle.textContent = text.activeTasksLabel;

    completedTasksTitle.textContent = text.completedTasksLabel;

    // 10.7 Update Language Button Styles
    englishButton.classList.toggle(
        "active-language",
        currentLanguage === "en"
    );

    turkishButton.classList.toggle(
        "active-language",
        currentLanguage === "tr"
    );

    // 10.8 Refresh the Task List
    displayTasks();
}


// ==========================================
// Step 11 - Event Listeners
// ==========================================

// 11.1 Add Task Button
addTaskButton.addEventListener("click", addTask);


// 11.2 Enter Key
taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTask();
    }
});


// 11.3 Filter Buttons
allTasksButton.addEventListener("click", function() {
    setFilter("all");
});

activeTasksButton.addEventListener("click", function() {
    setFilter("active");
});

completedTasksButton.addEventListener("click", function() {
    setFilter("completed");
});


// 11.4 Clear Completed Button
clearCompletedButton.addEventListener(
    "click",
    clearCompletedTasks
);


// 11.5 Language Buttons
englishButton.addEventListener("click", function() {
    changeLanguage("en");
});

turkishButton.addEventListener("click", function() {
    changeLanguage("tr");
});


// ==========================================
// Step 12 - Initialize Application
// ==========================================

// 12.1 Load Saved Tasks and Language
loadTasks();

let savedLanguage = localStorage.getItem("language");


// 12.2 Set the Initial Language
if (savedLanguage === "tr" || savedLanguage === "en") {

    changeLanguage(savedLanguage);

} else {

    changeLanguage("en");
}
