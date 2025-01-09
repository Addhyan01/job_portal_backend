const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const app = express();

app.use((req, res, next) => {
    fs.writeFileSync("log.txt", new Date().toString() + " " + req.url + " " + req.method + "\n", { flag: "a" });
    // console.log(req.url, req.method);
    next();
})

app.get("/", (req, res) => {    
    res.send("Hello World");
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});


