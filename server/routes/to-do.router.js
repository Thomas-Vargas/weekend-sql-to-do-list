const express = require('express');
const router = express.Router();
const pg = require('pg');
const pool = require('../modules/pool');
const moment = require('moment');

//PUT
router.put('/markAsComplete/:id', (req, res) => {
    // Store formated date
    let date = moment().format('LLL');
    //console.log(date);
    let idToUpdate = req.params.id;
    let queryText = `
        UPDATE "todolist" SET "isComplete" = true, "timeCompleted" = '${date}' WHERE id=$1;
    `;

    pool.query(queryText, [idToUpdate])
        .then((result) => {
            console.log('Successfully updated id:', idToUpdate);
            res.sendStatus(200);
        }) 
        .catch((error) => {
            console.log('Error updating to-do');
            res.sendStatus(500);
        });
})

// DELETE
router.delete('/deleteToDo/:id', (req, res) => {
    console.log('in /deleteToDo');
    let idToDelete = req.params.id;
    //console.log(idToDelete);
    let queryText = `
        DELETE FROM "todolist" WHERE "id" = $1;
    `;

    pool.query(queryText, [idToDelete])
        .then((result) => {
            console.log('successfully delete id:', idToDelete);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error deleting to-do:', error);
            res.sendStatus(500);
        });
})

// GET
router.get('/', (req, res) => {
    console.log('in GET request for /to-do')
    const queryText = 'SELECT * FROM "todolist" ORDER BY "isComplete", "id" DESC;';

    pool.query(queryText)
        .then((result) => {
            console.log(result.rows);
            res.send(result.rows)
        })
        .catch((err) => {
            res.sendStatus(500)
        })
})

// POST
router.post('/', (req, res) => {
    console.log('in POST request for /to-do');
    let newToDo = req.body;
    const queryText = `INSERT INTO "todolist" ("task", "isComplete") VALUES ($1, $2);`;

    pool.query(queryText, [newToDo.task, newToDo.isComplete])
        .then(result => {
            console.log('Success adding to-do', newToDo);
            res.sendStatus(201)
        })
        .catch(error => {
            console.log('error adding new to-do', error);
            res.sendStatus(500)
        })
})

module.exports = router;