var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the online DB   just like magic :)
mongoose.connect('mongodb://todouser:1234@ds041586.mlab.com:41586/todo');
//create a schema just like a blueprint for my DB
var todoSchema = new mongoose.Schema({
	item: String
});
//creating a db model
var Todo = mongoose.model('Todo', todoSchema);


//just for test
//var data = [{item: 'finish my todo app'},{item: 'learning express'},{item: 'learning mongoDB'}];

var urlencodedParser = bodyParser.urlencoded({extended: false}); //to parse the data
																 //and use it in posting

module.exports = function(app){

app.get('/todo', function(req, res){
	Todo.find({}, function(err, data){
		if (err) throw err;
		res.render('todo', {todos: data});
	});

});


app.post('/todo', urlencodedParser, function(req, res){
  //getting data from the view and push it to the db
  var newTodo = Todo(req.body).save(function(err, data){
  	if (err) throw err;
  	res.json(data);
  });
});


app.delete('/todo/:item', function(req, res){
	//delete requested task from the db
	Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
		if (err) throw err;
		res.json(data);
	});
});

};