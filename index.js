let todos = []


const buttonEl = document.getElementById("button-el")
const inputEl = document.getElementById("input-el")
const todoRenderEl = document.getElementById("todoRender-el")
const localStorageContent = localStorage.getItem("todoElements")
const clearEl = document.getElementById("clear-el")

//EVENT LISTENERS
buttonEl.addEventListener("click", buttonHandler)
document.addEventListener("DOMContentLoaded", getFromLocalStorage)
inputEl.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        buttonHandler()
    }
})
inputEl.focus()

//BUTTONS
function buttonHandler() {
    if (inputEl.value != "") {
        todoRenderEl.textContent = ""
        todos.push({
            "text": inputEl.value,
            "done": false
        })
        todos.forEach((item, i) => {
            item.id = i
        })
        rendered()
        inputEl.value = ""
    }
}

clearEl.addEventListener("click", () => {
    localStorage.clear()
    todos = []
    rendered()
})

function deleteButtonHandler(i) {
    todos.splice(i, 1)
    rendered()
}
function strikeTrough(i) {
    let selectedText = document.getElementById(i)
    selectedText.classList.toggle("taskDone")
}

//RENDER
function rendered() {
    todoRenderEl.innerHTML = ""
    if (todos.length > 0) {
        for (let i = 0; i < todos.length; i++) {
            todoRenderEl.innerHTML +=
                `<li>
            <input type="checkbox" onchange="strikeTrough(${i})" />
            <span id="${i}" class="todoElement">${todos[i].text}</span>
            <button id="${i}" onclick="deleteButtonHandler(${i})" class="deleteButton">DELETE</button>
            </li>`
        }
        feedLocalStorage()
    }
    inputEl.focus()
}

//HANDLING LOCAL STORAGE
function feedLocalStorage() {
    if (todos) {
        localStorage.setItem("todoElements", JSON.stringify(todos))
    }
}

function getFromLocalStorage() {
    if (localStorageContent) {
        todos = JSON.parse(localStorageContent)
        rendered()
    }
}