const express = require('express');
const router = express.Router();
const passport = require('passport');
// const auth = require('./authorization');
// auth.requiresLogin,
router.all('*', async function (req, res, next) {
	passport.authenticate('jwt', { session: true }, function (err, user, info) {
		if (!info.statusCode) {
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
		} else {
			return next();
		}
	})(req, res, next);
});

module.exports = router;