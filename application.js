
// var ButtonController = require('./controllers/sensors/button')
// var CapacitiveController = require('./controllers/sensors//capacitive')
// var USonicController = require('./controllers/sensors/usonic')

var LedController = require('./controllers/sensors/led')

const LEDS_PINS = [2, 3, 4]

class Application {

	constructor() {
		this.ledController = new LedController(LEDS_PINS)

		this.ledController.setValue(LEDS_PINS[0], 1)
	}

	handleNewConnection(wsc) {

	}
}

module.exports = Application