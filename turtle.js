var mongoose = require('mongoose');

module.exports = {
	turtlescheme: mongoose.Schema({
        id: {type: Number, unique: true},

		x: Number,
        y: Number,
        z: Number,
        
        spawnid: Number,
        fuelLevel: Number,
        date: Number,
        lastUpdate: Number,

        command: String,
        idle: Boolean,

        rank: Number,
        squad: [Number],

        allowRemoteComms: Boolean       
	})
}
