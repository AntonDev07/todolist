const formContainer = document.querySelector('.form');
const formInput = document.querySelector('.form__input');
const todoList = document.querySelector('.todo__list');

const checkAllBtn = document.querySelector('.check-all');
const deleteAllBtn = document.querySelector('.delete-all');
let isAllCheck = false;


const LOCAL_STORAGE_ITEMS_KEY = 'tasks.items';
const items = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEMS_KEY)) || [];



function addItem(e) {
    e.preventDefault();

    const text = formInput.value;
    if(text == null || text === '') return;

    const item = {
        text,
        completed: false
    };

    items.push(item);

    renderList(items, todoList);

    localStorage.setItem(LOCAL_STORAGE_ITEMS_KEY, JSON.stringify(items));

    this.reset();
}

function renderList(lists = [], listItems) {

    listItems.innerHTML = lists.map((item, i) => {
        return `
            <li class="todo__item">
                <input type="checkbox" data-index=${i} id="item${i}" class="todo__input" ${item.completed ? "checked" : ""}>
                <label for="item${i}">${item.text}</label>
                <ion-icon name="trash-outline" class="icon-delete" data-del=${i}></ion-icon>
            </li>
        `;
    }).join('');
}
function toggleCheck(e) {   
   if(!e.target.matches('input')) return;
   const element = e.target;
   const index = element.dataset.index;
   items[index].completed = !items[index].completed;
   localStorage.setItem(LOCAL_STORAGE_ITEMS_KEY, JSON.stringify(items));
   renderList(items, todoList);
}
function deleteItem(e) {
    if(e.target.matches('.icon-delete')) {
        const el = e.target;
        const delIndex = el.dataset.del;
        items.splice(delIndex, 1);
        localStorage.setItem(LOCAL_STORAGE_ITEMS_KEY, JSON.stringify(items));
        renderList(items, todoList);
    }
    return;
}

function checkAll() {
    
    items.forEach(item => {
            item.completed = !isAllCheck;
            localStorage.setItem(LOCAL_STORAGE_ITEMS_KEY, JSON.stringify(items));
            renderList(items, todoList); 
    });
    isAllCheck = !isAllCheck;
    

}

function deleteAll() {
    items.splice(0, items.length);
    localStorage.setItem(LOCAL_STORAGE_ITEMS_KEY, JSON.stringify(items));
    renderList(items, todoList);
}

checkAllBtn.addEventListener('click', checkAll);
deleteAllBtn.addEventListener('click', deleteAll);

todoList.addEventListener('click', toggleCheck);
todoList.addEventListener('click', deleteItem);
formContainer.addEventListener('submit', addItem);
renderList(items, todoList);