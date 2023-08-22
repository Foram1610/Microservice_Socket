const { __ } = require("i18n");
const express = require('express');
const router = express.Router();

router.all('*',function (req, res, next) {
    if(req.headers['accept-language']){
        req.languageCode = req.headers['accept-language'] //adding language code in request
        if(req.languageCode == 'en' || req.languageCode == 'ar'){
            next();
        }else{
            return res.status(400).json({
                status:"failure",
                statusCode:400,
                message:__("INVALID_LANGUAGE_CODE")
            })  
        }
    }else{
        res.status(400).json({
            status:"failure",
            statusCode:400,
            message:__("LANGUAGE_IS_REQUIRED")
        })
    }
});

module.exports = router;