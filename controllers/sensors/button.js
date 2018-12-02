var onoff = require('onoff')
var Gpio = onoff.Gpio

class ButtonController {

	constructor(pins) {
		this.buttons = []

		for (let pin in pins) {
			let button = {
				io: new Gpio(pin, 'in', 'both', { debounceTimeout: 10 }),
				pin: pin
			}

			this.buttons.push(button)
		}
	}

	observeChanges(callback) {

		console.log(this.buttons.length)

		this.buttons.forEach(button => {

			button.io.watch((error, value) => { 
				console.log(button.pin, value)
				if (error)
					console.log(error)
				else
					callback(button.pin, value)
			})
		})

	}
}

module.exports = ButtonController