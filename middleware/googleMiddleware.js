const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = require('./authorization');
// auth.requiresLogin,
router.all('*',function (req, res, next) {
	// console.log('req.headers.token',req.headers)
	passport.authenticate('google', { session: true }, function(err, user, info) {
		console.log('err, user, info',err, user, info)
		// If authentication failed, `user` will be set to false. If an exception occurred, `err` will be set.
		if (err || !user) {
			return res.status(401).send({
				status:"failure",
				statusCode:401,
				message:"Hello From Google"
			})
			// HERE WE CAN PASS THE ERROR OBJECT TO THE NEXT ROUTE i.e THE APP'S COMMON ERROR HANDLING MIDDLEWARE
			// return next(info);
		} else {
			return next();
		}
	})(req, res, next);
});

module.exports = router;