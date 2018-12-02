var usonic = require('mmm-usonic');

class USonicController {

	constructor(pins) {
		this.usonics = []

		usonic.init(function (error) {

			for (let index in pins) {
				const pin = pins[index]

				let sonic = {
					io: usonic.createSensor(pin.echo, pin.trig, 1000),
					pin: pin
				}

				this.usonics.push(sonic)
			}
		});
	}

	observeChanges(callback) {

		this.usonics.forEach(function(sonic) {
			setInterval(function() {
				callback(sonic, sonic.io())
  			}, 100);
		})
	}
}

module.exports = USonicController