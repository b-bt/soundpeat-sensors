const WebSocket = require('ws');

const ws = new WebSocket('ws://10.0.81.72:3000');

ws.on('open', function open() {
 	console.log('abriu')
});