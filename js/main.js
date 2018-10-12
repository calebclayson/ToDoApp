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

let lists = {
    currentList: {
        name: 'Honey Do',
        tasks: [
            {
                text: 'clean bathroom',
                done: false
            }
        ]
    }
}

function displayCurrentList () {
    document.getElementById('current-list-name').innerText = lists.currentList.name;
}

displayCurrentList();