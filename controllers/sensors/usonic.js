var usonic = require('mmm-usonic');

class USonicController {

	constructor(pins, didInitWithSuccess) {
		this.sonics = []

		usonic.init(function (error) {
    		if (error) {
        		console.log(error)
    		} else {
        		
        		for (let index in pins) {
        			const pin = pins[index]

        			let sonic = {
        				io: usonic.createSensor(pin.echo, pin.trig, 1000),
        				pin: pin
        			}

        			this.sonics.push(sonic);
        		}

        		didInitWithSuccess()
    		}
		}.bind(this));
	}

	observeChanges(callback) {
		this.sonics.forEach(function(sonic) {
			setInterval(function() {
				let distance = sonic.io()
				callback(sonic.pin, distance)
  			}, 100);
		})
	}
}

module.exports = USonicController