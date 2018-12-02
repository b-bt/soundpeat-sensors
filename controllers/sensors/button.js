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

	observeChanges(pin, callback) {
		let button = this.buttons.filter(button => button.pin == pin)[0]

		if (button == null)
			return

		button.io.watch(function (error, value) {
  			if (err) {
    			console.log(error)
  			} else {
  				callback(pin, value)
  			}
		});
	}
}

module.exports = ButtonController