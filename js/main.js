let lists = [
    {
        id: 0,
        name: 'Do',
        tasks: [
            {
                text: 'clean bathroom',
                done: false
            },
            {
                text: 'Wash dishes',
                done: false
            }
        ]
    },
    {
        id: 1,
        name: 'List 2',
        tasks: [
            {
                text: 'eat your greens',
                done: false
            },
            {
                text: 'exercise',
                done: false
            }
        ]
    }
];

let nextId = lists.length + 1;

function displayLists () {
    $('.container').html('');
    for(let i = 0; i < lists.length; i++) {
        $('.container').append(`
        <div class="list${lists[i].id}-container">
            <button class="btn btn-primary list-name" type="button" data-toggle="collapse" data-target="#List${lists[i].id}" aria-expanded="false" aria-controls="List${lists[i].id}">
                ${lists[i].name}
            </button>
            <div class="collapse" id="List${lists[i].id}">
                <div class="card card-body row">
                    <div><input class="myinput" type="text"><button type="button" class="btn btn-primary" onclick="addListItem(this)">Add</button></div>
                </div>
            </div>
        </div>
        `);
        for(let d = 0; d < lists[i].tasks.length; d++) {
            $(`#List${lists[i].id}`).append(`
                <div class="card card-body row">
                    <div><i onclick="deleteItem(this)" class="trashcan fas fa-trash-alt"></i><span>${lists[i].tasks[d].text}</span></div>
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
    let listIndex = $(e).parent().parent().parent().parent().parent().html().charAt(25);
    let myname = $(e).parent().children()[0].value;
    $(e).parent().parent().parent().append(`
        <div class="card card-body row">
            <div><i onclick="deleteItem(this)" class="trashcan fas fa-trash-alt"></i><span>${myname}</span></div>
        </div>
    `);
    $(e).parent().children()[0].value = '';
}

function deleteItem (e) {
    $(e).parent().parent().animate({
        opacity: 0,
        left: "+=50"
    }, 800, function(){
        $(e).parent().parent().remove();
    })
}