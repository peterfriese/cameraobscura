// -----------------------------------------------------------------------
// Imports
// -----------------------------------------------------------------------
var sys = require('sys'),
	express = require('express'),
	io = require('socket.io');


// -----------------------------------------------------------------------
// Create Express.js app server
// -----------------------------------------------------------------------
console.log("Camera Obscura server starting up...");
var app = express.createServer(
	express.errorHandler(),
	express.logger(),
	express.bodyDecoder(),
	express.cookieDecoder(),
	express.staticProvider({root: __dirname + '/client'}),
	express.session({secret: '?c4mer40bsc00r4!'})
	);

app.get('/', function(request, response) {
	response.redirect('/client.html');
});

// -----------------------------------------------------------------------
// Start the server
// -----------------------------------------------------------------------
var port = 4000;
app.listen(port);
console.log("Camera Obscura server listening on port " + port + ".");

var socket = io.listen(app);
socket.on('connection', function(client) {
	console.log('Client ' + client.sessionId + ' connected.')
	client.on('message', function(message) {
		console.log('Received message: ' + sys.inspect(message));
		client.broadcast(message);
	});
	client.on('disconnect', function() {
		console.log('Client ' + client.sessionId + ' disconnected.')
	});
});