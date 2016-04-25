var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
	res.sendfile('editor.html');
});

io.on('connection', function(socket){
	console.log('a user connected');
	
	socket.on('newusr',function()
	{
		socket.broadcast.emit('nwusr');
	});

	socket.on('welcome',function(data)
	{
		io.emit('all',data);
	});

	socket.on('write',function(data)
	{
		io.emit('print',data);
		socket.broadcast.emit('printcode',data);
	});

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});