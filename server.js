const WebSocket = require('ws')
const Application = require('./application')

const port = process.env.PORT || 3000;

const wss = new WebSocket.Server({ port: port })
const app = new Application()

wss.on('connection', function connection(wsc) {

	app.handleNewConnection(wsc)
});

console.log('SoundPeat Raspberry Pi Server started on port ' + port + '...')