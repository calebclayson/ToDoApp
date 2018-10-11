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

let increment = 1;

function addItem() {
    let whatToDo = document.getElementById('newListItem').value;
    let content = `
        <li class="mdl-list__item">
            <span class="mdl-list__item-primary-content">
                <i class="material-icons  mdl-list__item-icon">assignment</i>
                ${whatToDo}
            </span>
            <span class="mdl-list__item-secondary-action">
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-upgraded" for="list-checkbox-${increment}" data-upgraded=",MaterialCheckbox,MaterialRipple">
                    <input type="checkbox" id="list-checkbox-${increment}" class="mdl-checkbox__input">
                <span class="mdl-checkbox__focus-helper"></span><span class="mdl-checkbox__box-outline"><span class="mdl-checkbox__tick-outline"></span></span><span class="mdl-checkbox__ripple-container mdl-js-ripple-effect mdl-ripple--center" data-upgraded=",MaterialRipple"><span class="mdl-ripple"></span></span></label>
            </span>
        </li >
        `;
    document.getElementById('list-container').innerHTML += content;
    increment++;
    document.getElementById('newListItem').value = "";
}