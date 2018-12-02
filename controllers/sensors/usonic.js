var usonic = require('mmm-usonic');

class USonicController {

	constructor(pins) {
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
    		}
		}.bind(this));
	}

	observeChanges(callback) {
		console.log('oi1')

		this.sonics.forEach(function(sonic) {

		console.log('oi2')
			setInterval(function() {

				console.log('oi3')
				let distance = sonic.io()
				console.log(sonic, distance)
				callback(sonic, distance)
  			}, 100);
		})
	}
}

module.exports = USonicController