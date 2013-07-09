var express = require('express');

var index = fs.readFileSync('index.html');
var content = index.toString('utf8');
var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send(content);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
