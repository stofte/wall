var http = require('http');
var fs = require('fs');
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 8080});
var count = 0;

if (!fs.existsSync('walldata')) {
	fs.mkdirSync('walldata');
}

function persistFile(data) {
	var date = new Date();
	var needzs = 5 - (''+count).length;
	var zeros = '';
	while (needzs-- > 0) zeros += '0';
	var filename = 'walldata/' + Date.now() + '-' + zeros + count + '.txt';
	count = (count + 1) % 100000;
	fs.writeFile(filename, data);
}

function sendData(websocket, files) {
	if (!files || files.length === 0) return;
	console.log('sending', files[0]);
	fs.readFile('walldata/' + files.pop(), function(err, data) {
		if (err) throw err;
		websocket.send(data);
		sendData(websocket, files)
	});
}

wss.on('connection', function(websocket) {
	console.log('websocket request on:', websocket.upgradeReq.url);
	if (websocket.upgradeReq.url === '/save') {
		websocket.on('message', function(message) {
			persistFile(message);
		});
	}

	if (websocket.upgradeReq.url === '/load') {
		fs.readdir('walldata', function(err, files) {
			sendData(websocket, files);
		});
		
	}
});