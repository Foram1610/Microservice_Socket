const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userSchema');
const { __ } = require('i18n');

module.exports = new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password' // NOSONAR
	},async function(email, password, done) {
		try{
			let userDetails = await User.findOne({ email: email,userType:{$in:['ADMIN','SUPERADMIN','SUBADMIN']}}).select('_id name profileImage status email hashPassword isBlocked isDeleted mobileNumber countryCode deviceType userType accountStatus,uniqueId idNumber')
			// console.log('userDetails passport',userDetails)
			if (!userDetails) {
				return done(null, false, { message:__("USER_NOT_FOUND"),statusCode:401});
			}

            console.log('User.authenticate(password,userDetails.hashPassword)',User.authenticate(password,userDetails.hashPassword))
			if(!User.authenticate(password,userDetails.hashPassword)){
				return done(null, false,{message:__("INVALID_LOGIN_CREDENTIALS"),statusCode:400});
			}

			// console.log(userDetails.userType)
			if (userDetails.accountStatus == 'pending' && (userDetails.userType == 'COMPANY' || userDetails.userType == 'INDIVIDUAL')) {
				return done(null, false,{message:__("YOUR_ACCOUNT_IS_PENDING"),statusCode:403});
			}

			if (userDetails.status != 'active') {
				return done(null, false,{message:__("YOUR_ACCOUNT_IS_INACTIVE"),statusCode:403 });
			}

			if (userDetails.isBlocked) {
				return done(null, false,{message:__("USER_HAS_BEEN_BLOCKED"),statusCode:401});
			}

			if (userDetails.isDeleted) {
				return done(null, false,{message:__("USER_HAS_BEEN_DELETED"),statusCode:401});
			}

			//Send this message when password changed or not matched
			if (!User.authenticate(password,userDetails.hashPassword)) {
				return done(null, false, { message:__("INVALID_PASSWORD"),statusCode:400 });
			}

			return done(null, userDetails,{message:__("LOGIN_SUCCESS"),statusCode:200});
		}catch(error){
			console.log('error',error)
			return done(error, null);
		}
	}
);