var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


var app = express();
const cors= require('cors');
app.use(cors());


//ES6 PROMISES
mongoose.Promise = global.Promise;

//connect to db 
mongoose.connect('mongodb://localhost/innovaccer',{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

mongoose.connection.once('open',function(){
    console.log('connection to mongodb has been successfull');
    

}).on('error', function(error){
    console.log('Connection error: ',error);
});

app.use(bodyParser.json());

app.use('/enterdetails',require('./routes/enterdetails'));


// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.render('notFound');
});

//listen to port
app.listen(5000);
console.log('You are listening to port 5000');