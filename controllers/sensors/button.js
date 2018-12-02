var onoff = require('onoff');
var Gpio = onoff.Gpio

class ButtonController {

	constructor(pins) {
		this.buttons = []

		for (let pin in pins) {
			let button = {
				io: new Gpio(pin, 'in', 'both', {debounceTimeout: 10}),
				pin: pin
			}

			this.buttons.push(button)
		}
	}

	observeChanges() {

		for (let button in this.buttons) {
			button.io.watch(function (err, value) { 
				console.log('mudou valo ' + value)
			})
		}
	}
}

module.exports = ButtonController