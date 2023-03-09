const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// ROUTES
const toDoRouter = require('./routes/to-do.router');

app.use('/to-do', toDoRouter);

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
