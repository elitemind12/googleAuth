const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const user = require('./models/user');
const dotenv = require('dotenv').config();
const passport = require('passport');
require('./passportConfig')(passport);
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const session = require('express-session');

mongoose.connect('mongodb://localhost:27017/googleAuth', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('database connected');
})

const sessionConfig = {
    store: MongoStore.create({
       mongoUrl: 'mongodb://localhost:27017/googleAuth',
       touchAfter: 24 * 60 * 60
     }),
   name: 'googleAuth',
   secret: 'confidential',
   resave: false,
   saveUninitialized: true,
   cookie: {
       httpOnly: true,
       expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
       maxAge: 1000 * 60 * 60 * 24 * 7
   }
}

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionConfig));

app.get('/auth/google', passport.authenticate('google', { scope: ["email", "profile"] })) 
app.get('/auth/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
    res.redirect('/logout');
});

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/logout', (req, res) => {
    res.locals.filter = 'active';
    res.render('logout');
})

app.post('/logout', (req, res, next) => {
    req.logout();
  });

app.listen(port, () => {
    console.log('on port 3000');
})

