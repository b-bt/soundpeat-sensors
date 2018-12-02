var LedController = require('./controllers/sensors/led')
var ButtonController = require('./controllers/sensors/button')
var CapacitiveController = require('./controllers/sensors//capacitive')
var USonicController = require('./controllers/sensors/usonic')

const LEDS_PINS = [2, 3, 4]
const BUTTONS_PINS = [17, 27, 22]
const CAPACITIVE_PINS = [16]
const USONIC_PINS = [{ echo: 21, trig: 20 }]

const BUTTON_ACTIVATED_EVENT = "ButtonSensorWasActivatedEvent"
const BUTTON_DISABLED_EVENT = "ButtonSensorWasDisabledEvent"
const CAPACITIVE_ACTIVATED_EVENT = "CapacitiveSensorActivatedEvent"
const CAPACITIVE_DISABLED_EVENT = "CapacitiveSensorDisabledEvent"
const USONIC_CHANGE_EVENT = "USonicSensorChangeEvent"

class Application {

	constructor() {
		this.clientSockets = []
		this.activeLedsPins = []

		this.ledController = new LedController(LEDS_PINS)
		this.buttonController = new ButtonController(BUTTONS_PINS)
		this.capativiceController = new CapacitiveController(CAPACITIVE_PINS)

		this.buttonController.observeChanges(this.didReciveNewButtonState.bind(this))
		this.capativiceController.observeChanges(this.didReceiveNewCapacitiveState.bind(this))

		this.uSonicController = new USonicController(USONIC_PINS, function() {
			this.uSonicController.observeChanges(this.didReciveUSonicNewDistance.bind(this))
		}.bind(this))
	}

	handleNewConnection(wsc) {
		this.clientSockets.push(wsc)

		console.log('New WebSocket client connected')
	}

	handleDisconnection(wsc) {
		this.clientSockets = this.clientSockets.filter(client => client.uuid != wsc.uuid)

		console.log('One WebSocket client was disconnected')
	}

	broadcastButtonActivedEvent(id) {
		const data = {
			event: BUTTON_ACTIVATED_EVENT,
			id: id
		}

		this.broadcastData(data)
	}

	broadcastButtonDisabledEvent(id) {
		const data = {
			event: BUTTON_DISABLED_EVENT,
			id: id
		}

		this.broadcastData(data)
	}

	broadcastData(data) {
		const message = JSON.stringify(data)
		this.clientSockets.forEach(function(cs) {
			cs.send(message)
		})
	}

	didReciveNewButtonState(pin, value) {
		const buttonIndex = BUTTONS_PINS.indexOf(pin)
		const ledPinForButton = LEDS_PINS[buttonIndex]

		let index = this.activeLedsPins.indexOf(ledPinForButton)
		
		if (index == -1) {
			this.ledController.setValue(ledPinForButton, 1)
			this.broadcastButtonActivedEvent(buttonIndex + 1)
			this.activeLedsPins.push(ledPinForButton)
		} else {
			this.ledController.setValue(ledPinForButton, 0)
			this.broadcastButtonDisabledEvent(buttonIndex + 1)
			this.activeLedsPins.splice(index, 1)
		}
	}

	didReceiveNewCapacitiveState(pin, value) {
		// console.log(pin, value)
	}

	didReciveUSonicNewDistance(pin, value) {
		// console.log(pin, value)
	}
}

module.exports = Application