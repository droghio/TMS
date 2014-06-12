var express = require("express")
var logfmt = require("logfmt");

var app = express();
var directory = require('serve-index');
app.use(logfmt.requestLogger());

//var io = require("socket.io")(8001);
var socket = null;
var paramcallback = null;
var turtlecallback = null;

//Serve static content, and starts links webui to backend. 

module.exports = {

    start: function (){
        var port = Number(process.env.PORT);
        app.use(express.static(__dirname + "/public/"));
        app.use(directory(__dirname + "/public/", { icons: true }));
        
        //app.get('/crawl?page=', function(req, res) { fetchNextLink(req.url, res); });
        //app.post("/push?name=", function(req, res){  });

        app.use("/status", function(req, res) {
            if (turtlecallback){
                console.log("id1 " + req.query.id)
                turtlecallback(  req.query.id, function (turtle){ console.log("Found " + turtle); res.send(module.exports.computerCraftSend(turtle.toObject())); }  )
            }

            else{
                res.send("Nope.")
                console.log("Turtle status callback not specified.")
            }
        })

        app.listen(port, function() { console.log("Static Server Listening on " + port); });

        //Forward parameter update request to index process.
        /*io.on('connection', function (newsocket) {
            socket = newsocket;
            io.emit("uiUpdate", { count: "N/A", log: "Connected to backend server, ready for action.", color: "green", status: "loading" })
            socket.on("paramUpdate", function (update){ paramcallback(update) })
        })*/
    },

    setTurtleLookup: function (callback){
        turtlecallback = callback
    },

    updateUI: function (update){
        if (!update["color"])
            update["color"] = "black"

        if(!update.log)
            update.log = ""

        io.emit("uiUpdate", update)
    },

    setParamCallback: function (callback){
        paramcallback = callback;
    },

    computerCraftSend: function (json){
        returnvalue = "{"
        Object.keys(json).forEach(function(value){

            returnvalue = returnvalue + "[";
            if (typeof(value) == "string")
                returnvalue += '"'
            returnvalue += value
            if (typeof(value) == "string")
                returnvalue += '"'
            returnvalue += "]="

            if (typeof(returnvalue) == "string")
                returnvalue += '"'
            returnvalue += json[value];
            if (typeof(returnvalue) == "string")
                returnvalue += '"'
            returnvalue += ","
        })
        returnvalue += "}"
        return returnvalue
    }

}
