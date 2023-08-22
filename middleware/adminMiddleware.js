const express = require('express');
const router = express.Router();
const passport = require('passport');
// const auth = require('./authorization');
// auth.requiresLogin,
router.all('*', function (req, res, next) {
	try {
		console.log("hello middleware Enter !!")

		passport.authenticate('jwt', { session: true }, function (err, user, info) {
			// console.log('err, user, info',err, user, info)
			if (!info.statusCode) {
				console.log("hello middleware 1st!!")
				info.statusCode = 401
			}

			// If authentication failed, `user` will be set to false. If an exception occurred, `err` will be set.
			if (err || !user) {
				return res.status(info.statusCode).send({
					status: "failure",
					statusCode: info.statusCode,
					message: info.message
				})
				// HERE WE CAN PASS THE ERROR OBJECT TO THE NEXT ROUTE i.e THE APP'S COMMON ERROR HANDLING MIDDLEWARE
				// return next(info);
			}
			let adminRoles = ['ADMIN', 'SUPERADMIN', 'SUBADMIN'];
			if (adminRoles.indexOf(user.userType) === -1) {
				return res.status(401).send({
					status: "failure",
					statusCode: 401,
					message: "You are not authorized to access this route"
				})
			}
			else {
				return next();
			}
		})(req, res, next);
	} catch (error) {
		return error.message;
	}
});

module.exports = router;
