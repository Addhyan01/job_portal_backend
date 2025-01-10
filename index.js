const mongoose = require("mongoose");


const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const bodyParser = require("body-parser");
const { incommingRequestLogger } = require("./middleware/index.js");

dotenv.config();

const app = express();
const indexRouter = require("./routes/index.js");
const userRouter = require("./routes/user.js");
// app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded or form data
 
app.use(express.json());
app.use(incommingRequestLogger);
// api/v1/ping
app.use("/api/v1", indexRouter);
app.use("/api/v1/user", userRouter);

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded or form data
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json()); // for parsing application/json or json data 


app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
    mongoose.connect(process.env.MONGOOSE_URI_STRING, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useFindAndModify: false,

    });

    mongoose.connection.on("error", (err) => {
        console.log(err);       
        
    });

});


