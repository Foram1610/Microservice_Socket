var aws = require('aws-sdk');
var config = require('../config/config.json');

aws.config.update({
    // Your SECRET ACCESS KEY from AWS should go here,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    // Not working key, Your ACCESS KEY ID from AWS should go here,
    accessKeyId: process.env.SECRET_ACCESS_ID,
    region: process.env.REGION_NAME // region of your bucket
});

var s3 = new aws.S3();

var deleteFromAWS = (keyimage) => {
    console.log('keyimage', keyimage)
    var forimage = keyimage.split("/");
    var n = forimage.length;
    keyimage = forimage[n - 1];
    var params = {
        Bucket: process.env.BUCKET_NAME,
        Key: keyimage
    };
    s3.deleteObject(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
            return false
            // callback(err,null)
        } else {
            console.log("success", data);
            return true
            // callback(null,data)
        }
    });

}
module.exports = deleteFromAWS;