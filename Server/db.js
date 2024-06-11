const mongoose = require('mongoose');
const User = require('./schemas/user');

const dbUser = 'root';
const dbPassword = 'root';
const dbName = 'highscores';

(async function() {
  try {
    // Connect to MongoDB with authentication
    await mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
      useUnifiedTopology: true,
      authSource: 'admin', // Change to your auth database if different
      user: dbUser,
      pass: dbPassword
    });
    console.log("Connected to MongoDB!");

    const Users = await User.find({});
    console.log(Users);
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    mongoose.connection.close();
  }
})();


// /** in memory db */
// const passwordHash = require('password-hash');
// var randomToken = require('random-token');
// var db = {

//     users: [
//         { username: "test@test.at", password: passwordHash.generate("12345678") },
//         { username: "linus@kernel.org", password: passwordHash.generate("abcdefg") },
//         { username: "steve@apple.com", password: passwordHash.generate("123456") },
//         { username: "bill@microsoft.com", password: passwordHash.generate("987654") }
//     ],
    
//     tokens: [],
    
//     highscores: [ 
//         { username: "test@test.at", score: 1600 },
//         { username: "linus@kernel.org", score: 1900 },
//         { username: "bill@microsoft.com", score: 400 }
//     ],

//     signup: function(username, password) {
//         let user = this.users.find(u => u.username === username);
//         if (user !== undefined) {
//             return false;
//         }

//         this.users.push({ username: username, password: passwordHash.generate(password)});
//         return true;
//     },

//     login: function(username, password) {
//         let user = this.users.find(u => u.username === username);
//         if (user != undefined && passwordHash.verify(password, user.password)) {
//             let cred = this.tokens.find(cred => cred.username == username)
//             if(cred){
//                 return cred
//             }       
//             return this.generateToken(user.username);
//         } 

//         return null;    
//     },

//     generateToken(username){
//         let token = randomToken(64);
//         let cred = {
//             username : username,
//             token : token
//         }
//         this.tokens.push(cred);
//         return cred;
//     },

//     deleteToken(authToken)  {
//         this.tokens = this.tokens.filter(e => e.token != authToken);
//     },

//     isAuthenticated: function(authToken) {
//         return this.tokens.find(auth => auth.token == authToken) != undefined;
//     },

//     getAuthUser: function(authToken) {
//         return this.tokens.find(auth => auth.token == authToken);
//     },    

//     getHighscores: function() {
//         return this.highscores.sort(function(a,b) { return b.score - a.score });
//     },

//     addHighscore: function(username, score) {
//         this.highscores.push({ username: username, score: score });
//     }
// }


// module.exports = db;
