var dialog = document.querySelector('dialog');
var showModalButton = document.querySelector('.show-modal');
if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}
showModalButton.addEventListener('click', function () {
    dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', function () {
    dialog.close();
});

let itemIncrement = 1;
let listIncrement = 2;

function addList () {
    let listName;
    let tab = `
        <a href="#fixed-tab-${listIncrement}" class="mdl-layout__tab">Test</a>
    `;
    let section = `
        <section class="mdl-layout__tab-panel" id="fixed-tab-${listIncrement}">
            <div class="page-content">
                <h1>lol</h1>
                <ul class="demo-list-control mdl-list" id="list-container">
                </ul>
                <button class="show-modal mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                    <i class="material-icons">add</i>
                </button>
                <dialog class="mdl-dialog">
                    <div class="mdl-dialog__content">
                        <p>
                            Add List Item
                        </p>
                        <input type="text" id="newListItem">
                    </div>
                    <div class="mdl-dialog__actions mdl-dialog__actions--full-width">
                        <button onclick="addItem()" type="button" class="mdl-button close">Done</button>
                    </div>
                </dialog>
            </div>
        </section>
    `;
    document.getElementById('tab-container').innerHTML += tab;
    document.getElementById('main-content').innerHTML += section;
    listIncrement++;
}

function addItem() {
    let whatToDo = document.getElementById('newListItem').value;
    let content = `
        <li class="mdl-list__item">
            <span class="mdl-list__item-primary-content">
                <i class="material-icons  mdl-list__item-icon">assignment</i>
                ${whatToDo}
            </span>
            <span class="mdl-list__item-secondary-action">
                <label for="chkbox${itemIncrement}" class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
                    <input type="checkbox" id="chkbox${itemIncrement}" class="mdl-checkbox__input">
                </label> 
            </span>
        </li >
        `;
    document.getElementById('list-container').innerHTML += content;
    itemIncrement++;
    document.getElementById('newListItem').value = "";
}
