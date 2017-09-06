var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var users = [];
var connections = [];
var port = process.env.PORT || 3000;


server.listen(port);
console.log('connected to server at port ' + port);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/controllers', express.static(__dirname + '/controllers'));

io.sockets.on('connection', function(socket) {
    connections.push(socket);
    console.log('new user connected');

    //disconnect
    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log('user disconnected');
    });

    socket.on('send message', function(data) {
        console.log(data);
        io.sockets.emit('new message', data);
    });
});