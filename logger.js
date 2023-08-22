const winston = require('winston');

var options = {
    // file: {
    //     level: 'info',
    //     filename: `./logs/errorinfo.log`,
    //     handleExceptions: true,
    //     json: true,
    //     maxsize: 10242880, // 10MB
    //     maxFiles: 5,
    //     colorize: false,
    // },
    errorFile: {
        level: 'error',
        filename: `./logs/error.log`,
        handleExceptions: true,
        json: true,
        maxsize: 10242880, // 10MB
        maxFiles: 100,
        colorize: true,
    },
    // console: {
    //     level: 'debug',
    //     handleExceptions: true,
    //     json: false,
    //     colorize: true,
    // },
  };

var logger = winston.createLogger({
    transports: [
        // new winston.transports.File(options.file),
        new winston.transports.File(options.errorFile),
        // new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    },
};

module.exports = logger;