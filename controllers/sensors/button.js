var onoff = require('onoff')
var Gpio = onoff.Gpio

class ButtonController {

	constructor(pins) {
		this.buttons = []

		for (let index in pins) {
			const pin = pins[index]
			let button = {
				io: new Gpio(pin, 'in', 'both', { debounceTimeout: 10 }),
				pin: pin
			}

			this.buttons.push(button)
		}
	}

	observeChanges(callback) {


		this.buttons.forEach(function(button) {
			console.log('button: ', button)

			button.io.watch(function(error, value){ 

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