var mongoose = require('mongoose');
const mailModel = mongoose.model('MailTemplates')
const async = require('async');
mongoose.Promise = global.Promise;

let dbUrl = helper.getDatabaseUrl();
mongoose.connect(dbUrl, () => {
	console.log('you are connected to MongoDb');
	insertMailTitle();
});

mongoose.connection.on('error', (err) => {
	console.log('Mongdb connection failed due to error : ', err);
});

function insertMailTitle() {
	async.waterfall([
		function (callback) {
			mailModel.create( [
				{ name:"User Register",title: "USER_REGISTER",emailTitle:"Registration",body:"Hi,<br><br> Welcome to JCar , XXXXXX !",adminEmailInfo:'For any query or consolation info@eber.com',status:1},
				{ name:"User Reset Password",title: "USER_RESET_PASSWORD",emailTitle:"Reset Password",body:"Hi,<br><br> Password is successfully reset to XXXXXX. Please don t forget to change the password once you log in next time.",adminEmailInfo:'For any query or consolation info@eber.com',status:1},
				{ name:"User Change Password", title: "USER_CHANGE_PASSWORD",emailTitle:"Reset Password",body:"Hi,<br><br> Password is successfully reset to XXXXXX. Please don t forget to change the password once you log in next time.",adminEmailInfo:'For any query or consolation info@eber.com',status:1},
				{ name:"Driver Register", title: "DRIVER_REGISTER",emailTitle:"Registration",body:"Hi,<br><br> Welcome to JCar , XXXXXX !",adminEmailInfo:'For any query or consolation info@eber.com',status:1},
				{ name:"Driver Reset Password",title: "DRIVER_RESET_PASSWORD",emailTitle:"Reset Password",body:"Hi,<br><br> Password is successfully reset to XXXXXX. Please don t forget to change the password once you log in next time.",adminEmailInfo:'For any query or consolation info@eber.com',status:1},
				{ name:"Driver Forgot Password",title: "DRIVER_FORGOT_PASSWORD_OTP",emailTitle:"Your OTP Verification",body:"Hi,<br><br> Email Verification code for complete your registration process is : XXXXXX.",adminEmailInfo:'For any query or consolation info@eber.com',status:1},
				{ name:"Driver Change Password",title: "DRIVER_CHANGE_PASSWORD",emailTitle:"Reset Password",body:"Hi,<br><br> Password is successfully reset to XXXXXX. Please don t forget to change the password once you log in next time.",adminEmailInfo:'For any query or consolation info@eber.com',status:1},
				{ name:"Admin Approve Driver",title: "ADMIN_APPROVE_DRIVER",emailTitle:"Admin approve carrier",body:"Hi,<br><br> Password is successfully reset to XXXXXX. Please don t forget to change the password once you log in next time.",adminEmailInfo:'For any query or consolation info@eber.com',status:1},
				{ name:"Admin Block Driver",title: "ADMIN_BLOCK_DRIVER",emailTitle:"Admin block carrier",body:"Hi,<br><br> Password is successfully reset to XXXXXX. Please don t forget to change the password once you log in next time.",adminEmailInfo:'For any query or consolation info@eber.com',status:1},
				{ name:"Admin Reject Driver",title: "ADMIN_REJECT_DRIVER",emailTitle:"Admin reject carrier",body:"Hi,<br><br> Password is successfully reset to XXXXXX. Please don t forget to change the password once you log in next time.",adminEmailInfo:'For any query or consolation info@eber.com',status:1},
			] ,function(err,data){
				if(err){
					console.log("Error in inserting Mail Template.");
					process.exit();
				}else{
					callback(null,data)
				}
			});
		},
	], function(err, data){
		console.log("successfully save Mail Template.");
		process.exit();
	});
}
