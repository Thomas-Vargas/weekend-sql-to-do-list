const express = require('express');
const router = express.Router();
const pg = require('pg');
const pool = require('../modules/pool');

// GET

router.get('/', (req, res) => {
    console.log('in GET request for /')
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

module.exports = router;