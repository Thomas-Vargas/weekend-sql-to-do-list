$(document).ready(onReady);

function onReady() {
    console.log(`jq loaded`);
    getToDoList();
}

function getToDoList() {
    $.ajax({
        method: 'GET',
        url: '/to-do'
    }).then(function (response) {
        console.log(response);
        renderToDos(response);
    }).catch(function (error) {
        console.log('error in song get', error);
    });
}

function renderToDos(toDoList) {
    for(let task of toDoList) {
        $('#view-to-dos').append(`
        <tr>
            <th>${task.task}</th>
            <th>${task.isComplete}</th>
            <th><button>Mark Complete</button></th>
            <th><button>Delete</button></th>
        </tr>
        `); 
    }
}