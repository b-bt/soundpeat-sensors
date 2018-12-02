var JohnnyFive = require("johnny-five");
var Raspi = require("raspi-io");

// var ButtonController = require('./controllers/sensors/button')
// var CapacitiveController = require('./controllers/sensors/sensors/capacitive')
var LedController = require('./controllers/sensors/led')
// var USonicController = require('./controllers/sensors/usonic')

const LEDS_PINS = [2, 3, 4]

class Application {

	constructor() {
		var board = new JohnnyFive.Board({
  			io: new Raspi()
		});

		board.on("ready", () => {
			this.ledController = new LedController(LEDS_PINS)
		})
	}

	handleNewConnection(wsc) {

	}
}

module.exports = Application