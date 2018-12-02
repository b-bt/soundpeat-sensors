var onoff = require('onoff')
var Gpio = onoff.Gpio

class CapacitiveController {

	constructor(pins) {
		this.capacitives = []

		for (let index in pins) {
			const pin = pins[index]
			const capacitive = {
				io: new Gpio(pin, 'in', 'both', { debounceTimeout: 10 }),
				pin: pin
			}

			this.capacitives.push(capacitive)
		}
	}

	observeChanges(callback) {

		this.capacitives.forEach(function(capacitive) {

			capacitive.io.watch(function(error, value){ 

				if (error)
					console.log(error)
				else
					callback(capacitive.pin, value)
			})
		})
	}
}

module.exports = CapacitiveController