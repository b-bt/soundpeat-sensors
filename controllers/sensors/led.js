var onoff = require('onoff');
var Gpio = onoff.Gpio

class LedController {

	constructor(pins) {
		this.leds = []

		for (let pin in pins) {
			let led = {
				io: new Gpio(pin, 'in', 'both', { debounceTimeout: 10 }),
				pin: pin
			}

			this.leds.push(led)
		}


	}

	setValue(pin, value) {
		let led = this.leds.filter(led => led.pin == pin)[0]

		console.log(led.pin)
		
		if (led == null)
			return

		led.io.write(value, function(error) {
			if (error)
				console.log(error)
		})
	}
}

module.exports = LedController