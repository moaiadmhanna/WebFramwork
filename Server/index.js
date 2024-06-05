const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const randomToken = require('random-token');
const db = require('./db');
const app = express();

app.use(cors({
  origin:'http://localhost:4200',
  credentials : true
}));

app.use(parser.json());

// Signup Post
app.post('/users',(req, res) => {
    const newUser = req.body;
    const signUpFk = db.signup(newUser.email,newUser.password);
    if(signUpFk){
      res.status(200).send({message : 'Signup successful', token : db.generateToken(newUser.email).token})
    }
    else{
      res.status(380).send({ message: 'Signup failed'});
    }
});
// Login Post
app.post('/session', async(req,res) => {
  const signInData = req.body;
  const signInFk = db.login(signInData.email,signInData.password);
  signInFk != null ? res.status(200).send({message : 'Login successful', token : signInFk}) : res.status(404).send({ message: 'login failed'});
  console.log(signInFk);
})
// Highscore Post
app.post('/highscores', (req , res) => {
  const score = req.body;
  db.addHighscore(score.username,score.score);
  res.status(200).send({message : 'Highscore added successfuly'})
})
// Highscore Get
app.get('/highscores', (req,res) => {
  let scores = db.getHighscores();
  res.status(200).send({score : scores});
})
app.delete('/session', (req,res)=>{
  db.deleteToken(req.body);
  res.status(200).send({message : "Logout successful"});
})
const port = 3000;
app.listen(port, () => {
    console.log('listening on port 3000!');
});
