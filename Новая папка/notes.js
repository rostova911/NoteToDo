



const buttonAddTask = document.querySelector('.note_app_add_btn');
const displayInput = document.querySelector('.note_app_display');
const pDone = document.querySelector('.scorebar_p');
const ul = document.querySelector('.ul');
const mainUl = document.querySelector('.note_app_main_ul');
const defaultHintP = document.querySelector('.default_hint');
const scoreboardSpan = document.querySelector('.count_tasks');
let numberOfCompletedTasks = 0;

let tasks = JSON.parse(localStorage.getItem('tasks')) || []; //сюда складываем данные из браузера, если их нет, то пустой массив



// Сохранение массива в localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Добавление задачи
function addTask() {

    const text = displayInput.value.trim();

    if (!text) return displayInput.focus();

    const task = {
        text: text,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    renderTasks();

    displayInput.value = '';
    displayInput.focus();
}


// Отображение задач на странице
function renderTasks() {

    ul.innerHTML = '';

    tasks.forEach(task => {

        const li = document.createElement('li');

        li.textContent = task.text;               //вместо innerHTML чтобы не вставился случайный код
        
        const div = document.createElement('div');
        div.classList.add('div_remove_btn');
        li.appendChild(div);
        const img = document.createElement('img');     // Создаём картинку
        img.classList.add('remove_btn');
        img.src = 'bin.png';
        div.appendChild(img);

        if (task.completed) {
            li.classList.add('checked');
        }

        ul.appendChild(li);

    });

    numberOfCompletedTasks = tasks.filter(task => task.completed).length;

    defaultHint();

    scoreDoneImg();

    scoreboardSpan.innerHTML = `${numberOfCompletedTasks}/${tasks.length}`;
}


// Обработка кликов по задачам
function liEventListener(e) {

    const li = e.target.closest('li');

    if (!li || !ul.contains(li)) return;

    const index = [...ul.children].indexOf(li);

    if (e.target.tagName === 'LI') {

        tasks[index].completed = !tasks[index].completed;

    }

    else if (e.target.tagName === 'IMG') {

        tasks.splice(index, 1);

    }

    saveTasks();

    renderTasks();
}









// Иконка выполненных задач
function scoreDoneImg() {

    if (numberOfCompletedTasks === ul.children.length && ul.children.length !== 0) {
        scoreboardSpan.classList.add('done_img');
    }
    else {
        scoreboardSpan.classList.remove('done_img');
    }
}


// Подсказка при отсутствии задач
function defaultHint() {

    if (ul.children.length > 0) {
        defaultHintP.classList.add('hidden');
    }
    else {
        defaultHintP.classList.remove('hidden');
    }
}


// Событие Enter
displayInput.addEventListener('keydown', (e) => {

    if (e.key === 'Enter') {
        addTask();
    }

});


// Событие кнопки Add
buttonAddTask.addEventListener('click', () => {

    addTask();

});


// События списка
ul.addEventListener('click', (e) => {

    liEventListener(e);

});


// Восстановление задач при загрузке страницы
renderTasks();





























