var JohnnyFive = require("johnny-five");

class LedController {

	constructor(pins) {
		this.leds = []

		for (pin in pins) {
			console.log(pin)
			var led = new JohnnyFive.Led(pin)
			this.leds.push(led)
		}

		for (led in this.leds) {
			led.blink()
		}
	}
}

module.exports = LedController