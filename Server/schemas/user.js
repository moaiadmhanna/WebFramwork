const mongoose = require('mongoose'); 
const user = new mongoose.Schema({
    username : {
        type : String,
        trim : true,
        require : true,
    },
    password : {
        type : String,
        require : true,
    }
})
module.exports = mongoose.model("user", user);