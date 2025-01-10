
const fs = require("fs");


const incommingRequestLogger = (req, res, next) => {
    fs.writeFileSync("log.txt", new Date().toString() + " " + req.url + " " + req.method + "\n", { flag: "a" });
    next();
}


module.exports = { incommingRequestLogger };