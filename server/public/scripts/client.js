$(document).ready(onReady);

function onReady() {
    console.log(`jq loaded`);
    getToDoList();
    $('#submit-to-do').on('click', addNewToDo);
    $('#view-to-dos').on('click', '.markCompleteBtn', markAsComplete);

    // Show modal when deleteBtn is clicked and update the modal deleteBtn with idToDelete
    $('#view-to-dos').on('click', '.deleteBtn', function() {
        $('.modal').modal('toggle');
        const idToDelete = $(this).parent().parent().data().id;
        $('#modal-btn-delete').data('idToDelete', idToDelete);
    });
    
    // Listener for modal deleteBtn, closes modal when finished
    $(document).on('click', '#modal-btn-delete', function() {
        const idToDelete = $(this).data('idToDelete');
        deleteToDo(idToDelete);
        $('.modal').modal('hide');
    });
      
    // Allows user to use enter key in input
    $('input').on('keypress', function(e) {
        let key = e.which;
        if (key === 13) {
            addNewToDo();
        }
    })
}

function markAsComplete() {
    let idToUpdate = $(this).parent().parent().data().id;
    console.log(idToUpdate);

    $.ajax({
        type: 'PUT',
        url: `/to-do/markAsComplete/${idToUpdate}`
    }).then((response) => {
        console.log('Successfully updated:', idToUpdate);
        getToDoList();
    }).catch((error) => {
        console.log('error updating to-do', error);
    });
}

function deleteToDo(idToDelete) {
    $.ajax({
        type: "DELETE",
        url: `/to-do/deleteToDo/${idToDelete}`
    }).then((result) => {
        console.log('successfully deleted', idToDelete);
        getToDoList();
    }).catch((error) => {
        console.log('error deleting to-do', error);
    });
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
    let newTask = $('#to-do-input').val()

    if (newTask) {
        $.ajax({
            type: 'POST',
            url: '/to-do',
            data: {
                task: $('#to-do-input').val(),
                isComplete: false
            }
        }).then((response) => {
            console.log('response from server', response);
            getToDoList();
        }).catch((error) => {
            console.log('error in post', error);
        })
    
        $('#to-do-input').val('');
    }
    else {
        alert('Please fill out input!')
    }
}

function renderToDos(toDoList) {
    $('#view-to-dos').empty();

    let color = '';
    let status = 'Incomplete';

    for(let task of toDoList) {
        // Include time task was completed if isComplete = true
        if (task.isComplete) {
            // Update color and status variables 
            color = 'green';
            status = 'Complete'


            $('#view-to-dos').append(`
                <tr data-id='${task.id}' class="${color}">
                    <th>${task.task}</th>
                    <th>${status}</th>
                    <th>Task completed on ${task.timeCompleted}</th>
                    <th><button class='deleteBtn btn btn-danger'>Delete</button></th>
                </tr>
            `); 
        }
        else {
            // Else include button to mark task as complete
            $('#view-to-dos').append(`
                <tr data-id='${task.id}' class="${color}">
                    <th>${task.task}</th>
                    <th>${status}</th>
                    <th><button class='markCompleteBtn btn btn-success'>Complete</button></th>
                    <th><button class='btn btn-danger deleteBtn'>Delete</button></th>
                </tr>
            `); 
        }
    }
}