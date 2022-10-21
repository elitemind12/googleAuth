const GoogleStrategy = require("passport-google-oauth2").Strategy;
const user = require('./models/user');

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback : true
    },
    async (request, accessToken, refreshToken, profile, done) => {
    try {
    let existingUser = await user.findOne({ 'google.id': profile.id });
    // if user exists return the user 
    if (existingUser) {
    return done(null, existingUser);
    }
    // if user does not exist create a new user 
    console.log('Creating new user...');
    const newUser = new user({
    method: 'google',
    id: profile.id,
    email: profile.emails[0].value,
    firstName: profile.displayName,
    lastName: profile.displayName,
    });
    console.log(newUser);
    await newUser.save();
    return done(null, newUser);
    } catch (error) {
    return done(error, false)
    }
    }
    ));
   }