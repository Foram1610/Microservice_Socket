const { __ } = require("i18n");
const express = require('express');
const router = express.Router();
const firebaseAdmin = require('firebase-admin');

router.all('*',async function (req, res, next) {
    console.log("🚀 ~ file: verifyFirebaseAuthToken.js:8 ~ req.headers['firebaseToken']:", req.headers['firebasetoken'])
    if(req.headers['firebasetoken']){
        try {
            await firebaseAdmin.auth().verifyIdToken(req.headers['firebasetoken']);
            next();
        } catch (error) {
            return res.status(400).json({
                status: "failure",
                statusCode: 400,
                message: __("INVALID FIREBASE AUTH TOKEN") 
            })
        }
    }
    else{
        res.status(400).json({
            status:"failure",
            statusCode:400,
            message:__("FIREBASE AUTH TOKEN IS REQUIRED")
        })
    }
});

module.exports = router;