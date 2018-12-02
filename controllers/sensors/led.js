var onoff = require('onoff');
var Gpio = onoff.Gpio

class LedController {

	constructor(pins) {
		this.leds = []

		for (let index in pins) {
			const pin = pins[index]
			let led = {
				io: new Gpio(pin, 'out'),
				pin: pin
			}

			this.leds.push(led)
		}
	}

	setValue(pin, value) {
		let led = this.leds.filter(led => led.pin == pin)[0]

		if (led == null)
			return

		led.io.write(value, function(error) {
			if (error)
				console.log(error)
		})
	}

	reset() {
		for (let index in this.leds) {
			let led = this.leds[index]
			led.io.write(0, function(error) {
				if (error)
					console.log(error)
			})
		}
	}
}

module.exports = LedController