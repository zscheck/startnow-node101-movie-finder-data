const express = require('express');
var morgan= require('morgan');
const app=express();
var axios= require('axios');
var URL = 'http://www.omdbapi.com/?apikey=8730e0e&';
var movie ={} ;
app.use(morgan('dev'));

app.get('/', function(req,res){
    var param = req.query; //obj is now an object w/ 1 property EX {i: tt3896198};
    //req means that requesting information pulled in express (test)
    // .query turns the data into an object with a single property
    var paramMov = Object.keys(param)[0]; //Object.keys turns object into array, then pulls[0] element
    var paramLink = param[paramMov]; //param.query.i 
       // res.end(paramLink);  FAILED ATTEMPT combine w/ '/*'
    //res.send(movie);
     if(movie.hasOwnProperty(paramLink)){
            res.send(movie[paramLink]);
    } 
        else{
            axios.get(URL+ paramMov + '=' + encodeURI(paramLink)).then(function(response){
       // var cine = response.data;
         //movie = JSON.parse(JSON.stringify(response.data));
            movie[paramLink] = response.data;
            res.send(movie[paramLink]);
         //res.end();
        });
    }       
});
//  app.get('/', function(res, req){
//         res.json(movie);
//  });
 // NOT NEEDED because it is repetitive. if/else statement took care of it
module.exports = app;