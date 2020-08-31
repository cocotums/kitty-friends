// require all dependencies
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
//add all middlewares

require("./config/db"); //(calls my mongoose connection to cleanup this file)

app.use(express.json()); //(allows me to receive JSON files from HEADER of REQUEST)
app.use(cors());
//setup routes

app.use("/api/cats", require("./routes/cat.route"));
app.use("/api/auth", require("./routes/auth.route"));
//404 errors
app.get("*", (req, res) => {
    res.status(404).json({ message: "i am lost", code: "error 404" });
});

// setup the server port

app.listen(process.env.PORT, () =>
    console.log(`running on ${process.env.PORT}`)
);