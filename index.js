// require all dependencies
require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");

//add all middlewares

require("./config/db"); //(calls my mongoose connection to cleanup this file)

app.use(express.json()); //(allows me to receive JSON files from HEADER of REQUEST)
app.use(cors({ credentials: false }));

const http = require("http").createServer(app);
const io = require("socket.io")(http);
//setup routes

app.use("/api/cats", require("./routes/cat.route"));
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/chat", require("./routes/chat.route"));

//404 errors
app.get("*", (req, res) => {
    res.status(404).json({ message: "i am lost", code: "error 404" });
});

//socket
io.set("transport", ["websocket"]);
io.origins("*:*");
let users = [];
io.on("connection", (socket) => {
    console.log("connection");

    socket.on("set user", (data, next) => {
        if (user.indexOf(data) !== -1) {
            next(false);
        } else {
            next(true);
            socket.username = data;
            users.push(data);

            io.emit("users", users);
        }
    });

    socket.on("send message", (msg) => {
        console.log("send message");
        io.emit("chat message", { user: socket.username, message: msg });
    });

    socket.on("is typing", (msg) => {
        socket.broadcast.emit("typing", msg);
    });
});

// setup the server port

app.listen(process.env.PORT, () =>
    console.log(`running on ${process.env.PORT}`)
);