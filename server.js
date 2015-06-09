// Express setup
var express = require("express");
var app = module.exports.app = express();

var http = require("http");
var server = http.createServer(app);
var io = require('socket.io')(server);

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.set('view engine', 'ejs');  
app.use('/static', express.static('static'));
// HTML Routes

app.get('/', function(req,res) {
  res.render('youtube', { title:'The index page' })
});

// API Routes
var channels = new Array();

app.get("/api/", function(req,res) {
  res.send(channels);
});
app.get("/api/current", function(req,res) {
  res.send(channels[0]);
});

app.post("/api/add", function(req,res) {
  channels.push(req.body.data);
  res.send(req.body.data);
});
app.post("/api/set", function(req,res) {
  channels = req.body;
  res.send(req.body);
});

app.get("/api/rotate", function(req,res) {
  channels.push(channels.shift()); //Shift first item to the end.
  res.send(channels[0]); //Return the new first item
});
app.get("/api/advance", function(req,res) {
  channels.shift(); //Shift first item out of array
  res.send(channels[0]); //Return the new first item
});

// Start Server
io.listen(app.listen(3000, function() {
  console.log("listening on http://*:3000")
}));
