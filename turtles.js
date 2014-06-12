/*
	John Drogo
	June 6, 2014

    TMS Mongo interface
	
    Saves turtle information.

	(Make sure you put in your MongoDB credentials. Three values to update.)
*/

var mongoose = require('mongoose');
var models = require("./models/turtle.js");

var mongouser = process.env.MONGO_USER
var mongopassword = process.env.MONGO_PASSWORD
var mongourl = process.env.MONGO_URL

module.exports = {

    loadConnection: function(callBack){
        console.log("loading")
        mongoose.connect("mongodb://localhost/test");
        mongoose.connection.on("error", console.error.bind(console, "ERROR: Quiting due to MongoDB connection error: "));
        mongoose.connection.once("open", callBack)
    },


    closeConnection: function(callBack){
        if (callBack)
            mongoose.connection.on("close", callBack)
        mongoose.connection.close()
    },


    countDocuments: function(callBack){
        var db = mongoose.connection;
        var Turtles = mongoose.model('Turtles', models.turtlescheme);
        Turtles.count().exec(function (err, count){
            if (err)
                return console.log("ERROR: MongoDB counting error.")
            return callBack(count)
        });
    },


    saveTurtle: function(params, callBack){
        //Records turtle in db if it doesn't exist already.
    	var db = mongoose.connection;
     	var Turtles = mongoose.model('Turtles', models.turtlescheme);
        turtle = new Turtles()
        console.log("save")           
        Object.keys(params).forEach(function(value){if (value.indexOf("__") == -1) {turtle[value] = params[value];}})
        turtle.save(function (err, turtle) {
            if (err)
                return console.log("Mongoose Error " + err);
            if (callBack)
                return callBack(turtle);
        });
    },


    fetchTurtle: function (id, callBack){
        //Grab the turtle with the specified id.
        console.log("id " + id)
    	var db = mongoose.connection;
        var Turtles = mongoose.model('Turtles', models.turtlescheme);
        Turtles.findOne({ id: id }, function(err, turtle){
            if (err) return console.log("Mongoose Error " + err);
            return callBack(turtle)
    	});
    },

    
    purgeDatabase: function(callback){
        console.log("Purging database.")
        var Turtles = mongoose.model('Turtles', models.turtlescheme);
        Turtles.remove(function (error, num){
            if (error)
                return console.log("Mongoose Error " + err);

            else{
                console.log("Purge successful.")
                callback()
            }
        });
    },


    updateTurtleStatus: function(id, params){
        var Turtles = mongoose.model('Turtles', models.turtlescheme);
        Turtles.findOne({ id: id }, function (err, turtle){
            if (err)
                return console.log("Mongoose Error " + err);

            if (turtle){                
                Object.keys(params).forEach(function(value){if (value.indexOf("__") == -1) {turtle[value] = params[value];}})
                turtle.save()
                if (callBack)
                   return callBack()
            }

            else
                console.log("Turtle not found in database: " + id)
        })
    }

}
