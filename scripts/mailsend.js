const AWS = require("aws-sdk");

AWS.config.update({
	accessKeyId: 'BCLmDBzJd+wQ3y9Y6pND1akRXsaY+3os+hEwBlHPR+US',
	secretAccessKey: 'AKIAWYFFTCQRRSEPYSHF',
	region: 'us-east-2'
});


// Given here we can see it's working fine
// https://stackoverflow.com/questions/35946880/how-to-send-email-to-non-verified-email-address-using-aws-ses

const ses = new AWS.SES({
	"Version":"2012-10-17",
	"Statement":[{
		"Effect":"Allow",
		"Action":[
			"ses:SendEmail",
			"ses:SendRawEmail"
		],
		"Resource":"*"
	}]
});

const params = {
	Destination: {
		ToAddresses: ["sfs.ajeet20@gmail.com"] // Email address/addresses that you want to send your email
	},
	// ConfigurationSetName: 'WWW',
	Message: {
		Body: {
			Html: {
				// HTML Format of the email
				Charset: "UTF-8",
				Data:
				"<html><body><h1>Hello  Charith</h1><p style='color:red'>Sample description</p> <p>Time 55656</p></body></html>"
			},
			Text: {
				Charset: "UTF-8",
				Data: "Hello Charith Sample description time 56"
			}
		},
		Subject: {
			Charset: "UTF-8",
			Data: "Test email"
		}
	},
	Source: "info@skillroots.com"
};

const sendEmail = ses.sendEmail(params).promise();

sendEmail.then(data => {
	console.log("email submitted to SES", data);
}).catch(error => {
	console.log(error);
});
