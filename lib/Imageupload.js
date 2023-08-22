var multer = require('multer');
var multerS3 = require('multer-s3');
var aws = require('aws-sdk');
var config = require('../config/config.json');

aws.config.update({
	// Your SECRET ACCESS KEY from AWS should go here,
	secretAccessKey: process.env.SECRET_ACCESS_KEY,
	// Not working key, Your ACCESS KEY ID from AWS should go here,
	accessKeyId: process.env.SECRET_ACCESS_ID,
	region: process.env.REGION_NAME // region of your bucket
});

// console.log('console',config)
var s3 = new aws.S3();

var upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: process.env.BUCKET_NAME,
		contentLength: config.CONTENT_LENGTH,
		acl: 'public-read',
		metadata: function (req, file, cb) {
			console.log('file', file)
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {
			console.log('file.originalname', file.originalname)
			cb(null, Date.now().toString() + file.originalname)
		}
	}),
	limits: {
		fileSize: 8000000
	}
});

module.exports = upload;
