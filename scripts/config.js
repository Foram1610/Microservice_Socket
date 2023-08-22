
var mongoose = require('mongoose');
const configModel = mongoose.model('Configs');

const async = require('async');
mongoose.Promise = global.Promise;

let dbUrl = helper.getDatabaseUrl();
mongoose.connect(dbUrl, () => {
	console.log('you are connected to MongoDb');
	insertConfigInfo();
});

mongoose.connection.on('error', (err) => {
  	console.log('Mongdb connection failed due to error : ', err);
});

function insertConfigInfo() {
	async.waterfall([
		function (callback) {
			configModel.create({
				LOCALURL: 'http://localhost:5000/',
				STAGEURL: 'http://localhost:5000/',
				PRODURL: '',
				LIVEURL: '',
				STAGINGURL: '',
				EMAIL: '',
				
				privateKey: 'c3f42e68-b461-4bc1-ae2c-da9f27ee3a20',
				
				"FROM_MAIL.development": "Alista <no-reply@mg.ondemandcreations.com>",
				"FROM_MAIL.production": "Alista <no-reply@mg.ondemandcreations.com>",
				"FROM_MAIL.staging": "Alista <no-reply@mg.ondemandcreations.com>",

				"AWS.SECRET_ACCESS_KEY": "",
				"AWS.SECRET_ACCESS_ID": "",
				"AWS.REGION_NAME": "ap-south-1",
				"AWS.BUCKET_NAME": "",

				'google_Places_API_Key.Android_User_App_Google_key': '',
				'google_Places_API_Key.Android_Provider_App_Google_Key': '',
				
				'google_Places_API_Key.iOS_User_App_Google_Key': '',
				'google_Places_API_Key.iOS_Provider_App_Google_Key': '',
				
				'google_Places_API_Key.Web_App_Google_Key': '',
				'google_Places_API_Key.Road_API_Google_Key': '',

				'IOS_App_URL.IOS_Customer_App_URL': '',
				'IOS_App_URL.IOS_Provider_App_URL': '',

				'Android_App_URL.Android_Customer_App_URL': '',
				'Android_App_URL.Android_Provider_App_URL': '',

				'PaymentConfig.Default_Payment_Gateway' : 'Stripe',
				'PaymentConfig.live.Stripe_Secret_Key' : 'sk_live_59xYdzA8CrUKlFT3rrAy6Krz00KEcp4gb0',
				'PaymentConfig.live.Stripe_Publishable_Key' : 'pk_live_UVqZBuGl0xKttRtjhlYShDJa00lkfvQI87',
				'PaymentConfig.sandbox.Stripe_Secret_Key' : 'sk_test_M7w0BmxcTS5uofDmuxETIvEe00IJXV2mNN',
				'PaymentConfig.sandbox.Stripe_Publishable_Key' : 'pk_test_SfSOd6XGV9cG66RsaOj35kKT00pNmUMNyk',


				'mailgun.MAILGUN_API_KEY': '8a31b074096b5268ffb21c1070282f55-9ce9335e-7f034331',
				'mailgun.MAILGUN_DOMAIN': 'mg.ondemandcreations.com',
				'mailgun.MAILGUN_FROM': 'Autostar <no-reply@mg.ondemandcreations.com>',


				'AppVersion.Android_User_App_Version': '',
				'AppVersion.Android_Provider_App_Version': '',
				'AppVersion.IOS_User_App_Version': '',
				'AppVersion.IOS_Provider_App_Version': '',

			}, function (err, data) {
				if (err) {
					console.log("Error in inserting config.");
					process.exit();
				}else {
					callback(null, data)
				}
			});
		},
	], function (err, data) {
		console.log("successfully saved config Info.");
		process.exit();
	});
}
