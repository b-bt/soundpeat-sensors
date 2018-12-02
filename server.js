const WebSocket = require('ws')
const uuidv1 = require('uuid/v1');

const Application = require('./application')

const port = process.env.PORT || 3000;

const wss = new WebSocket.Server({ port: port })
const app = new Application()

wss.on('connection', function connection(wsc) {

	wsc.uuid = uuidv1()

	app.handleNewConnection(wsc)

	wsc.on('close', function() {
		app.handleDisconnection(wsc)
	})

	wsc.on('message', function(message) {
  		app.hangleMensageIncoming(wsc, message)
	})

});

console.log('SoundPeat Raspberry Pi Server started on port ' + port + '...')