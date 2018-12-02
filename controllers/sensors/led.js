var JohnnyFive = require("johnny-five");

class LedController {

	constructor(pins) {
		this.leds = []

		for (var pin in pins) {
			console.log(pin)
			var led = new JohnnyFive.Led(pin)
			this.leds.push(led)
		}

		for (var led in this.leds) {
			led.blink()
		}
	}
}

module.exports = LedController