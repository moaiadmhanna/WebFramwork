const mongoose = require('mongoose'); 
const highscore = new mongoose.Schema({
    username : {
        type : String,
        trim : true,
        require : true
    },
    score : {
        type : Number,
        require : true
    }
})
module.exports = mongoose.model("highscore", highscore);