const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
    creationDate: {
        type: Date,
        default: Date.now
    }

});



// module.exports = mongoose.model("User", userSchema);



const User = mongoose.model("User", userSchema);
module.exports = { User };