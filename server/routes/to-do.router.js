const express = require('express');
const router = express.Router();
const pg = require('pg');
const pool = require('../modules/pool');

// GET
router.get('/', (req, res) => {
    console.log('in GET request for /to-do')
    const queryText = 'SELECT * FROM "todolist";';

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