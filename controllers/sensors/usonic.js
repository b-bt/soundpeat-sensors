var mmmUSonic = require('mmm-usonic');

class USonicController {

	constructor(pins) {
		this.usonics = []

		mmmUSonic.init(function (error) {

			for (let index in pins) {
				const pin = pins[index]

				let usonic = {
					io: usonic.createSensor(pin.echo, pin.trig, 1000),
					pin: pin
				}

				this.usonics.push(usonic)
			}
		});
	}

	observeChanges(callback) {

		this.usonics.forEach(function(usonic) {
			setInterval(function() {
				callback(usonic, usonic.io())
  			}, 100);
		})
	}
}

module.exports = USonicController