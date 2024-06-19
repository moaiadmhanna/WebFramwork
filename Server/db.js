const mongoose = require('mongoose');
const User = require('./schemas/user');
const Highscore = require('./schemas/highscore');

const dbUser = 'root';
const dbPassword = 'root';
const dbName = 'highscores';

try{ 
    mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
      useUnifiedTopology: true,
      authSource: 'admin',
      user: dbUser,
      pass: dbPassword
    });
    console.log("Connected to MongoDB!");
  } 
  catch (err) {
    console.error('Connection error:', err);
  }


/** in memory db */
const passwordHash = require('password-hash');
var randomToken = require('random-token');
var db = {
  
    tokens: [],

    signup: async function(username, password) {
      try{
        let user = await User.findOne({username : username})
        if(user !== undefined){
          return false
        }
        let newUser = new User({
          username,
          password : passwordHash.generate(password)
        });
        try {
          await newUser.save();
          } catch (err) {
          return false
          }
        return true;
      }
      catch{
        return false
      }
    },

    login: async function(username, password) {
      try {
        let user = await User.findOne({username: username});
        if (user != undefined && passwordHash.verify(password, user.password)) {
          let cred = this.tokens.find(cred => cred.username == username)
          if(cred){
              return cred
          }       
          return this.generateToken(user.username);
        }
        return null
        } 
        catch (err) {
          return null
        } 
    },

    generateToken(username){
        let token = randomToken(64);
        let cred = {
            username : username,
            token : token
        }
        this.tokens.push(cred);
        return cred;
    },

    deleteToken(authToken)  {
        this.tokens = this.tokens.filter(e => e.token != authToken);
    },

    isAuthenticated: function(authToken) {
        return this.tokens.find(auth => auth.token == authToken) != undefined;
    },

    getAuthUser: function(authToken) {
        return this.tokens.find(auth => auth.token == authToken);
    },    

    getHighscores: async function() {
        let highscores = await Highscore.find();
        return highscores.sort(function(a,b) { return b.score - a.score });
    },

    addHighscore: async function(username, score) {
        let newScore = new Highscore({
          username,
          score,
        })
        try {
          await newScore.save();
          return true;
          } 
        catch (err) {
          return false;
          }
    }
}


module.exports = db;
