const mongoose = require('mongoose');
const { __ } = require('i18n');
const User = require('../models/userSchema');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

module.exports = new JwtStrategy({
	jwtFromRequest: ExtractJwt.fromHeader('token'),
	// jwtFromRequest:cookieExtractor,
	secretOrKey:process.env.SECRET_CODE,
	passReqToCallback: true
}, async (req,payload, done) => {
	try {
		// Find the user specified in token
		const user = await User.findById(payload.sub).select('_id name status email hashPassword isBlocked isDeleted mobileNumber languageId deviceType userType profileImage accountStatus');
		// console.log('user',user)

		// If user doesn't exists, handle it
		if (!user) {
			return done(null, false,{message:__("USER_NOT_FOUND"),statusCode:401});
		}

		//in user case account status will be approved by default
		if (user.accountStatus == 'pending' && (user.userType == 'COMPANY' || user.userType == 'INDIVIDUAL')) {
			return done(null, false,{message:__("YOUR_ACCOUNT_IS_PENDING"),statusCode:403});
		}

		if (user.status != 'active') {
			return done(null, false,{message:__("YOUR_ACCOUNT_IS_INACTIVE"),statusCode:403});
		}

		if (user.isBlocked) {
			return done(null, false,{message:__("USER_HAS_BEEN_BLOCKED"),statusCode:401});
		}

		if (user.isDeleted) {
			return done(null, false,{message:__("USER_HAS_BEEN_DELETED"),statusCode:401});
		}

		req.user = user; //adding user data in request
		done(null, user,{message:"",statusCode:200});
	} catch(error) {
		done(error, false,{message:__("SOMETHING_WENT_WRONG"),statusCode:400});
	}
})
