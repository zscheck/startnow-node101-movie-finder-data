const express = require('express');
var morgan= require('morgan');
const app=express();
var axios= require('axios');
var URL = 'http://www.omdbapi.com/?apikey=8730e0e&';
var movie ;
app.use(morgan('dev'));

app.get('/', function(req,res){
    var param = req.query; //obj is now an object w/ 1 property EX {i: tt3896198};
    //req means that requesting information pulled in express (test)
    // .query turns the data into an object with a single property
    var paramMov = Object.keys(param)[0]; //Object.keys turns object into array, then pulls[0] element
    var paramLink = param[paramMov]; //param.query.i 
       // res.end(paramLink);  FAILED ATTEMPT
    res.send(movie);
    axios.get(URL+ paramMov + '=' + encodeURI(paramLink)).then(function(response){
       // var cine = response.data;
         //movie = JSON.parse(JSON.stringify(response.data));
         movie = Object.assign({},response.data);
         res.send(response.data);
         res.end();
    });
        
});


// function cache(data){
// return JSON.parse(data);

// }

//module.exports = app;  commented out so it will not work


//FAILED ATTEMPT
//maybe go back later in a couple months to see if I can make it work