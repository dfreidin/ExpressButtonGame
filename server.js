const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));
const server = app.listen(8000);
const io = require("socket.io")(server);
var counter = 0;

io.on("connection", function(socket){
    socket.emit("update_counter", {counter: counter});
    socket.on("button_pressed", function(data){
        counter++;
        io.sockets.emit("update_counter", {counter: counter});
    });
    socket.on("reset_count", function(data){
        counter = 0;
        io.sockets.emit("update_counter", {counter: counter});
    });
})