
const mongoose = require('mongoose');
const User = require('../models/userSchema')
const Country = require('../models/countrySchema');
const Governate = require('../models/governateSchema')
const District = require('../models/districtSchema')
const Service = require('../models/serviceSchema')
const City = require('../models/citySchema')
const moment = require('moment');
const validation = require('../helper/validator.js');
const { __ } = require('i18n');
const ejs = require('ejs');
const upload = require('../lib/Imageupload.js');
const singleImageUpload = upload.single('image');
const DeleteImage = require('../lib/fileDelete.js');
const config = require('../config/config.json');
var base64 = require('base-64');
var utf8 = require('utf8');
const helper = require('../helper/helper.js');
const constant = require('../constants.json');
const firebaseAdmin = require('firebase-admin');
const { required } = require('joi');
module.exports = {

    userRegister: async (req, res) => {
        singleImageUpload(req, res, async function (err, resp) { // NOSONAR
            try {
                let data = req.body;
                let file = req.file;

                if (file) {
                    if (err) {

                        return res.status(400).json({ status: "failure", statusCode: 400, message: __("IMAGE_UPLOAD_ERROR") })
                    }

                    data.profileImage = req.file.location
                } else {
                    data.profileImage = ''
                }



                //checking validations
                let params = [
                    { value: data.name, type: "string", title: __('name'), required: true },
                    { value: data.countryCode, type: "string", title: __("countryCode"), required: false },
                    { value: data.mobileNumber, type: "string", title: __("mobileNumber"), required: false },
                    { value: data.email, type: "string", title: __('email'), required: true },
                    { value: data.mobileNoStatus, type: "string", title: __("mobileNoStatus"), required: true },
                    { value: data.gender, type: "string", title: __("gender"), required: false },
                    { value: data.DOB, type: "string", title: __("birthdate"), required: true },
                    { value: data.referalCode, type: "string", title: __("referalCode"), required: false },
                    { value: data.timezone, type: "string", title: __("timezone"), required: true },
                    { value: data.signUpBy, type: "string", title: __("signUpBy"), required: true },
                    { value: data.deviceType, type: "string", title: __("deviceType"), required: true },
                    { value: data.firebaseToken, type: "string", title: __("firebaseToken"), required: true }
                ]

                if (data.signUpBy == 'manual')
                    params.push({ value: data.password, type: "string", title: __("password"), required: true })
                else if (data.signUpBy == 'google')
                    params.push({ value: data.googleId, type: "string", title: __("googleId"), required: true })
                else if (data.signUpBy == 'facebook')
                    params.push({ value: data.facebookId, type: "string", title: __("facebookId"), required: true })
                else if (data.signUpBy == 'apple')
                    params.push({ value: data.appleId, type: "string", title: __("appleId"), required: true })
                else if (data.signUpBy == 'microsoft')
                    params.push({ value: data.microsoftId, type: "string", title: __("microsoftId"), required: true })

                let checkErr = await validation(params);


                if (!checkErr.status) {
                    if (data.profileImage) DeleteImage(data.profileImage); //delete image from server if receive any error
                    return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message })
                }

                let userc = null;

                //genereate unique id for every user
                let userSerial = await helper.generateUniqueNumber('USER');

                let userData = {
                    uniqueId: userSerial.uniqueId,
                    name: data.name,
                    email: data.email,
                    countryCode: data.countryCode,
                    DOB: data.DOB,
                    gender: data.gender,
                    profileImage: data.profileImage,
                    mobileNumber: data.mobileNumber,
                    password: data.password,
                    deviceType: data.deviceType,
                    registerFrom: data.registerFrom,
                    signUpBy: data.signUpBy,
                    languageDetails: data.languageDetails,
                    userType: "USER",
                    status: "active",
                    accountStatus: "approved",
                    serialNumber: userSerial.serialNumber,

                    firebaseToken: [
                        {
                            token: data.firebaseToken || "dummyToken",
                            deviceType: data.deviceType
                        }
                    ]
                }

                //In case of referalCode
                if (data.referalCode) {
                    userData.referalCode = data.referalCode
                }

                //In case of social login
                if (data.facebookId || data.googleId || data.appleId || data.microsoftId) {
                    let checkUser = {}
                    if (data.facebookId) {
                        checkUser.$or = [
                            {
                                facebookId: data.facebookId
                            },
                            {
                                email: data.email
                            },
                            {
                                mobileNumber: data.mobileNumber,
                                countryCode: data.countryCode
                            }
                        ]

                        checkUser.userType = {
                            $in: ["USER"]
                        }
                        userData.facebookId = data.facebookId
                    } else if (data.googleId) {
                        checkUser.$or = [
                            {
                                googleId: data.googleId
                            },
                            {
                                email: data.email
                            },
                            {
                                mobileNumber: data.mobileNumber,
                                countryCode: data.countryCode
                            }
                        ]
                        checkUser.userType = {
                            $in: ["USER"]
                        }

                        userData.googleId = data.googleId
                    } else if (data.appleId) {
                        checkUser.$or = [
                            {
                                appleId: data.appleId
                            },
                            {
                                email: data.email
                            },
                            {
                                mobileNumber: data.mobileNumber,
                                countryCode: data.countryCode
                            }
                        ]
                        checkUser.userType = {
                            $in: ["USER"]
                        }
                        userData.appleId = data.appleId
                    } else if (data.microsoftId) {
                        checkUser.$or = [
                            {
                                microsoftId: data.microsoftId
                            },
                            {
                                email: data.email
                            },
                            {
                                mobileNumber: data.mobileNumber,
                                countryCode: data.countryCode
                            }
                        ]
                        checkUser.userType = {
                            $in: ["USER"]
                        }
                        userData.microsoftId = data.microsoftId
                    }
                    //checking user is exist or not
                    userc = await User.findOne(checkUser);

                    // await User.findOne()
                    if (userc && userc.isBlocked) {
                        return res.status(401).json({ status: "failure", statusCode: 401, isActive: false, message: __("USER_HAS_BEEN_BLOCKED"), data: userc })
                    }

                    //return if user is deleted
                    if (userc && userc.isDeleted) {
                        return res.status(401).json({ status: "failure", statusCode: 401, isActive: false, message: __("USER_HAS_BEEN_DELETED"), data: userc })
                    }

                    //return if user is not active
                    if (userc && userc.status != 'active') {
                        return res.status(403).json({ status: "failure", statusCode: 403, isActive: false, message: __("YOUR_ACCOUNT_IS_INACTIVE"), data: userc })
                    }

                    if (userc) {
                        //creating jwt token
                        let token = helper.signToken({ _id: userc._id });
                        return res.status(200).json({ status: "success", statusCode: 200, isActive: true, message: __("USER_EXISTS"), data: userc, token: token })
                    }
                }

                //checking email is already exists or not
                if (data.email) {
                    userc = await User.count({ email: data.email, userType: { $in: ['USER'] } });
                    if (userc) {
                        return res.status(400).json({ status: "failure", statusCode: 400, message: __("EMAIL_ALREADY_EXIST") })
                    }
                }

                //checking mobilenumber is already exists or not
                if (data.mobileNumber) {
                    userc = await User.count({ mobileNumber: data.mobileNumber, countryCode: data.countryCode, userType: { $in: ['USER'] } });
                    if (userc) {
                        return res.status(400).json({ status: "failure", statusCode: 400, message: __("MOBILE_NUMBER_ALREADY_EXIST") })
                    }

                    userData.mobileNumberStatus = data.mobileNoStatus
                } else {
                    userData.mobileNumberStatus = 'unverified'
                }

                //If User Already Registered
                if (userc) {
                    return res.status(400).json({ status: "failure", statusCode: 400, message: __("USER_EXISTS") })
                }

                //Creating User if not registered before

                // User.find()

                User.addUser(userData, async (err, user) => { // NOSONAR
                    if (err) {

                        return res.status(400).json({ status: "failure", statusCode: 400, message: __("INTERNAL_DB_ERROR") })
                    } else {

                        //sending welcome email to provider
                        // //sending verification email
                        let hostname = req.headers.host;
                        let logo = "https://" + hostname + '/images/alista-sharp.png';
                        var userId_in_bytes = utf8.encode(`${user._id}`);
                        var userId = base64.encode(userId_in_bytes);

                        var userType_in_bytes = utf8.encode(user.userType);
                        var userType = base64.encode(userType_in_bytes);

                        var email_in_bytes = utf8.encode(user.email);
                        var email = base64.encode(email_in_bytes);

                        let verifyEmailUrl = "https://" + hostname + "/api/v1/user/verifyEmail/" + userId + "/" + email + "/" + userType;



                        let emailParams = {
                            name: user.name,
                            app_name: constant.APP_NAME,
                            logo: logo,
                            url: verifyEmailUrl
                        }
                        //sending welcome email message to new registered user
                        ejs.renderFile('views/userWelcomeEmail.ejs', emailParams).then(templateData => {
                            let subject = 'Welcome to ' + constant.APP_NAME;
                            helper.sendEmail({ email: user.email, subject: subject, templateData: templateData }, function (err, resppp) { }); // NOSONAR
                        }).catch(err => { // NOSONAR
                            console.log('email error', err)
                        })


                        //creating jwt token
                        let token = helper.signToken({ _id: user._id });
                        return res.status(200).json({ status: "success", statusCode: 200, message: __("USER_REGISTERED_SUCCESSFULLY"), data: user, token: token })
                    }
                });
            } catch (error) {

                return res.status(500).json({ status: "failure", statusCode: 500, message: __("INTERNAL_SERVER_ERROR") })
            }
        })
    },
    userLogin: async (req, res) => {
        try {
            let data = req.body;
            //checking validations
            let params = [
                { value: data.email, type: "string", title: __('email'), required: true },
                { value: data.password, type: "string", title: __("password"), required: true },
                { value: data.deviceType, type: "string", title: __("deviceType"), required: true },
                { value: data.firebaseToken, type: "string", title: __("firebaseToken"), required: true }
            ]

            let checkErr = await validation(params);

            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message })
            }

            //checking user details
            let userDetails = await User.findUserDetails2({ email: data.email, userType: { $in: ['USER'] } })

            if (!userDetails) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("USER_NOT_FOUND")
                })
            }

            //Matching user passqword
            if (!User.authenticate(data.password, userDetails.hashPassword)) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("INVALID_LOGIN_CREDENTIALS")
                })
            }

            //creating jwt token


            await User.updateFirebaseToken({
                firebaseToken: data.firebaseToken,
                id: userDetails._id,
                deviceType: data.deviceType
            });

            let logedInUser = await User.findUserDetails2({ email: data.email, userType: { $in: ['USER'] } })
            //creating jwt token
            let token = helper.signToken(logedInUser);

            return res.status(200).json({
                status: "success",
                statusCode: 200,
                message: __("LOGIN_SUCCESS"),
                data: logedInUser,
                token: token
            })
        } catch (err) {

            return res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR")
            })
        }
    },
    validateParams: async (req, res) => { // NOSONAR
        try {
            let data = req.body
            //Checking Validation
            let params = [
                { value: data.email, type: "string", title: __("email"), required: false },

                { value: data.countryCode, type: "string", title: __("countryCode"), required: false },
                { value: data.mobileNumber, type: "string", title: __("mobileNumber"), required: false },
                { value: data.signUpBy, type: "string", title: __("signUpBy"), required: false }
            ]

            let checkErr = await validation(params);

            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message })
            }

            let checkUser = null;
            //In case of manual login
            if (data.signUpBy == 'manual') {
                if (data.email) {
                    //Checking user records with email
                    checkUser = await User.userCheck4({ email: data.email, userType: { $in: ["USER"] } })
                    if (checkUser) {
                        return res.status(400).json({ status: "failure", statusCode: 400, message: __('EMAIL_ALREADY_EXIST') })
                    }
                }

                //Checking user records with email
                if (data.mobileNumber) {
                    if (!data.countryCode) {
                        return res.status(400).json({ status: "failure", statusCode: 400, message: __('COUNTRY_CODE_IS_REQUIRED') })
                    }

                    checkUser = await User.userCheck5({
                        mobileNumber: data.mobileNumber,
                        countryCode: data.countryCode,
                        userType: { $in: ["USER"] }
                    })

                    if (checkUser) {
                        return res.status(400).json({ status: "failure", statusCode: 400, message: __('MOBILE_NUMBER_ALREADY_EXIST') })
                    }
                }
            } else {
                // In case of social login
                //Checking user records with email
                if (data.email) {
                    checkUser = await User.findIndividual({ email: data.email, userType: { $in: ['USER'] } });
                    if (checkUser) {
                        //Return if user is blocked
                        if (checkUser.isBlocked) {
                            return res.status(401).json({ status: "failure", statusCode: 401, isActive: false, message: __('USER_HAS_BEEN_BLOCKED'), data: "" })
                        }

                        //Return if user is deleted
                        if (checkUser.isDeleted) {
                            return res.status(401).json({ status: "failure", statusCode: 401, isActive: false, message: __('USER_HAS_BEEN_DELETED'), data: "" })
                        }

                        if (checkUser.status != 'active') {
                            return res.status(403).json({ status: "failure", statusCode: 403, isActive: false, message: __("YOUR_ACCOUNT_IS_INACTIVE"), data: checkUser })
                        }
                        //creating jwt token
                        let token = helper.signToken({ _id: checkUser._id });
                        return res.status(400).json({ status: "failure", statusCode: 400, isActive: true, message: __('EMAIL_ALREADY_EXIST'), data: checkUser, token: token })
                    }
                }

                //Checking user records with Mobile
                if (data.mobileNumber) {
                    if (!data.countryCode) {
                        return res.status(400).json({ status: "failure", statusCode: 400, message: __('COUNTRY_CODE_IS_REQUIRED') })
                    }

                    checkUser = await User.findIndividual({
                        mobileNumber: data.mobileNumber,
                        countryCode: data.countryCode,
                        userType: { $in: ['USER'] }
                    });

                    if (checkUser) {
                        //Return if user is blocked
                        if (checkUser.isBlocked) {
                            return res.status(401).json({ status: "failure", statusCode: 401, isActive: false, message: __('USER_HAS_BEEN_BLOCKED'), data: "" })
                        }
                        //Return if user is deleted
                        if (checkUser.isDeleted) {
                            return res.status(401).json({ status: "failure", statusCode: 401, isActive: false, message: __('USER_HAS_BEEN_DELETED'), data: "" })
                        }

                        if (checkUser.status != 'active') {
                            return res.status(403).json({ status: "failure", statusCode: 403, isActive: false, message: __("YOUR_ACCOUNT_IS_INACTIVE"), data: checkUser })
                        }

                        //creating jwt token
                        let token = helper.signToken({ _id: checkUser._id });
                        return res.status(400).json({ status: "failure", statusCode: 400, isActive: true, message: __('MOBILE_NUMBER_ALREADY_EXIST'), data: checkUser, token: token })
                    }
                }
            }

            if (!data.email && !data.mobileNumber) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: __('YOU_HAVE_NOT_PROVIDED_ANY_PARAMS') })
            } else {
                return res.status(200).json({ status: "success", statusCode: 200, message: __('VALIDATED') })
            }

        } catch (error) {

            res.status(500).json({ status: "failure", statusCode: 500, message: __('INTERNAL_SERVER_ERROR') })
            throw new Error(error)
        }
    },
    verifyEmail: async (req, res) => {
        try {
            let hostname = req.headers.host;


            let logo = "https://" + hostname + "/images/logo_white.png";
            let verifyEmail = "https://" + hostname + "/images/verifyEmail.jpg";

            var bytes = utf8.decode(req.params.userId);
            var userId = base64.decode(bytes);

            var eBytes = utf8.decode(req.params.email);
            var email = base64.decode(eBytes);


            var userTypeBytes = utf8.decode(req.params.userType);
            var userType = base64.decode(userTypeBytes);


            let checkEmail = await User.count({
                email: email,
                userType: userType,
            });

            if (checkEmail <= 0) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("INVALID_REQUEST"),
                    data: "",
                });
            }

            let checkUser = await User.findOne({
                _id: userId,
                userType: userType,
            }).select('_id name');

            if (!checkUser) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("INVALID_REQUEST"),
                    data: ""
                });
            }

            await User.updateEmailStatus({ _id: userId });
            let currentYear = moment(new Date()).format('YYYY')
            let emailParams = {
                name: checkUser.name,
                app_name: constant.APP_NAME,
                logo: logo,
                verifyEmail: verifyEmail,
                userId: userId,
                email: email,
                currentYear: currentYear
            };

            ejs.renderFile("views/emailVerified.ejs", emailParams).then((templateData) => {
                return res.status(200).send(templateData)
            }).catch((err) => {

                throw new Error(err);
            });
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INVALID_URL"),
            });
            throw new Error(error);
        }
    },
    forgotPassword: async (req, res) => {
        try {
            let data = req.body;
            let params = [
                {
                    value: data.email,
                    type: "string",
                    title: __("email"),
                    required: false,
                },
                {
                    value: data.mobileNumber,
                    type: "string",
                    title: __("mobileNumber"),
                    required: false,
                },
            ];

            let checkErr = await validation(params);

            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message })
            }

            let queryData = {
                userType: 'USER'
            }
            if (data.email) {
                queryData.email = data.email
            } else {
                queryData.mobileNumber = data.mobileNumber
            }

            let userDetails = await User.findOne(queryData);
            if (userDetails) {
                let exptime = new Date();
                exptime = moment(exptime).add(10, 'm').toDate(); //set otp expiry to next 10 minute

                let OTP = helper.generateOTP();

                data.OTP = OTP;
                data.OTPexp = exptime;
                data.id = userDetails._id;

                await User.updateOTP(data);

                if (data.email) {
                    let hostname = req.headers.host;
                    let logo = "https://" + hostname + '/images/alista-sharp.png';
                    let emailParams = {
                        name: userDetails.name,
                        app_name: constant.APP_NAME,
                        OTP: data.OTP,
                        logo: logo
                    }
                    //sending emails
                    ejs.renderFile("views/userResetPassword.ejs", emailParams)
                        .then((templateData) => {
                            let subject = "Forgot Password";
                            helper.sendEmail(
                                {
                                    email: userDetails.email,
                                    subject: subject,
                                    templateData: templateData
                                },
                                function (err, resp) {
                                    if (err) {
                                        res.status(400).json({
                                            status: "failure",
                                            statusCode: 400,
                                            data: err
                                        });
                                    } else {
                                        res.status(200).json({
                                            status: "success",
                                            statusCode: 200,
                                            message: __("OTP_SENT_TO_YOUR_EMAIL"),
                                            data: data,
                                        });
                                    }
                                } //NOSONAR
                            );

                        })
                        .catch((err) => {
                            res.status(400).json({
                                status: "failure",
                                statusCode: 400,
                                message: __("SOMETHING_WENT_WRONG"),
                                data: err.message,
                            });

                        });
                }
                else {
                    res.status(200).json({
                        status: "success",
                        statusCode: 200,
                        message: "",
                        data
                    });
                }
            } else {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("USER_NOT_EXISTS"),
                    data: ''
                });
            }
        } catch (err) {
            res.status(500).json({ status: "failure", statusCode: 500, message: __("INTERNAL_SERVER_ERROR") })
            throw new Error(err.message)
        }
    },
    resetPassword: async (req, res) => {
        try {
            let data = req.body;
            //Validation
            let params = [
                { value: data.email, type: "string", title: __("email"), required: false },
                { value: data.countryCode, type: "string", title: __("countryCode"), required: false },
                { value: data.mobileNumber, type: "string", title: __("mobileNumber"), required: false },
                { value: data.password, type: "string", title: __("password"), required: true },
                { value: data.cnfpassword, type: "string", title: __("cnfpassword"), required: true },
                { value: data.OTP, type: "string", title: __("OTP"), required: true },
                { value: data.type, type: "string", title: __("type"), required: true }, //email, phone
            ]

            let checkErr = await validation(params);

            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message })
            }

            if (data.password != data.cnfpassword) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: __('PASSWORD_CNFPASSWORD_NOT_MATCH') });
            }

            let query = {
                userType: { $in: ["USER"] },
            }
            if (data.email) {
                query.email = data.email
            } else {
                query.mobileNumber = data.mobileNumber
                query.countryCode = data.countryCode
            }

            let verifyUser = await User.findOne(query).select('_id email OTP OTPexp userType mobileNumber countryCode');

            if (!verifyUser) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: __('USER_NOT_FOUND') });
            }

            let driverOtp = verifyUser.OTP;
            if (driverOtp != data.OTP) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: __('INVALID_OTP') });
            }

            let cDate = new Date();
            let exptime = new Date(verifyUser.OTPexp);

            if (cDate.getTime() >= exptime.getTime()) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: __('OTP_EXPIRED') });
            }

            let updatePasswordData = {
                id: verifyUser._id,
                password: data.password,
                OTP: "",
                OTPexp: ""
            }

            //updating new password
            User.updatePassword(updatePasswordData, async function (err, resdata) {
                if (err) {
                    return res.status(400).json({ status: "failure", statusCode: 400, message: __('INTERNAL_DB_ERROR') });
                }

                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: __('PASSWORD_RESET_SUCCESS'),
                    data: resdata
                });
            })
        } catch (err) {

            res.status(400).json({ status: "failure", statusCode: 400, message: __('INTERNAL_SERVER_ERROR') });
            throw new Error(err)
        }
    },
    changePassword: async (req, res) => {
        try {
            let userId = req.user._id
            let data = req.body
            let params = [
                { value: data.oldPassword, type: "string", title: __('oldPassword'), required: true },
                { value: data.newPassword, type: "string", title: __("newPassword"), required: true },
                { value: data.cnfpassword, type: "string", title: __('cnfpassword'), required: true }
            ]
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message })
            }
            if (data.newPassword != data.cnfpassword) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: __('PASSWORD_CNFPASSWORD_NOT_MATCH') });
            }

            let userDetails = await User.findUser(userId)

            if (!userDetails) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("USER_NOT_FOUND")
                })
            }

            if (!User.authenticate(data.oldPassword, userDetails.hashPassword)) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("INVALID_OLD_PASSWORD")
                })
            }

            let updatePasswordData = {
                id: userId,
                password: data.newPassword
            }

            User.updatePassword(updatePasswordData, async function (err, resdata) {
                if (err) {

                    return res.status(400).json({ status: "failure", statusCode: 400, message: __('INTERNAL_DB_ERROR') });
                }
                return res.status(200).json({ status: "success", statusCode: 200, message: __('PASSWORD_RESET_SUCCESS') });
            })
        } catch (err) {

            res.status(400).json({ status: "failure", statusCode: 400, message: __('INTERNAL_SERVER_ERROR') });
            throw new Error(err)
        }
    },
    logout: async (req, res) => {
        try {
            let data = req.body;
            data.deviceType = req.headers.devicetype
            //Validation
            let params = [
                { value: data.deviceType, type: "string", title: __("deviceType"), required: true },
                { value: data.firebaseToken, type: "string", title: __("firebaseToken"), required: true },
                { value: data.firebaseUid, type: "string", title: __("firebaseUid"), required: false }
            ]

            let checkErr = await validation(params);

            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message })
            }

            //remove firebase token on logout
            let logoutData = {
                userId: req.user._id,
                firebaseToken: data.firebaseToken,
                deviceType: data.deviceType
            }

            User.logout(logoutData, async function (err, resp) {
                if (err) {

                    return res.status(400).json({
                        status: "failure",
                        statusCode: 400,
                        data: "",
                        message: __("INTERNAL_DB_ERROR")
                    })
                } else {
                    //destroy user session
                    // req.logout();
                    // req.session.destroy()

                    if (data.firebaseUid)
                        await firebaseAdmin.auth().revokeRefreshTokens(req.body.firebaseUid);

                    return res.status(200).json({
                        status: "success",
                        statusCode: 200,
                        data: "",
                        message: __("LOGOUT_SUCCESSFULLY")
                    })
                }

            });

        } catch (err) {

            return res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR")
            })
        }
    },
    revokeFirebaseRefreshTokens: async (req, res) => {
        try {
            let data = req.body;
            data.deviceType = req.headers.devicetype
            //Validation
            let params = [
                { value: data.deviceType, type: "string", title: __("deviceType"), required: true },
                { value: data.firebaseToken, type: "string", title: __("firebaseToken"), required: true },
                { value: data.firebaseUid, type: "string", title: __("firebaseUid"), required: true }
            ]

            let checkErr = await validation(params);

            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message })
            }

            await firebaseAdmin.auth().revokeRefreshTokens(req.body.firebaseUid);

        } catch (err) {

            return res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR")
            })
        }
    },
    getUserProfile: async (req, res) => {
        try {
            let userId = req.user._id

            User.findUserById(userId, function (err, resp) {
                if (err) {

                    return res.status(400).json({ status: "failure", statusCode: 400, message: __('NO_RECORD_FOUND') })
                } else {
                    return res.status(200).json({ status: "success", statusCode: 200, message: '', data: resp })
                }
            })
        } catch (err) {

            res.status(500).json({ status: "failure", statusCode: 500, message: __('INTERNAL_SERVER_ERROR') })
            throw new Error(err)
        }
    },
    getUserDetails: async (req, res) => {
        try {
            let userId = req.params.userId
            User.findUserById(userId, function (err, resp) { // NOSONAR
                if (err) {

                    return res.status(400).json({ status: "failure", statusCode: 400, message: __('NO_RECORD_FOUND') })
                } else {
                    return res.status(200).json({ status: "success", statusCode: 200, message: '', data: resp })
                }
            })
        } catch (err) {

            res.status(500).json({ status: "failure", statusCode: 500, message: __('INTERNAL_SERVER_ERROR') })
            throw new Error(err)
        }
    },
    editprofile: async (req, res) => { // NOSONAR
        try {
            let userId = req.user._id

            let data = req.body;


            //Validation
            let params = [
                { value: data.name, type: "string", title: __('name'), required: false },
                { value: data.countryCode, type: "string", title: __("countryCode"), required: false },
                { value: data.mobileNumber, type: "string", title: __("mobileNumber"), required: false },
                { value: data.email, type: "string", title: __('email'), required: false },
                { value: data.mobileNoStatus, type: "string", title: __("mobileNoStatus"), required: false },
                { value: data.gender, type: "string", title: __("gender"), required: false },
                { value: data.DOB, type: "string", title: __("Birthdate"), required: false },
                { value: data.password, type: "string", title: __("password"), required: false }
            ]

            let checkErr = await validation(params);

            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message })
            }
            let obj = {

                _id: userId
            }

            if (data.name) {
                obj.name = data.name
            }

            if (data.mobileNumber) {
                if (!data.countryCode) {
                    return res.status(400).json({ status: "failure", statusCode: 400, message: __('COUNTRY_CODE_IS_REQUIRED'), data: "" })
                }

                if (!data.mobileNoStatus) {
                    return res.status(400).json({ status: "failure", statusCode: 400, message: __('MOBILE_NO_STATUS_IS_REQUIRED'), data: "" })
                }

                obj.mobileNumber = data.mobileNumber
                obj.countryCode = data.countryCode
                obj.mobileNumberStatus = data.mobileNoStatus
                //checking mobile number is already exist or not
                let checkUser = await User.findIndividual({ _id: { $ne: userId }, mobileNumber: data.mobileNumber, countryCode: data.countryCode, userType: { $in: [req.user.userType] } });
                if (checkUser) {
                    return res.status(400).json({ status: "failure", statusCode: 400, message: __('MOBILE_NUMBER_ALREADY_EXIST'), data: "" })
                }
            }

            //checking email is already exist or not
            if (data.email) {
                let checkUser = await User.findIndividual({ _id: { $ne: userId }, email: data.email, userType: { $in: [req.user.userType] } });
                if (checkUser) {
                    return res.status(400).json({ status: "failure", statusCode: 400, message: __('EMAIL_ALREADY_EXIST'), data: "" })
                }
            }

            if (data.gender) {
                obj.gender = data.gender
            }

            if (data.password) {
                obj.password = data.password
            }

            if (data.DOB) {
                obj.DOB = data.DOB
            }

            //updating user informations
            User.updateUserById(obj, function (err, resp) {
                if (err) {

                    res.status(400).json({ status: "failure", statusCode: 400, message: __('INTERNAL_DB_ERROR') })
                    throw new Error(err)
                } else {
                    return res.status(200).json({ status: "success", statusCode: 200, data: resp, message: __('RECORD_UPDATED') })
                }
            })
        } catch (err) {

            res.status(500).json({ status: "failure", statusCode: 500, message: __('INTERNAL_SERVER_ERROR') })
            throw new Error(err)
        }
    },
    updateProfileImage: async (req, res) => {
        singleImageUpload(req, res, async function (err, resp) {
            try {
                let userId = req.user._id;

                let data = req.body
                let file = req.file;

                if (file) {
                    if (err) {

                        return res.status(400).json({ status: "failure", statusCode: 400, message: __("IMAGE_UPLOAD_ERROR") })
                    }
                    data.profileImage = req.file.location
                }

                let params = [
                    { value: data.profileImage, type: "string", title: __('profileImage'), required: true }
                ]

                let checkErr = await validation(params);

                if (!checkErr.status) {
                    return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message })
                }

                let userData = {
                    profileImage: data.profileImage,
                    _id: userId
                }
                //updating user imagae
                User.updateUserById(userData, async (err, user) => { // NOSONAR
                    if (err) { // NOSONAR

                        return res.status(400).json({ status: "failure", statusCode: 400, message: __("INTERNAL_DB_ERROR") })
                    } else {
                        DeleteImage(req.user.profileImage)
                        return res.status(200).json({ status: "success", statusCode: 200, message: __("PROFILE_IMAGE_UPDATED_SUCCESSFULLY"), data: { profileImage: data.profileImage } })
                    }
                });
            } catch (error) {

                res.status(500).json({ status: "failure", statusCode: 500, message: __("INTERNAL_SERVER_ERROR") })
                throw new Error(error)
            }
        })
    },
    getActiveCountries: async (req, res) => {
        try {
            let data = {}
            let languageCode = req.languageCode

            let params = [
                { value: languageCode, type: "string", title: __('language'), required: true }
            ]

            let checkErr = await validation(params);


            data.languageCode = languageCode || 'en'

            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message })
            }

            let countryLists = await Country.getActiveCountriesByLanguage({ languageCode: data.languageCode });
            if (countryLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: "",
                    data: countryLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: __("NO_RECORD_FOUND"),
                    data: countryLists
                });
            }
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error)
        }
    },
    getActiveGovernates: async (req, res) => {
        try {
            let data = {}
            let languageCode = req.languageCode
            let countryId = req.params.countryId

            let params = [
                { value: languageCode, type: "string", title: __('language'), required: true },
                { value: countryId, type: "string", title: __('countryId'), required: true }
            ]

            let checkErr = await validation(params);


            data.languageCode = languageCode || 'en'

            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message })
            }

            let governateLists = await Governate.getActiveGovernateByLanguage({ languageCode: data.languageCode, countryId: countryId });
            if (governateLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: "",
                    data: governateLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: __("NO_RECORD_FOUND"),
                    data: governateLists
                });
            }
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error)
        }
    },
    getActiveDistricts: async (req, res) => {
        try {
            let data = {}
            let languageCode = req.languageCode
            let cityId = req.params.cityId

            let params = [
                { value: languageCode, type: "string", title: __('language'), required: true },
                { value: cityId, type: "string", title: __('cityId'), required: true }
            ]

            let checkErr = await validation(params);


            data.languageCode = languageCode || 'en'

            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message })
            }

            let districtsLists = await District.getActiveDistrictsByLanguage({ languageCode: data.languageCode, cityId: cityId });
            if (districtsLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: "",
                    data: districtsLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: __("NO_RECORD_FOUND"),
                    data: districtsLists
                });
            }
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error)
        }
    },
    getActiveCities: async (req, res) => {
        try {
            let data = {}
            let languageCode = req.languageCode
            let governateId = req.params.governateId

            let params = [
                { value: languageCode, type: "string", title: __('language'), required: true },
                { value: governateId, type: "string", title: __('governateId'), required: true }
            ]

            let checkErr = await validation(params);


            data.languageCode = languageCode || 'en'

            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message })
            }

            let citiesLists = await City.getActiveCitiesByLanguage({ languageCode: data.languageCode, governateId: governateId });
            if (citiesLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: "",
                    data: citiesLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: __("NO_RECORD_FOUND"),
                    data: citiesLists
                });
            }
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error)
        }
    },
    checkIfUserInsideAnyBound: async (req, res) => {
        try {
            let data = req.body;
            let bounds = await District.allBoundCoordinates();
            let isInside = false;
            let insideDistrictId = "";

            let user_coordinates = data.userLocation;

            let boundt = {}
            for (let bound of bounds) {


                // if bound.bounds is null continue;
                if (bound.bounds == null) {
                    continue;
                }
                let checkifBounded = District.isUserInsideDistrict(user_coordinates, bound)

                if (checkifBounded) {
                    boundt = bound
                    isInside = true;
                    insideDistrictId = bound._id;
                }
            }

            if (!isInside) {
                return res.status(200).json({
                    status: "failure",
                    message: "no service is available for this coordinates",
                });
            }
            let districtDetails = await District.getDistrictById(insideDistrictId);
            return res.status(200).json({
                status: "success",
                message: "service is available for this coordinates",

                data: {
                    isInside: isInside,
                    districtDetails: districtDetails,
                    bound: boundt
                }
            });


        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },

    showServiceToCustomerByLocation: async (req, res) => {
        try {
            let data = req.body;
            let languageCode = req.languageCode
            let params = [
                { value: data.latitude, type: "number", title: __('latitude'), required: true },
                { value: data.longitude, type: "number", title: __('longitude'), required: true },
                { value: data.page, type: "number", title: __('page'), required: false },
                { value: data.limit, type: "number", title: __('limit'), required: false },
            ]
            let checkErr = await validation(params);

            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message })
            }

            let filterOption = {
                page: data.page || 1,
                limit: data.limit || 10,
                languageCode: languageCode || 'en'
            }

            //find which district user belong to
            let user_coordinates = {
                lat: data.latitude,
                lng: data.longitude
            }
            let districtFromCoordinate = await District.identifyDistrictFromUserLocation(user_coordinates)

            if (!districtFromCoordinate.status) {
                return res.status(200).json({
                    status: "failure",
                    message: "no service is available for this coordinates",
                });
            }
            let districtId = districtFromCoordinate.districtId
            let districtDetails = await District.getDistrictById(districtId);


            //find services in this district district->city->governate->country

            let services = await Service.servicesFallUnderDistrict(districtDetails, filterOption)
            if (services.length > 0) {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: "",
                    data: services,
                    count: services.length

                });
            } else {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: __("NO_RECORD_FOUND"),
                    data: services
                });
            }
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR")
            });

        }

    }
}
