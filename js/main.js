let lists = [];

let nextId = lists.length;

function displayLists () {
    $('.container').html('');
    for(let i = 0; i < lists.length; i++) {
        $('.container').append(`
        <div class="list${lists[i].id}-container">
            <button class="btn btn-info list-name" type="button" data-toggle="collapse" data-target="#List${lists[i].id}" aria-expanded="false" aria-controls="List${lists[i].id}">
                <div class="list-content-container><span class="list-text">${lists[i].name}</span><i onclick="deleteList(this)" class="list-trash fas fa-trash-alt"></i></div>
            </button>
            <div class="collapse show" id="List${lists[i].id}">
                <div class="card card-body row input-container">
                    <div><input class="myinput" type="text"><button type="button" class="btn btn-info add-item" onclick="addListItem(this)">Add</button><button type="button" class="btn btn-info" onclick="clearChecked(this)">Clear</button></div>
                </div>
            </div>
        </div>
        `);
        for(let d = 0; d < lists[i].tasks.length; d++) {
            $(`#List${lists[i].id}`).append(`
                <div class="card card-body row">
                    <div><i onclick="deleteItem(this)" class="trashcan fas fa-trash-alt"></i><i onclick="editItem(this)" class="edit fas fa-pen"></i><input onclick="check(this)" class="item-checkbox" type="checkbox" ${lists[i].tasks[d].done ? 'checked': ''}/><span class="list-item-text">${lists[i].tasks[d].text}</span></div>
                </div>
            `);
        }
    }
}

$('.addNewList').click(createNewList);

function createNewList () {
    let newList = {
        id: nextId++,
        name: $('.addListInput').val(),
        tasks: []
    }
    lists.push(newList);
    $('.addListInput').val('');
    displayLists();
}

function addListItem (e) {
    let newTask = {
        text: $(e).parent().children()[0].value,
        done: false
    }
    let listIndex = $(e).parent().parent().parent().parent().index();
    lists[listIndex].tasks.push(newTask);
    $(e).parent().children()[0].value = '';
    displayLists();
}

function deleteItem (e) {
    let indexInTaskArray = $(e).parent().parent().index() - 1;
    let indexInListArray = $(e).parent().parent().parent().parent().index();

    lists[indexInListArray].tasks.splice(indexInTaskArray, 1);

    $(e).parent().parent().animate({
        opacity: 0,
        left: "+=50"
    }, 800, function(){
        $(e).parent().parent().remove();
    })
}

function deleteList (e) {
    let indexInListArray = $(e).parent().parent().parent().parent().index() - 1;
    lists.splice(indexInListArray, 1);

    $(e).parent().parent().parent().remove();
}

function check (e) {
    let indexInTaskArray = $(e).parent().parent().index() -1;
    let indexInListArray = $(e).parent().parent().parent().parent().index();

    if(lists[indexInListArray].tasks[indexInTaskArray].done == true){
        lists[indexInListArray].tasks[indexInTaskArray].done = false;
    } else {
        lists[indexInListArray].tasks[indexInTaskArray].done = true;
    }
}

function clearChecked (e) {
    let indexInListArray = $(e).parent().parent().parent().parent().index();
    for(let i = 0; i < lists[indexInListArray].tasks.length; i++) {
        if(lists[indexInListArray].tasks[i].done){
            lists[indexInListArray].tasks.splice(i, 1);
            i--;
        }
    }
    displayLists();
}

function editItem(e) {
    let taskSpan = $(e).parent().children()[3];
    taskSpan.innerHTML = "<input class='edit-item-input' type='text'/>";
    $(e).removeClass('fa-pen');
    $(e).addClass('fa-check');
    $(e).attr("onclick", "saveEdit(this)");
}

function saveEdit(e) {
    let indexInTaskArray = $(e).parent().parent().index() - 1;
    let indexInListArray = $(e).parent().parent().parent().parent().index();
    let inputHolder = $(e).parent().children()[3];
    let newTask = {
        text: inputHolder.childNodes[0].value,
        done: false
    }
    lists[indexInListArray].tasks[indexInTaskArray] = newTask;
    displayLists();
}

class Data {
    static saveList(listId, list){
        let listString = JSON.stringify(list);
        localStorage.setItem(listId, listString);
    }
    static getList(listId){
        let list = localStorage.getItem(listId);
        return JSON.parse(list);
    }
    static removeList(listId){
        localStorage.removeItem(listId);
    }
}

function loadLists() {
    if(Data.getList(0) != null) {
        lists = Data.getList(0);
    } else {
        lists = []
    }
    displayLists();
}

function unloadLists() {
    Data.saveList(0, lists);
}