const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// ROUTES
const toDoRouter = require('./routes/to-do.router');

app.use('/to-do', toDoRouter);

const PORT = process.env.PORT || 5000;
// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
