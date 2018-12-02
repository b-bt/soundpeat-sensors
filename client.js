const WebSocket = require('ws');

const ws = new WebSocket('ws://10.0.81.72:3000');

const BUTTON_ACTIVATED_EVENT = "ButtonSensorWasActivatedEvent"
const BUTTON_DISABLED_EVENT = "ButtonSensorWasDisabledEvent"
const CAPACITIVE_ACTIVATED_EVENT = "CapacitiveSensorActivatedEvent"
const CAPACITIVE_DISABLED_EVENT = "CapacitiveSensorDisabledEvent"
const USONIC_CHANGE_EVENT = "USonicSensorChangeEvent"
const RESET_EVENT = "ResetEvent"

ws.on('open', function open() {
 	console.log('abriu')
});

ws.on('message', function incoming(data) {

	let message = JSON.parse(data)

	handleIncomingMessages(message)
})

function sendMessage(ws, message) {
	let data = JSON.stringify(message)
	ws.send(data)
}

function handleIncomingMessages(message) {
	if (message.event == BUTTON_ACTIVATED_EVENT)
		handleButtonWasActivated(message.id)
	else if (message.event == BUTTON_DISABLED_EVENT)
		handleButtonWasDisabled(message.id)
	else if (message.event == CAPACITIVE_ACTIVATED_EVENT)
		handleCapacitiveWasActivated()
	else if (message.event == CAPACITIVE_DISABLED_EVENT)
		handleCapacitiveWasDisabled()
	else if (message.event == USONIC_CHANGE_EVENT)
		handleUSonicDistanceChanged(message.distance)
}

function sendResetMessage() {
	let message = {
		event: RESET_EVENT
	}

	sendMessage(ws, message)
}

function handleButtonWasActivated(button) {
	console.log('ativou buttton ' + button)
}

function handleButtonWasDisabled(button) {
	console.log('desativou button ' + button)
}

function handleCapacitiveWasActivated() {
	console.log('ativou capacitive')
}

function handleCapacitiveWasDisabled() {
	console.log('desativou capacitive')
}

function handleUSonicDistanceChanged(distance) {
	console.log('recebeu nova distancia ' + distance)
}