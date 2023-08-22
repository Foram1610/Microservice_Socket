module.exports = (winston)=>{
    process.on('uncaughtException', (err, origin) => {
        winston.error(`process.stderr.fd is ${process.stderr.fd}\n` + ` caught exception is: ${err}\n`+` Exception origin: ${origin}`+' timestamp '+new Date() );
    });

    //handle unhandledRejection
    process.on('unhandledRejection', (reason, promise) => {
        winston.error('Unhandled Rejection error '+reason.stack +' timestamp '+new Date() );
    });
}