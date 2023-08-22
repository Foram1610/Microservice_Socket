 
const mongoose = require("mongoose");
const User = require('../models/userSchema');
const moment = require("moment");
const Country = require('../models/countrySchema');
const Governate = require('../models/governateSchema');
const District = require('../models/districtSchema');
const City = require('../models/citySchema');
const Service = require('../models/serviceSchema');
const CompanyEmployee = require('../models/companyEmployeeSchema');
const Category = require('../models/categorySchema');
const TimeSlot = require('../models/timeSlotSchema');
const validation = require('../helper/validator.js');
const { __ } = require('i18n');
const ejs = require('ejs');

const upload = require('../lib/Imageupload.js');
const config = require('../config/config.json');
const helper = require('../helper/helper.js');
const deleteImage = require('../lib/fileDelete')
const singleImageUpload = upload.single('image');
const multipleImageUpload = upload.any();
var base64 = require('base-64');
var utf8 = require('utf8');
const constant = require('../constants.json');
const firebaseAdmin = require('firebase-admin');

module.exports = {
    testTemlate: async (req, res) => {
        let hostname = req.headers.host;
        let logo = "https://" + hostname + "/images/logo.png";

        var bytes = utf8.encode(`6086b4b19fdf9e31e9088608`);
        var userId = base64.encode(bytes);




        let url = "https://" + hostname + "/api/v1/provider/verifyEmail/" + userId + "/" + email;


        let emailParams = {
            name: "Ajeet",
            app_name: constant.APP_NAME,
            logo: logo,
            url: url
        };

        ejs.renderFile("views/verifyEmailTempate.ejs", emailParams).then((templateData) => {

            helper.sendEmail({ email: "sfs.ajeet20@gmail.com", subject: "test", templateData: templateData }, function (err, resp) { return });
        }).catch((err) => {

            throw new Error(err);
        });
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
                userType: userType
            });

            if (checkEmail <= 0) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("INVALID_REQUEST"),
                    data: ""
                });
            }

            let checkUser = await User.findOne({
                _id: userId,
                userType: userType
            }).select('_id name');

            if (!checkUser) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("INVALID_REQUEST"),
                    data: ""
                });
            }

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
                message: __("INVALID_URL")
            });
            throw new Error(error);
        }
    },
    providerRegister: async (req, res) => {
        multipleImageUpload(req, res, async function (err, resp) { // NOSONAR
            try {
                let data = req.body;
                let files = req.files;
                let services = [];
                if (data.services) {
                    let services_str = JSON.parse(
                        JSON.stringify(data.services)
                    );
                    services = JSON.parse(services_str);
                    services.forEach(serv => {
                        if (!serv.categoryId || !serv.serviceId) {
                            return res.status(400).json({
                                status: "failure",
                                statusCode: 400,
                                message: __("INCORRECT_SERVICE_OR_CATEGORY")
                            });
                        }
                    })
                    data.services = services;
                }


                if (err) {

                    return res.status(400).json({
                        status: "failure",
                        statusCode: 400,
                        message: __("IMAGE_UPLOAD_ERROR")
                    });
                }

                if (files.length > 0) {
                    files.forEach(function (value) {
                        if (value.fieldname == "profileImage") {
                            data.profileImage = value.location;
                        } else if (value.fieldname == "documentImage") {
                            data.documentImage = value.location;
                        }
                    });
                } else {
                    return res
                        .status(400)
                        .json({
                            status: "failure",
                            statusCode: 400,
                            message: __("PLEASE_UPLOAD_DOCUMENT")
                        });
                }


                let params = [
                    {
                        value: data.name,
                        type: "string",
                        title: __("name"),
                        required: true
                    },
                    {
                        value: data.countryCode,
                        type: "string",
                        title: __("countryCode"),
                        required: true
                    },
                    {
                        value: data.mobileNumber,
                        type: "string",
                        title: __("mobileNumber"),
                        required: true
                    },
                    {
                        value: data.email,
                        type: "string",
                        title: __("email"),
                        required: true
                    },
                    {
                        value: data.mobileNoStatus,
                        type: "string",
                        title: __("mobileNoStatus"),
                        required: true
                    },
                    {
                        value: data.userType,
                        type: "string",
                        title: __("userType"),
                        required: true
                    },
                    {
                        value: data.profileImage,
                        type: "string",
                        title: __("profileImage"),
                        required: false
                    },
                    {
                        value: data.services,
                        type: "object",
                        title: __("services"),
                        required: false
                    }, //stringify because of formdata

                    {
                        value: data.documentImage,
                        type: "string",
                        title: __("document"),
                        required: true
                    },
                    {
                        value: data.firebaseToken,
                        type: "string",
                        title: __("firebaseToken"),
                        required: true
                    },
                    {
                        value: data.timezone,
                        type: "string",
                        title: __("timezone"),
                        required: true
                    },
                    {
                        value: data.signUpBy,
                        type: "string",
                        title: __("signUpBy"),
                        required: true
                    },
                    {
                        value: data.deviceType,
                        type: "string",
                        title: __("deviceType"),
                        required: true
                    }
                ];

                if(data.signUpBy == 'manual')
                    params.push({ value: data.password, type: "string", title: __("password"), required: true })
                else if(data.signUpBy == 'google')
                    params.push({ value: data.googleId, type: "string", title: __("googleId"), required: true })
                else if(data.signUpBy == 'facebook')
                    params.push({ value: data.facebookId, type: "string", title: __("facebookId"), required: true })
                else if(data.signUpBy == 'apple')
                    params.push({ value: data.appleId, type: "string", title: __("appleId"), required: true })
                else if(data.signUpBy == 'microsoft')
                    params.push({ value: data.microsoftId, type: "string", title: __("microsoftId"), required: true })

                if (data.userType && data.userType.toLowerCase() == "company") {
                    data.userType = "COMPANY";
                    params.push(
                        {
                            value: data.companyName,
                            type: "string",
                            title: __("companyName"),
                            required: true
                        },
                        {
                            value: data.commercialRegNo,
                            type: "string",
                            title: __("commercialRegNo"),
                            required: true
                        }
                    );
                } else if (
                    data.userType &&
                    data.userType.toLowerCase() == "individual"
                ) {
                    data.userType = "INDIVIDUAL";
                    params.push(
                        {
                            value: data.idNumber,
                            type: "string",
                            title: __("idNumber"),
                            required: true
                        },
                        {
                            value: data.companyId,
                            type: "string",
                            title: __("companyId"),
                            required: false
                        }, //company id
                        {
                            value: data.DOB,
                            type: "string",
                            title: __("birthdate"),
                            required: true
                        },
                        {
                            value: data.gender,
                            type: "string",
                            title: __("gender"),
                            required: false
                        }
                    );
                } else {
                    return res
                        .status(400)
                        .json({
                            status: "failure",
                            statusCode: 400,
                            message: __("INVALID_USER_TYPE")
                        });
                }

                //checking validation
                let checkErr = await validation(params);
                if (!checkErr.status) {
                    return res
                        .status(400)
                        .json({
                            status: "failure",
                            statusCode: 400,
                            message: checkErr.message
                        });
                }

                let userc = null;


                //genereate unique id for every user
                let providerUniqueId = await helper.generateUniqueNumber(data.userType);


                let userData = {
                    uniqueId: providerUniqueId.uniqueId,
                    name: data.name,
                    email: data.email,
                    countryCode: data.countryCode,
                    profileImage: data.profileImage,
                    mobileNumber: data.mobileNumber,
                    DOB: data.DOB,
                    password: data.password,
                    deviceType: data.deviceType,
                    registerFrom: data.registerFrom,

                    signUpBy: data.signUpBy,
                    userType: data.userType,
                    serialNumber: providerUniqueId.serialNumber,
                    firebaseToken: [
                        {
                            token: data.firebaseToken || "dummyToken",
                            deviceType: data.deviceType
                        }
                    ],
                    status: "inactive",
                    accountStatus: "pending",
                    createdAt: new Date()
                };

                if (data.userType == "INDIVIDUAL" && data.gender) {
                    userData.gender = data.gender;
                }

                // In case of social login
                if (
                    data.facebookId ||
                    data.googleId ||
                    data.appleId ||
                    data.microsoftId
                ) {
                    let checkUser = {};
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
                        ];

                        checkUser.userType = {
                            $in: ["COMPANY", "INDIVIDUAL"]
                        };
                        userData.facebookId = data.facebookId;
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
                        ];
                        checkUser.userType = {
                            $in: ["COMPANY", "INDIVIDUAL"]
                        };
                        userData.googleId = data.googleId;
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
                        ];
                        checkUser.userType = {
                            $in: ["COMPANY", "INDIVIDUAL"]
                        };
                        userData.appleId = data.appleId;
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
                        ];
                        checkUser.userType = {
                            $in: ["COMPANY", "INDIVIDUAL"]
                        };
                        userData.microsoftId = data.microsoftId;
                    }

                    userc = await User.findOne(checkUser);

                    if (userc && userc.isBlocked) {
                        return res
                            .status(401)
                            .json({
                                status: "failure",
                                statusCode: 401,
                                isActive: false,
                                message: __("USER_HAS_BEEN_BLOCKED"),
                                data: userc
                            });
                    }

                    if (userc && userc.isDeleted) {
                        return res
                            .status(401)
                            .json({
                                status: "failure",
                                statusCode: 401,
                                isActive: false,
                                message: __("USER_HAS_BEEN_DELETED"),
                                data: userc
                            });
                    }

                    if (userc && userc.accountStatus == "pending") {
                        return res
                            .status(403)
                            .json({
                                status: "failure",
                                statusCode: 403,
                                isActive: false,
                                message: __("YOUR_ACCOUNT_IS_PENDING"),
                                data: userc
                            });
                    }

                    if (userc && userc.status != "active") {
                        return res
                            .status(403)
                            .json({
                                status: "failure",
                                statusCode: 403,
                                isActive: false,
                                message: __("YOUR_ACCOUNT_IS_INACTIVE"),
                                data: userc
                            });
                    }

                    if (userc) {
                        //creating jwt token
                        let token = helper.signToken({ _id: userc._id });
                        return res
                            .status(200)
                            .json({
                                status: "success",
                                statusCode: 200,
                                isActive: true,
                                message: __("USER_EXISTS"),
                                data: userc,
                                token: token
                            });
                    }
                }

                if (data.email) {
                    userc = await User.count({
                        email: data.email,
                        userType: { $in: ["COMPANY", "INDIVIDUAL"] }
                    });
                    if (userc) {
                        return res
                            .status(400)
                            .json({
                                status: "failure",
                                statusCode: 400,
                                message: __("EMAIL_ALREADY_EXIST"),
                                data: ""
                            });
                    }
                }

                if (data.mobileNumber) {
                    userc = await User.count({
                        mobileNumber: data.mobileNumber,
                        countryCode: data.countryCode,
                        userType: { $in: ["COMPANY", "INDIVIDUAL"] }
                    });
                    if (userc) {
                        return res
                            .status(400)
                            .json({
                                status: "failure",
                                statusCode: 400,
                                message: __("MOBILE_NUMBER_ALREADY_EXIST"),
                                data: ""
                            });
                    }
                    userData.mobileNumberStatus = data.mobileNoStatus;
                } else {
                    userData.mobileNumberStatus = "unverified";
                }

                //If User Already Registered
                if (userc) {
                    return res
                        .status(400)
                        .json({
                            status: "failure",
                            statusCode: 400,
                            message: __("USER_EXISTS")
                        });
                }

                if (data.commercialRegNo) {
                    let checkRegNo = await User.count({
                        commercialRegNo: data.commercialRegNo
                    });
                    if (checkRegNo) {
                        return res
                            .status(400)
                            .json({
                                status: "failure",
                                statusCode: 400,
                                message: __("COMMERCIAL_REG_NO_ALREADY_EXIST")
                            });
                    }
                }

                userData.documentImage = data.documentImage;

                if (services.length >= 0) { // NOSONAR
                    userData.services = services;
                }



                //save data according to user type
                if (data.userType.toLowerCase() == "company") {
                    userData.companyName = data.companyName;
                    userData.commercialRegNo = data.commercialRegNo;
                } else if (data.userType.toLowerCase() == "individual") {
                    userData.idNumber = data.idNumber;

                }
                if (data.companyName) {
                    let checkCompany = await User.count({ companyName: new RegExp(`^${data.companyName}$`, 'i') });

                    if (checkCompany > 0) {
                        return res.status(400).json({
                            status: "failure",
                            statusCode: 400,
                            message: __("COMPANY_ALREADY_EXIST")
                        });
                    }
                }


                //Creating Provider if not registered before
                User.addUser(userData, async (err, resp) => { // NOSONAR
                    if (err) {
                        console.log("check err user details e", err);
                        return res
                            .status(400)
                            .json({
                                status: "failure",
                                statusCode: 400,
                                message: __("INTERNAL_DB_ERROR")
                            });
                    } else {
                        if (data.userType.toLowerCase() == "individual" && data.companyId) {
                            let companyData = {
                                individualId: resp._id,
                                companyId: data.companyId,
                                requestStatus: "pending",
                                status: "active",
                                requestedBy: data.userType,
                                isDeleted: false,
                                createdAt: new Date()
                            };

                            CompanyEmployee.addRequest(
                                companyData,
                                function (err, companyResp) { // NOSONAR
                                    if (err) {
                                        User.remove({ _id: resp._id }); //when get any error delete user
                                        console.log(
                                            "check err user details e",
                                            err
                                        );
                                        res.status(400).json({
                                            status: "failure",
                                            statusCode: 400,
                                            message: __("INTERNAL_DB_ERROR")
                                        });
                                        throw new Error(err);
                                    } else {
                                        res.status(200).json({
                                            status: "success",
                                            statusCode: 200,
                                            message: __(
                                                "PROVIDER_REGISTERED_SUCCESSFULLY"
                                            ),
                                            data: resp
                                        });
                                    }
                                }
                            );
                        } else {
                            res.status(200).json({
                                status: "success",
                                statusCode: 200,
                                message: __("PROVIDER_REGISTERED_SUCCESSFULLY"),
                                data: resp
                            });
                        }

                        var userId_in_bytes = utf8.encode(`${resp._id}`);
                        var userId = base64.encode(userId_in_bytes);

                        var userType_in_bytes = utf8.encode(resp.userType);
                        var userType = base64.encode(userType_in_bytes);

                        var email_in_bytes = utf8.encode(resp.email);
                        var email = base64.encode(email_in_bytes);

                        //sending welcome email to provider
                        let hostname = req.headers.host;
                        let logo = "https://" + hostname + "/images/alista-sharp.png";
                        let verifyEmailUrl = "https://" + hostname + "/api/v1/user/verifyEmail/" + userId + "/" + email + "/" + userType;
                        let emailParams = {
                            name: resp.name,
                            app_name: constant.APP_NAME,
                            logo: logo,
                            url: verifyEmailUrl
                        };

                        //sending welcome email
                        ejs.renderFile("views/providerWelcomeEmail.ejs", emailParams).then((templateData) => {
                            let subject = "Welcome to " + constant.APP_NAME;
                            helper.sendEmail({ email: resp.email, subject: subject, templateData: templateData }, function (err, resp) { return }); // NOSONAR
                        }).catch((err) => { //NOSONAR
                            console.log("email error", err);
                            throw new Error(err);
                        });

                    }
                });
            } catch (error) {
                console.log("check", error);
                res.status(500).json({
                    status: "failure",
                    statusCode: 500,
                    message: __("INTERNAL_SERVER_ERROR")
                });
                throw new Error(error);
            }
        });
    },
    providerLogin: async (req, res) => {
        try {
            let data = req.body;
            data.deviceType = req.headers.devicetype;

            let params = [
                {
                    value: data.email,
                    type: "string",
                    title: __("email"),
                    required: true
                },
                {
                    value: data.password,
                    type: "string",
                    title: __("password"),
                    required: true
                },
                {
                    value: data.deviceType,
                    type: "string",
                    title: __("deviceType"),
                    required: true
                },
                {
                    value: data.firebaseToken,
                    type: "string",
                    title: __("firebaseToken"),
                    required: true
                }
            ];

            let checkErr = await validation(params);

            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({
                        status: "failure",
                        statusCode: 400,
                        message: checkErr.message
                    });
            }

            let userDetails = await User.findUserDetails({ email: data.email, userType: { $in: ['COMPANY', 'INDIVIDUAL'] } })
            if (!userDetails) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("USER_NOT_FOUND")
                });
            }

            if (!User.authenticate(data.password, userDetails.hashPassword)) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("INVALID_LOGIN_CREDENTIALS")
                });
            }

            if (userDetails.isBlocked) {
                return res
                    .status(401)
                    .json({
                        status: "failure",
                        statusCode: 401,
                        message: __("USER_HAS_BEEN_BLOCKED"),
                        data: ""
                    });
            }

            if (userDetails.isDeleted) {
                return res
                    .status(401)
                    .json({
                        status: "failure",
                        statusCode: 401,
                        message: __("USER_HAS_BEEN_DELETED"),
                        data: ""
                    });
            }

            if (userDetails.accountStatus == "pending") {
                return res
                    .status(400)
                    .json({
                        status: "failure",
                        statusCode: 400,
                        message: __("YOUR_ACCOUNT_IS_PENDING"),
                        data: ""
                    });
            }

            if (userDetails.status != "active") {
                return res
                    .status(400)
                    .json({
                        status: "failure",
                        statusCode: 400,
                        message: __("YOUR_ACCOUNT_IS_INACTIVE"),
                        data: ""
                    });
            }



            await User.updateFirebaseToken({
                firebaseToken: data.firebaseToken,
                deviceType: data.deviceType,
                id: userDetails._id
            });

            let logedInUser = await User.findUserDetails({ email: data.email, userType: { $in: ['COMPANY', 'INDIVIDUAL'] } })
            //creating jwt token
            let token = helper.signToken(logedInUser);

            return res.status(200).json({
                status: "success",
                statusCode: 200,
                message: __("LOGIN_SUCCESS"),
                data: logedInUser,
                token: token
            });
        } catch (err) {
            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(err);
        }
    },
    getProviderProfile: async (req, res) => {
        try {
            let providerId = req.user._id;

            User.findUserById(providerId, async function (err, resp) {
                if (err) {
                    console.log("err", err);
                    return res
                        .status(400)
                        .json({
                            status: "failure",
                            statusCode: 400,
                            message: __("NO_RECORD_FOUND")
                        });
                } else {
                    // return services and categories
                    let languageCode = req.headers['accept-language']
                    let servicesArr = []

                    if (resp.services.length > 0) {
                        let services = resp.services
                        for (let element of services) {
                            let serviceDetails = await Service.getServiceById(element.serviceId);
                            let categoryDetails = await Category.getCategoryById(element.categoryId);

                            if(serviceDetails || categoryDetails)
                            {
                                let obj = {
                                    "_id": element._id,
                                    "serviceId": element.serviceId,
                                    "categoryId": element.categoryId
                                }
                                if (serviceDetails) {
                                    obj.serviceName = serviceDetails.name[languageCode]
                                }
                                if (categoryDetails) {
                                    obj.categoryName = categoryDetails.name[languageCode]
                                }

                                servicesArr.push(obj)
                            }
                        }
                    }

                    let response = { ...resp._doc, services: servicesArr }
                    return res
                        .status(200)
                        .json({
                            status: "success",
                            statusCode: 200,
                            message: "",
                            data: response
                        });
                }
            });
        } catch (err) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(err);
        }
    },
    getProviderDetails: async (req, res) => {
        try {
            let providerId = req.params.providerId;
            User.findUserById(providerId, function (err, resp) { // NOSONAR
                if (err) {

                    return res
                        .status(400)
                        .json({
                            status: "failure",
                            statusCode: 400,
                            message: __("NO_RECORD_FOUND")
                        });
                } else {
                    return res
                        .status(200)
                        .json({
                            status: "success",
                            statusCode: 200,
                            message: "",
                            data: resp
                        });
                }
            });
        } catch (err) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(err);
        }
    },
    validateParams: async (req, res) => { // NOSONAR
        try {
            let data = req.body;
            let params = [
                {
                    value: data.email,
                    type: "string",
                    title: __("email"),
                    required: false
                },

                {
                    value: data.countryCode,
                    type: "string",
                    title: __("countryCode"),
                    required: false
                },
                {
                    value: data.mobileNumber,
                    type: "string",
                    title: __("mobileNumber"),
                    required: false
                },
                {
                    value: data.companyName,
                    type: "string",
                    title: __("companyName"),
                    required: false
                },
                {
                    value: data.signUpBy,
                    type: "string",
                    title: __("signUpBy"),
                    required: false
                }
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: checkErr.message
                });
            }




            let checkUser = null;
            if (data.signUpBy == "manual") {
                if (data.email) {
                    checkUser = await User.userCheck({
                        email: data.email,
                        userType: { $in: ["COMPANY", "INDIVIDUAL"] }
                    })
                    if (checkUser) {
                        return res.status(400).json({
                            status: "failure",
                            isActive: false,
                            statusCode: 400,
                            message: __("EMAIL_ALREADY_EXIST")
                        });
                    }
                }

                if (data.mobileNumber) {
                    if (!data.countryCode) {
                        return res.status(400).json({
                            status: "failure",
                            isActive: false,
                            statusCode: 400,
                            message: __("COUNTRY_CODE_IS_REQUIRED"),
                        });
                    }

                    checkUser = await User.userCheck2({
                        mobileNumber: data.mobileNumber,
                        countryCode: data.countryCode,
                        userType: { $in: ["COMPANY", "INDIVIDUAL"] },
                    })

                    if (checkUser) {
                        return res.status(400).json({
                            status: "failure",
                            isActive: false,
                            statusCode: 400,
                            message: __("MOBILE_NUMBER_ALREADY_EXIST"),
                        });
                    }
                }

                if (data.companyName) {
                    checkUser = await User.userCheck6({
                        companyName: { $regex: data.companyName.trim(), $options: 'i' },

                        userType: { $in: ["COMPANY"] },
                    })

                    if (checkUser) {
                        return res.status(400).json({
                            status: "failure",
                            isActive: false,
                            statusCode: 400,
                            message: __("COMPANY_ALREADY_EXIST"),
                        });
                    }
                }

            } else {
                if (data.companyName) {
                    checkUser = await User.userCheck3({
                        companyName: { $regex: data.companyName.trim(), $options: 'i' },
                        userType: { $in: ["COMPANY"] },
                    })

                    if (checkUser) {
                        return res.status(400).json({
                            status: "failure",
                            isActive: false,
                            statusCode: 400,
                            message: __("COMPANY_ALREADY_EXIST"),
                        });
                    }
                }

                if (data.email) {
                    checkUser = await User.findIndividual({
                        email: data.email,
                        userType: { $in: ["COMPANY", "INDIVIDUAL"] },
                    });
                    if (checkUser) {
                        if (checkUser.isBlocked) {
                            return res
                                .status(401)
                                .json({
                                    status: "failure",
                                    statusCode: 401,
                                    isActive: false,
                                    message: __("USER_HAS_BEEN_BLOCKED"),
                                    data: checkUser,
                                });
                        }

                        if (checkUser.isDeleted) {
                            return res
                                .status(401)
                                .json({
                                    status: "failure",
                                    statusCode: 401,
                                    isActive: false,
                                    message: __("USER_HAS_BEEN_DELETED"),
                                    data: checkUser,
                                });
                        }

                        if (checkUser.accountStatus == "pending") {
                            return res.status(400).json({
                                status: "failure",
                                statusCode: 400,
                                isActive: false,
                                message: __("YOUR_ACCOUNT_IS_PENDING"),
                                data: checkUser,
                            });
                        }

                        if (checkUser.status != "active") {
                            return res
                                .status(400)
                                .json({
                                    status: "failure",
                                    statusCode: 400,
                                    isActive: false,
                                    message: __("YOUR_ACCOUNT_IS_INACTIVE"),
                                    data: checkUser,
                                });
                        }

                        //creating jwt token
                        let token = helper.signToken({ _id: checkUser._id });
                        return res.status(400).json({
                            status: "failure",
                            statusCode: 400,
                            isActive: true,
                            message: __("EMAIL_ALREADY_EXIST"),
                            data: checkUser,
                            token: token,
                        });
                    }
                }

                if (data.mobileNumber) {
                    if (!data.countryCode) {
                        return res.status(400).json({
                            status: "failure",
                            statusCode: 400,
                            message: __("COUNTRY_CODE_IS_REQUIRED"),
                        });
                    }

                    checkUser = await User.findIndividual({
                        mobileNumber: data.mobileNumber,
                        countryCode: data.countryCode,
                        userType: { $in: ["COMPANY", "INDIVIDUAL"] },
                    });

                    if (checkUser) {
                        if (checkUser.isBlocked) {
                            return res
                                .status(401)
                                .json({
                                    status: "failure",
                                    statusCode: 401,
                                    isActive: false,
                                    message: __("USER_HAS_BEEN_BLOCKED"),
                                    data: checkUser,
                                });
                        }

                        if (checkUser.isDeleted) {
                            return res
                                .status(401)
                                .json({
                                    status: "failure",
                                    statusCode: 401,
                                    isActive: false,
                                    message: __("USER_HAS_BEEN_DELETED"),
                                    data: checkUser,
                                });
                        }

                        if (checkUser.accountStatus == "pending") {
                            return res
                                .status(403)
                                .json({
                                    status: "failure",
                                    statusCode: 403,
                                    isActive: false,
                                    message: __("YOUR_ACCOUNT_IS_PENDING"),
                                    data: checkUser,
                                });
                        }

                        if (checkUser.status != "active") {
                            return res.status(403).json({
                                status: "failure",
                                statusCode: 403,
                                isActive: false,
                                message: __("YOUR_ACCOUNT_IS_INACTIVE"),
                                data: checkUser,
                            });
                        }

                        //creating jwt token
                        let token = helper.signToken({ _id: checkUser._id });
                        return res.status(400).json({
                            status: "failure",
                            statusCode: 400,
                            isActive: true,
                            message: __("MOBILE_NUMBER_ALREADY_EXIST"),
                            data: checkUser,
                            token: token,
                        });
                    }
                }
            }

            if (!data.companyName && !data.email && !data.mobileNumber) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("YOU_HAVE_NOT_PROVIDED_ANY_PARAMS"),
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    isActive: true,
                    statusCode: 200,
                    message: __("VALIDATED"),
                });
            }

        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR"),
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
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: checkErr.message,
                });
            }
            let queryData = {
                userType: { $in: ["COMPANY", "INDIVIDUAL"] }
            }
            if (data.email) {
                queryData.email = data.email
            } else {
                queryData.mobileNumber = data.mobileNumber
            }
            let userDetails = await User.findOne(queryData);

            if (userDetails) {
                let exptime = new Date();
                exptime = moment(exptime).add(10, "m").toDate(); //set otp expiry to next 10 minute

                let OTP = helper.generateOTP();

                data.OTP = OTP;
                data.OTPexp = exptime;
                data.id = userDetails._id;

                await User.updateOTP(data);

                if(data.email)
                {
                    let hostname = req.headers.host;
                    let logo = "https://" + hostname + "/images/alista-sharp.png";
                    let emailParams = {
                        name: userDetails.name,
                        app_name: constant.APP_NAME,
                        OTP: data.OTP,
                        logo: logo,
                    };

                    ejs.renderFile("views/providerResetPassword.ejs", emailParams)
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
                                data: "",
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
                    data: "",
                });
            }
        } catch (err) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR"),
            });
            throw new Error(err);
        }
    },
    resetPassword: async (req, res) => {
        try {
            let data = req.body;
            let params = [
                {
                    value: data.email,
                    type: "string",
                    title: __("email"),
                    required: false,
                }, {
                    value: data.mobileNumber,
                    type: "string",
                    title: __("mobileNumber"),
                    required: false,
                },
                {
                    value: data.countryCode,
                    type: "string",
                    title: __("countryCode"),
                    required: false,
                },
                {
                    value: data.password,
                    type: "string",
                    title: __("password"),
                    required: true,
                },
                {
                    value: data.cnfpassword,
                    type: "string",
                    title: __("cnfpassword"),
                    required: true,
                },
                {
                    value: data.OTP,
                    type: "string",
                    title: __("OTP"),
                    required: true,
                },
                {
                    value: data.type, //email, phone
                    type: "string",
                    title: __("type"),
                    required: true,
                },
            ];

            let checkErr = await validation(params);

            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({
                        status: "failure",
                        statusCode: 400,
                        message: checkErr.message,
                    });
            }

            if (data.password != data.cnfpassword) {
                return res
                    .status(400)
                    .json({
                        status: "failure",
                        statusCode: 400,
                        message: __("PASSWORD_CNFPASSWORD_NOT_MATCH"),
                    });
            }

            let query = {
                userType: { $in: ["COMPANY", "INDIVIDUAL"] },
            }
            if (data.email) {
                query.email = data.email
            } else {
                query.mobileNumber = data.mobileNumber
                query.countryCode = data.countryCode
            }

            let verifyUser = await User.findOne(query).select("_id email OTP OTPexp mobileNumber countryCode");

            if (!verifyUser) {
                return res
                    .status(400)
                    .json({
                        status: "failure",
                        statusCode: 400,
                        message: __("USER_NOT_FOUND"),
                    });
            }
            
            let driverOtp = verifyUser.OTP;
            if (driverOtp != data.OTP) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("INVALID_OTP"),
                });
            }

            let cDate = new Date();
            let exptime = new Date(verifyUser.OTPexp);

            if (cDate.getTime() >= exptime.getTime()) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("OTP_EXPIRED"),
                });
            }

            let updatePasswordData = {
                id: verifyUser._id,
                password: data.password,
                OTP: "",
                OTPexp: "",
            };

            User.updatePassword(updatePasswordData, async function (err, resdata) {
                if (err) {
                    console.log("errr", err);
                    return res.status(400).json({
                        status: "failure",
                        statusCode: 400,
                        message: __("INTERNAL_DB_ERROR"),
                    });
                }

                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: __("PASSWORD_RESET_SUCCESS"),
                    data: resdata
                });
            });

        } catch (err) {

            res.status(400).json({
                status: "failure",
                statusCode: 400,
                message: __("INTERNAL_SERVER_ERROR"),
            });
            throw new Error(err);
        }
    },
    editprofile: async (req, res) => { // NOSONAR
        try {
            let providerId = req.user._id;
            let data = req.body;

            let params = [
                {
                    value: data.name,
                    type: "string",
                    title: __("name"),
                    required: false
                },
                {
                    value: data.countryCode,
                    type: "string",
                    title: __("countryCode"),
                    required: false
                },
                {
                    value: data.mobileNumber,
                    type: "string",
                    title: __("mobileNumber"),
                    required: false
                },
                {
                    value: data.email,
                    type: "string",
                    title: __("email"),
                    required: false
                },
                {
                    value: data.mobileNoStatus,
                    type: "string",
                    title: __("mobileNoStatus"),
                    required: false,
                },
                {
                    value: data.gender,
                    type: "string",
                    title: __("gender"),
                    required: false
                },
                {
                    value: data.DOB,
                    type: "string",
                    title: __("birthdate"),
                    required: false
                },
                {
                    value: data.password,
                    type: "string",
                    title: __("password"),
                    required: false
                },
                {
                    value: data.companyName,
                    type: "string",
                    title: __("companyName"),
                    required: false
                },
                {
                    value: data.commercialField,
                    type: "string",
                    title: __("commercialField"),
                    required: false
                },
                {
                    value: data.commercialRegNo,
                    type: "string",
                    title: __("commercialRegistrationNumber"),
                    required: false
                },
                {
                    value: data.services,
                    type: "object",
                    title: __("serviceId"),
                    required: false
                }
            ];

            let checkErr = await validation(params);

            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({
                        status: "failure",
                        statusCode: 400,
                        message: checkErr.message
                    });
            }
            let obj = {

                _id: providerId
            };

            if (data.name) {
                obj.name = data.name;
            }

            if (data.mobileNumber) {
                if (!data.countryCode) {
                    return res
                        .status(400)
                        .json({
                            status: "failure",
                            statusCode: 400,
                            message: __("COUNTRY_CODE_IS_REQUIRED"),
                            data: ""
                        });
                }

                if (!data.mobileNoStatus) {
                    return res
                        .status(400)
                        .json({
                            status: "failure",
                            statusCode: 400,
                            message: __("MOBILE_NO_STATUS_IS_REQUIRED"),
                            data: ""
                        });
                }

                obj.mobileNumber = data.mobileNumber;
                obj.countryCode = data.countryCode;
                obj.mobileNumberStatus = data.mobileNoStatus;
                let checkUser = await User.findIndividual({
                    _id: { $ne: providerId },
                    mobileNumber: data.mobileNumber,
                    countryCode: data.countryCode,
                    userType: { $in: [req.user.userType] }
                });
                if (checkUser) {
                    return res
                        .status(400)
                        .json({
                            status: "failure",
                            statusCode: 400,
                            message: __("MOBILE_NUMBER_ALREADY_EXIST"),
                            data: ""
                        });
                }
            }

            if (data.email) {
                let checkUser = await User.findIndividual({
                    _id: { $ne: providerId },
                    email: data.email,
                    userType: { $in: [req.user.userType] }
                });
                if (checkUser) {
                    return res
                        .status(400)
                        .json({
                            status: "failure",
                            statusCode: 400,
                            message: __("EMAIL_ALREADY_EXIST"),
                            data: ""
                        });
                }
                obj.email = data.email;
            }

            if (data.gender) {
                obj.gender = data.gender;
            }

            if (data.password) {
                obj.password = data.password;
            }

            if (data.DOB) {
                obj.DOB = data.DOB;
            }
            if (data.commercialField) {
                obj.commercialField = data.commercialField;
            }
            if (data.companyName) {
                obj.companyName = data.companyName;
            }
            if (data.commercialRegNo) {
                obj.commercialRegNo = data.commercialRegNo;
            }

            if (data.services && data.services.length >= 0) { // NOSONAR
                obj.services = data.services;
            }

            //check company already exist or not
            if (data.companyName) {
                let checkCompany = await User.countUser({ _id: { $ne: providerId }, companyName: { $regex: data.companyName.trim(), $options: 'i' } });
                if (checkCompany > 0) {
                    return res.status(400).json({
                        status: "failure",
                        statusCode: 400,
                        message: __("COMPANY_ALREADY_EXIST")
                    });
                }
            }


            User.updateUserById(obj, function (err, resp) {
                if (err) {
                    console.log("err", err);
                    res.status(400).json({
                        status: "failure",
                        statusCode: 400,
                        message: __("INTERNAL_DB_ERROR")
                    });
                    throw new Error(err);
                } else {
                    return res
                        .status(200)
                        .json({
                            status: "success",
                            statusCode: 200,
                            data: resp,
                            message: __("RECORD_UPDATED")
                        });
                }
            });
        } catch (err) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(err);
        }
    },
    updateProfileImage: (req, res) => {
        singleImageUpload(req, res, async function (err, resp) {
            try {
                let data = req.body;
                let file = req.file;

                if (file) {
                    if (err) {

                        return res
                            .status(400)
                            .json({
                                status: "failure",
                                statusCode: 400,
                                message: __("IMAGE_UPLOAD_ERROR")
                            });
                    }
                    data.profileImage = req.file.location;
                }



                let params = [
                    {
                        value: data.profileImage,
                        type: "string",
                        title: __("Image"),
                        required: true,
                    }
                ];

                let checkErr = await validation(params);


                if (!checkErr.status) {
                    return res
                        .status(400)
                        .json({
                            status: "failure",
                            statusCode: 400,
                            message: checkErr.message
                        });
                }

                let userData = {
                    profileImage: data.profileImage,
                    _id: req.user._id
                };

                let oldImage = req.user.profileImage;

                User.updateUserById(userData, async (err, user) => { // NOSONAR
                    if (err) {
                        console.log("check err user details e", err);
                        return res
                            .status(400)
                            .json({
                                status: "failure",
                                statusCode: 400,
                                message: __("INTERNAL_DB_ERROR")
                            });
                    } else {
                        deleteImage(oldImage);
                        return res
                            .status(200)
                            .json({
                                status: "success",
                                statusCode: 200,
                                message: __(
                                    "PROFILE_IMAGE_UPDATED_SUCCESSFULLY"
                                ),
                                data: user
                            });
                    }
                });
            } catch (error) {

                res.status(500).json({
                    status: "failure",
                    statusCode: 500,
                    message: __("INTERNAL_SERVER_ERROR")
                });
                throw new Error(error);
            }
        });
    },
    logout: async (req, res) => {
        let data = req.body;
        data.deviceType = req.headers.devicetype;
        let params = [
            {
                value: data.deviceType,
                type: "string",
                title: __("deviceType"),
                required: true
            },
            {
                value: data.firebaseToken,
                type: "string",
                title: __("firebaseToken"),
                required: true
            },
            {
                value: data.firebaseUid,
                type: "string",
                title: __("firebaseUid"),
                required: false
            }
        ];

        let checkErr = await validation(params);

        if (!checkErr.status) {
            return res
                .status(400)
                .json({
                    status: "failure",
                    statusCode: 400,
                    message: checkErr.message
                });
        }

        //remove firebase token on logout
        let logoutData = {
            userId: req.user._id,
            firebaseToken: data.firebaseToken,
            deviceType: data.deviceType
        };

        User.logout(logoutData,async function (err, resp) {
            if (err) {

                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    data: "",
                    message: __("INTERNAL_DB_ERROR")
                });
            } else {
                if(data.firebaseUid)
                    await firebaseAdmin.auth().revokeRefreshTokens(req.body.firebaseUid);

                return res.status(200).json({
                    status: "success",
                    statusCode: 400,
                    data: "",
                    message: __("LOGOUT_SUCCESSFULLY")
                });
            }
        });
    },
    getActiveCountries: async (req, res) => {
        try {
            let data = {};
            let languageCode = req.languageCode;

            let params = [
                {
                    value: languageCode,
                    type: "string",
                    title: __("language"),
                    required: true,
                },
            ];

            let checkErr = await validation(params);


            data.languageCode = languageCode || "en";

            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({
                        status: "failure",
                        statusCode: 400,
                        message: checkErr.message,
                    });
            }

            let countryLists = await Country.getActiveCountriesByLanguage({
                languageCode: data.languageCode,
            });
            if (countryLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: "",
                    data: countryLists,
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: __("NO_RECORD_FOUND"),
                    data: countryLists,
                });
            }
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR"),
            });
            throw new Error(error);
        }
    },
    getActiveGovernates: async (req, res) => {
        try {
            let data = {};
            let languageCode = req.languageCode;
            let countryId = req.params.countryId;

            let params = [
                {
                    value: languageCode,
                    type: "string",
                    title: __("language"),
                    required: true,
                },
                {
                    value: countryId,
                    type: "string",
                    title: __("countryId"),
                    required: true,
                },
            ];

            let checkErr = await validation(params);


            data.languageCode = languageCode || "en";

            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({
                        status: "failure",
                        statusCode: 400,
                        message: checkErr.message,
                    });
            }

            let governateLists = await Governate.getActiveGovernateByLanguage({
                languageCode: data.languageCode,
                countryId: countryId,
            });
            if (governateLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: "",
                    data: governateLists,
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: __("NO_RECORD_FOUND"),
                    data: governateLists,
                });
            }
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR"),
            });
            throw new Error(error);
        }
    },
    getActiveDistricts: async (req, res) => {
        try {
            let data = {};
            let languageCode = req.languageCode;
            let cityId = req.params.cityId;

            let params = [
                {
                    value: languageCode,
                    type: "string",
                    title: __("language"),
                    required: true,
                },
                {
                    value: cityId,
                    type: "string",
                    title: __("cityId"),
                    required: true,
                },
            ];

            let checkErr = await validation(params);


            data.languageCode = languageCode || "en";

            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({
                        status: "failure",
                        statusCode: 400,
                        message: checkErr.message,
                    });
            }

            let districtsLists = await District.getActiveDistrictsByLanguage({
                languageCode: data.languageCode,
                cityId: cityId,
            });
            if (districtsLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: "",
                    data: districtsLists,
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: __("NO_RECORD_FOUND"),
                    data: districtsLists,
                });
            }
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR"),
            });
            throw new Error(error);
        }
    },
    getActiveCities: async (req, res) => {
        try {
            let data = {};
            let languageCode = req.languageCode;
            let governateId = req.params.governateId;

            let params = [
                {
                    value: languageCode,
                    type: "string",
                    title: __("language"),
                    required: true,
                },
                {
                    value: governateId,
                    type: "string",
                    title: __("governateId"),
                    required: true,
                },
            ];

            let checkErr = await validation(params);


            data.languageCode = languageCode || "en";

            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({
                        status: "failure",
                        statusCode: 400,
                        message: checkErr.message,
                    });
            }

            let citiesLists = await City.getActiveCitiesByLanguage({
                languageCode: data.languageCode,
                governateId: governateId,
            });
            if (citiesLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: "",
                    data: citiesLists,
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: __("NO_RECORD_FOUND"),
                    data: citiesLists,
                });
            }
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR"),
            });
            throw new Error(error);
        }
    },
    listservice: async (req, res) => {
        try {
            let data = req.body;
            let params = [

                {
                    value: data.categoryId,
                    type: "object",
                    title: __("categoryId"),
                    required: false,
                },
                {
                    value: data.category,
                    type: "string",
                    title: __("category"),
                    required: false,
                },
                {
                    value: data.service,
                    type: "string",
                    title: __("service"),
                    required: false,
                },
                {
                    value: data.page,
                    type: "number",
                    title: __("page"),
                    required: false,
                },
                {
                    value: data.limit,
                    type: "number",
                    title: __("limit"),
                    required: false,
                },
                {
                    value: data.sortField,
                    type: "string",
                    title: __("sortField"),
                    required: false,
                },
                {
                    value: data.sortOrder,
                    type: "number",
                    title: __("sortOrder"),
                    required: false,
                },
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({
                        status: "failure",
                        statusCode: 400,
                        message: checkErr.message,
                    });
            }

            const languageCode = `name.${req.languageCode}`;

            if (data.category) {
                const category_criteria = {
                    [languageCode]: data.category,
                };
                data.category_criteria = category_criteria;
            }
            const service_criteria = {
                status: "active",
            };

            if (data.categoryId.length > 0) {
                let categoryIds = data.categoryId.map(function (el) {
                    return mongoose.Types.ObjectId(el);
                });
                service_criteria.categoryId = {
                    $in: categoryIds,
                };
            }

            if (data.service) {
                service_criteria[languageCode] = {
                    $regex: data.service,
                    $options: "i",
                };
            }

            data.service_criteria = service_criteria;

            data.language = req.languageCode;

            let servicesList = await Service.getActiveServicesWithFilter(data);

            if (servicesList.data.length === 0) {

                return res
                    .status(400)
                    .json({
                        status: "failure",
                        statusCode: 400,
                        message: __("NO_RECORD_FOUND"),
                    });
            }
            return res.status(200).json({
                status: "success",
                statusCode: 200,
                message: "",
                data: servicesList.data,
                totalCount: servicesList.totalCount,
            });
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR"),
            });
            throw new Error(error);
        }
    },
    getCategories: async (req, res) => {
        try {
            let data = req.body;
            let params = [

                {
                    value: data.category,
                    type: "string",
                    title: __("category"),
                    required: false,
                },
                {
                    value: data.page,
                    type: "number",
                    title: __("page"),
                    required: false,
                },
                {
                    value: data.limit,
                    type: "number",
                    title: __("limit"),
                    required: false,
                },
                {
                    value: data.sortField,
                    type: "string",
                    title: __("sortField"),
                    required: false,
                },
                {
                    value: data.sortOrder,
                    type: "number",
                    title: __("sortOrder"),
                    required: false,
                },
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({
                        status: "failure",
                        statusCode: 400,
                        message: checkErr.message,
                    });
            }

            const languageCode = `name.${req.languageCode}`;
            data.language = req.languageCode;

            let category_criteria = {
                status: "active",
            };

            if (data.category) {
                category_criteria[languageCode] = data.category;
            }

            data.category_criteria = category_criteria;

            let categoryList = await Category.getCategoriesWithFilter(data);

            if (categoryList.data.length === 0) {

                return res
                    .status(400)
                    .json({
                        status: "failure",
                        statusCode: 400,
                        message: __("NO_RECORD_FOUND"),
                    });
            }
            return res.status(200).json({
                status: "success",
                statusCode: 200,
                message: "",
                data: categoryList.data,
                totalCount: categoryList.totalCount,
            });
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR"),
            });
            throw new Error(error);
        }
    },
    deleteDocument: async (req, res) => {
        try {
            let providerId = req.user._id;
            let data = req.body;
            data.id = providerId;
            let params = [
                {
                    value: data.url,
                    type: "string",
                    title: __("Document"),
                    required: true,
                },
            ];
            let checkErr = await validation(params);

            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({
                        status: "failure",
                        statusCode: 400,
                        message: checkErr.message,
                    });
            }

            let dbDelete = await User.deleteUserImage(data);

            if (!dbDelete.n) {
                return res
                    .status(400)
                    .json({
                        status: "failure",
                        statusCode: 400,
                        message: __("PROFILE_IMAGE_NOT_DELETED"),
                    });
            }
            deleteImage(data.url);
            return res
                .status(200)
                .json({
                    status: "success",
                    statusCode: 200,
                    message: __("PROFILE_IMAGE_DELETED_SUCCESSFULLY"),
                });
        } catch (err) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR"),
            });
            throw new Error(error);
        }
    },
    changePassword: async (req, res) => {
        try {
            let providerId = req.user._id;
            let data = req.body;
            let params = [
                {
                    value: data.oldPassword,
                    type: "string",
                    title: __("oldPassword"),
                    required: true,
                },
                {
                    value: data.newPassword,
                    type: "string",
                    title: __("newPassword"),
                    required: true,
                },
                {
                    value: data.cnfpassword,
                    type: "string",
                    title: __("cnfpassword"),
                    required: true,
                },
            ];
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({
                        status: "failure",
                        statusCode: 400,
                        message: checkErr.message,
                    });
            }
            if (data.newPassword != data.cnfpassword) {
                return res
                    .status(400)
                    .json({
                        status: "failure",
                        statusCode: 400,
                        message: __("PASSWORD_CNFPASSWORD_NOT_MATCH"),
                    });
            }

            let userDetails = await User.findUser(providerId);

            if (!userDetails) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("USER_NOT_FOUND"),
                });
            }

            if (
                !User.authenticate(data.oldPassword, userDetails.hashPassword)
            ) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("INVALID_OLD_PASSWORD"),
                });
            }
            let updatePasswordData = {
                id: providerId,
                password: data.newPassword,
            };

            User.updatePassword(
                updatePasswordData,
                async function (err, resdata) {
                    if (err) {

                        return res
                            .status(400)
                            .json({
                                status: "failure",
                                statusCode: 400,
                                message: __("INTERNAL_DB_ERROR"),
                            });
                    }
                    return res
                        .status(200)
                        .json({
                            status: "success",
                            statusCode: 200,
                            message: __("PASSWORD_RESET_SUCCESS"),
                        });
                }
            );
        } catch (err) {

            res.status(400).json({
                status: "failure",
                statusCode: 400,
                message: __("INTERNAL_SERVER_ERROR"),
            });
            throw new Error(err);
        }
    },
    getMyServices: async (req, res) => {
        try {
            let data = req.body;

            data.language = req.languageCode;
            data.userId = req.user._id;

            let servicesList = await User.getProviderServices(data);

            if (servicesList.data.length <= 0) {
                return res
                    .status(400)
                    .json({
                        status: "failure",
                        statusCode: 400,
                        message: __("NO_RECORD_FOUND"),
                    });
            }

            return res.status(200).json({
                status: "success",
                statusCode: 200,
                message: "",
                data: servicesList.data,
            });
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR"),
            });
            throw new Error(error);
        }
    },
    getMyServicesByCategory: async (req, res) => {
        try {
            let data = req.body;
            let params = [
                {
                    value: data.categoryId,
                    type: "string",
                    title: __("categoryId"),
                    required: false,
                },
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({
                        status: "failure",
                        statusCode: 400,
                        message: checkErr.message,
                    });
            }

            data.language = req.languageCode;
            data.userId = req.user._id;

            let servicesList = await User.getProviderServicesWithFilter(data);

            if (servicesList.data.length <= 0) {
                return res
                    .status(400)
                    .json({
                        status: "failure",
                        statusCode: 400,
                        message: __("NO_RECORD_FOUND"),
                    });
            }

            return res.status(200).json({
                status: "success",
                statusCode: 200,
                message: "",
                data: servicesList.data,
            });
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR"),
            });
            throw new Error(error);
        }
    },

    // Timeslot
    timeslotByServiceProvider: async (req, res) => {
        try {
            let data = req.params;
            let timeslots = await TimeSlot.findByServiceProvider(data.serviceProviderId);
            if (!timeslots) {
                return res.status(400).json({
                    status: "failure",
                    message: "Not found",
                    data: ""
                });
            }
            return res.status(200).json({
                status: "success",
                message: "",
                data: timeslots
            });
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }
    },
    addTimeslotToProvider: async (req, res) => {
        try {
            let providerId = req.params?.serviceProviderId
            let data = req.body;

            let timeslots = await User.timeslotToProvider(providerId, data);
            if (!timeslots) {
                return res.status(400).json({
                    status: "failure",
                    message: "Not found",
                    data: ""
                });
            }
            return res.status(200).json({
                status: "success",
                message: "",
                data: timeslots
            });
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }
    }
}
