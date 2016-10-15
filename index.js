var express = require('express');
var todoController = require('./controllers/todoController');
var port =8080;
var app = express();

//setup the EJS template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//run the controller
todoController(app);



//listen to port
app.listen(port);
console.log('listing to port '+ port);