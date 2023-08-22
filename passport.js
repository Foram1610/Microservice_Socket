
const mongoose = require('mongoose');
const User = require('./models/userSchema')

const passport = require('passport');
const userLocal = require('./passport/userLocal');
const adminLocal = require('./passport/adminLocal');
const providerLocal = require('./passport/providerLocal');
const jwt = require('./passport/jwt');


// JSON WEB TOKENS STRATEGY
passport.use(jwt);
passport.use(providerLocal);
passport.use('userLocal', userLocal);
passport.use('adminLocal', adminLocal);
passport.use('providerLocal', providerLocal);



passport.serializeUser((user, cb) => cb(null, user._id));
passport.deserializeUser((id, cb) => {
	User.findOne({ _id: id }, cb)
});

