var express = require('express');

var fs = require('fs');
var index = fs.readFileSync('index.html');
var index2 = fs.readFileSync('index2.html');
var content = index.toString('utf8');
var content2 = index2.toString('utf8');
var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send(content);
});
app.get('/v2', function(request, response) {                                                                          
  response.send(content2);                                                                                           
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
