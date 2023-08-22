const admin = require('firebase-admin');

module.exports = function (app) {
    let firebaseLogin = require('../alista-app-firebase-key');
    admin.initializeApp({
        credential: admin.credential.cert(firebaseLogin)
    });
};
