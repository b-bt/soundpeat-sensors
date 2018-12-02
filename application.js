
// 

// var USonicController = require('./controllers/sensors/usonic')

var LedController = require('./controllers/sensors/led')
var ButtonController = require('./controllers/sensors/button')
var CapacitiveController = require('./controllers/sensors//capacitive')

const LEDS_PINS = [2, 3, 4]
const BUTTONS_PINS = [17, 27, 22]
const CAPACITIVE_PINS = [16]
const USONIC_PINS = [{ echo: 21, trig: 20 }]

class Application {

	constructor() {
		this.ledController = new LedController(LEDS_PINS)
		this.buttonController = new ButtonController(BUTTONS_PINS)
		this.capativiceController = new CapacitiveController(CAPACITIVE_PINS)

		this.buttonController.observeChanges(this.didReciveNewButtonState)
		this.capativiceController.observeChanges(this.didReceiveNewCapacitiveState)

		// this.ledController.setValue(LEDS_PINS[0], 1)
	}

	handleNewConnection(wsc) {

	}

	didReciveNewButtonState(pin, value) {
		console.log(pin, value)
	}

	didReceiveNewCapacitiveState(pin, value) {
		console.log(pin, value)
	}
}

module.exports = Application