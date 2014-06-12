var server = require("./server.js")
var turtles = require("./turtles.js")

server.setTurtleLookup(turtles.fetchTurtle)
server.start()
turtles.loadConnection(function(){
console.log("saving")
turtles.saveTurtle({ 

    id: 1,
    x: 0,
    y: 0,
    z: 100,
        
    spawnid: 31,
    fuelLevel: 4000,
    date: 123131,
    lastUpdate: 1231415,

    command: "hi",
    idle: true,

    rank: 1,
    squad: [102, 104, 107],

    allowRemoteComms: false   

})
})
