const i18n = require('i18n')

module.exports = function (req, res, next) {
    let localecode = req.headers['accept-language'] 
    if(localecode != 'en' && localecode != 'ar'){
        localecode = 'en'
    }
    // console.log('localecode',localecode)
    i18n.configure({
        locales: ['en','ar'],
        directory: __dirname + '/locales',
        defaultLocale: localecode,
        cookie: 'lang',
        register: global
    });

    i18n.init(req, res);

    return next();
};