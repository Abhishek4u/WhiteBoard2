const express = require("express");
const app = express();

const nanoId = require("nanoid")
let roomId = nanoId.nanoid();

// server
const httpServer = require("http").createServer(app);
const socketServer = require("socket.io")(httpServer);

// client-size

app.use(express.static("main"));


socketServer.on("connection", function (socket) {
    // // socket.room = roomId;
    // console.log("New Client Connected");
    // console.log(socket.id);
    socket.room = roomId;

    // Time in chat
    socket.emit("showTime");

    socket.on('switchRoom', function ({newroom,person}) {
        // roomId = newroom;
        // console.log("Room Id changing   " + socket.room);

        socket.leave(socket.room);
        socket.join(newroom);
        socket.room = newroom;

        // console.log("Room Id changed   " + socket.room);
        socket.to(socket.room).emit("userJoined",person);
    });

    socket.on("sendLeaveMessage", function (person) {
        socket.to(socket.room).emit("userLeft", person);
    })

    // listener ==> recieve and distribute
    socket.on("colorChange", function (color) {
        socket.to(socket.room).emit('rColorChange', color);
    })

    socket.on("md", function (point) {
        socket.to(socket.room).emit("onmd", point);
    })

    socket.on("mm", function (point) {
        socket.to(socket.room).emit("onmm", point);
    })

    socket.on("distributeMsg", (data) => {
        
        socket.to(socket.room).emit("addMsg", data);
    })

    socket.on("distributeCode", (obj) => {

        socket.to(socket.room).emit("updateCode", obj);
    })

})
let port = process.env.PORT || 3000;

httpServer.listen(port, function () {
    // console.log("Server is listening to request at port", port);
})

