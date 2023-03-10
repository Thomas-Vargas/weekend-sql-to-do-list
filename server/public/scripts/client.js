$(document).ready(onReady);

function onReady() {
    console.log(`jq loaded`);
    getToDoList();
    $('#submit-to-do').on('click', addNewToDo);
    $('#view-to-dos').on('click', '.deleteBtn', deleteToDo);
}

function deleteToDo() {
    let idToDelete = $(this).parent().parent().data().id;
    console.log(idToDelete);

    $.ajax({
        type: "DELETE",
        url: `/to-do/deleteToDo/${idToDelete}`
      }).then((result) => {
        console.log('successfully deleted', idToDelete);
        getToDoList();
      }).catch((error) => {
        console.log('error deleting to-do', error);
      })
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

function addNewToDo() {
    $.ajax({
        type: 'POST',
        url: '/to-do',
        data: {
            task: $('#to-do-input').val(),
            isComplete: false
        }
       })
       .then((response) => {
        console.log('response from server', response);
        getToDoList();
       })
       .catch((error) => {
        console.log('error in post', error);
       })

       $('#to-do-input').val('');
}

function renderToDos(toDoList) {
    $('#view-to-dos').empty();

    for(let task of toDoList) {
        $('#view-to-dos').append(`
            <tr data-id='${task.id}'>
                <th>${task.task}</th>
                <th>${task.isComplete}</th>
                <th><button class='markCompleteBtn'>Mark Complete</button></th>
                <th><button class='deleteBtn'>Delete</button></th>
            </tr>
        `); 
    }
}