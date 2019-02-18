var express = require('express');
var Promise = require('promise');
var app = express();
const config = require('./config');

// const db = require('./Models/mainModel');

// // force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync with { force: true }');
// });


var brout = require('./bookRouter/bookRouter');
var rout = require('./auhtorRouter/auhtorRouter');

app.use('/', rout);
app.use('/', brout);

var serverrunning= new Promise(function(resolve,reject){

 if(resolve){
   resolve("I'm runing On");
 }else {
   reject("not running");
 }
});

app.listen(config.app.port,serverrunning.then(function(itsresolve){
  console.log(itsresolve);
  console.log(process.env.NODE_ENV , config.app.port);

}));
