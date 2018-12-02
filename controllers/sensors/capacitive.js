var onoff = require('onoff')
var Gpio = onoff.Gpio

class CapacitiveController {

	constructor(pins) {
		this.capacitives = []

		for (let index in pins) {
			const pin = pins[index]
			let capacitive = {
				io: new Gpio(pin, 'in', 'both', { debounceTimeout: 10 }),
				pin: pin
			}

			this.capacitives.push(capacitive)
		}
	}

	observeChanges(callback, that) {

		this.capacitives.forEach(function(capacitive) {

			capacitive.io.watch(function(error, value){ 

				if (error)
					console.log(error)
				else
					callback(capacitive.pin, value, that)
			})
		})
	}
}

module.exports = CapacitiveController