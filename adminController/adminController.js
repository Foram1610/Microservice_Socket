
const mongoose = require('mongoose');
const User = require('../models/userSchema');
const validation = require('../helper/validator.js');
const helper = require('../helper/helper');
const { __ } = require('i18n');
const ejs = require('ejs');
const crypto = require('crypto');

module.exports = {
    addAdmin: async (req, res) => {
        try {
            let data = req.body;
            let params = [
                { value: data.name, type: "string", title: __('name'), required: true },
                { value: data.countryCode, type: "string", title: __("countryCode"), required: true },
                { value: data.mobileNumber, type: "string", title: __("mobileNumber"), required: true },
                { value: data.email, type: "string", title: __('email'), required: true },
                { value: data.password, type: "string", title: __("password"), required: true }

            ]

            let checkErr = await validation(params);

            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message })
            }

            let userc = null;
            if (data.email) {
                userc = await User.countUser({ email: data.email });

                if (userc) {
                    return res.status(400).json({ status: "failure", message: __("EMAIL_ALREADY_EXIST") })
                }
            }

            if (data.mobileNumber) {
                userc = await User.countUser({ mobileNumber: data.mobileNumber });
                if (userc) {
                    return res.status(400).json({ status: "failure", message: __("MOBILE_NUMBER_ALREADY_EXIST") })
                }
            }

            //genereate unique id for every user
            let customerUniqueId = await helper.generateUniqueNumber('ADMIN');

            let userData = {
                uniqueId: customerUniqueId.uniqueId,
                name: data.name,
                countryCode: data.countryCode,
                mobileNumber: data.mobileNumber,
                email: data.email,
                password: data.password,
                userType: "SUPERADMIN",
                status: "active",
                accountStatus: "approved",
                serialNumber: customerUniqueId.serialNumber
            }

            //Creating User if not registered before
            User.addAdmin(userData, async (err, user) => {
                if (err) {
                    console.log("check err user details e", err);
                    return res.status(400).json({ status: "failure", message: __("INTERNAL_DB_ERROR") })
                } else {
                    return res.status(200).json({ status: "success", message: __("USER_REGISTERED_SUCCESSFULLY"), data: user })
                }
            });
        } catch (error) {
            console.log("check reporpr", error);
            res.status(500).json({ status: "success", message: __("INTERNAL_SERVER_ERROR") })
            throw new Error(error)
        }
    },

    swaggerLogin: async (req, res) => {
        try {
            let data = req.body;
            let userDetails = await User.findSwaggerUser(data.email)
            console.log("USER_NOT_FOUND")
            if (!userDetails) {
                return res.status(400).json({
                    status: "failure",
                    message: __("USER_NOT_FOUND")
                })
            }

            if (!User.authenticate(data.password, userDetails.hashPassword)) {
                console.log("INVALID_LOGIN_CREDENTIALS")
                return res.status(400).json({
                    status: "failure",
                    message: __("INVALID_LOGIN_CREDENTIALS")
                })
            }

            if (userDetails) {
                console.log("Redirect!!")
                req.session.loggedin = true;
                res.redirect("/api-docs")
            }
        } catch (err) {
            res.status(500).json({
                status: "success",
                message: __("INTERNAL_SERVER_ERROR")
            })
            throw new Error(err)
        }
    },

    adminLogin: async (req, res) => {
        try {
            let data = req.body;
            let params = [
                { value: data.email, type: "string", title: __('email'), required: true },
                { value: data.password, type: "string", title: __("password"), required: true }
            ]

            let checkErr = await validation(params);

            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message })
            }

            let userDetails = await User.findLoggedInUser({ email: data.email })

            if (!userDetails) {
                return res.status(400).json({
                    status: "failure",
                    message: __("USER_NOT_FOUND")
                })
            }

            const checkPassword = await User.authenticate(data.password, userDetails.hashPassword)
            if (!checkPassword) {
                return res.status(400).json({
                    status: "failure",
                    message: __("INVALID_LOGIN_CREDENTIALS")
                })
            }

            //creating jwt token
            let token = helper.signToken(userDetails);
            return res.status(200).json({
                status: "success",
                message: __("LOGIN_SUCCESS"),
                data: userDetails,
                token: token
            })
        } catch (err) {

            res.status(200).json({
                status: "success",
                message: __("INTERNAL_SERVER_ERROR")
            })
            throw new Error(err)
        }
    },
    adminSocialLogin: async (req, res) => {
        try {
            let data = req.body;
            return res.status(200).json({ status: "success", data: data })
        } catch (err) {
            res.status(200).json({
                status: "success",
                message: __("INTERNAL_SERVER_ERROR")
            })
            throw new Error(err)
        }
    },
    editProfile: async (req, res) => {
        try {
            let data = req.body;

            let userId = req.user._id
            let params = [
                { value: data.email, type: "string", title: __('email'), required: true },
                { value: data.password, type: "string", title: __("password"), required: true }
            ]

            let checkErr = await validation(params);

            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message })
            }

            let userc = await User.countUser({ _id: { $ne: userId }, email: data.email });
            if (userc) {
                return res.status(400).json({ status: "failure", message: __("EMAIL_ALREADY_EXIST") })
            }

            userc = await User.findOne({ _id: userId }).select('_id email hashPassword');
            if (!User.authenticate(data.password, userc.hashPassword)) {
                return res.status(400).json({
                    status: "failure",
                    message: __("PASSWORD_DOES_NOT_MATCHED")
                })
            }

            let userData = {
                email: data.email,
                userId: userId
            }

            User.editAdmin(userData, async (err, user) => {
                if (err) {

                    return res.status(400).json({ status: "failure", message: __("INTERNAL_DB_ERROR") })
                } else {
                    return res.status(200).json({ status: "success", message: __("RECORD_UPDATED_SUCCESSFULLY"), data: user })
                }
            });
        } catch (error) {

            return res.status(500).json({ status: "success", message: __("INTERNAL_SERVER_ERROR") })
        }
    },
    changePassword: async (req, res) => {
        try {
            let data = req.body;

            let userId = req.user._id
            let params = [
                { value: data.oldPassword, type: "string", title: __('oldPassword'), required: true },
                { value: data.password, type: "string", title: __("password"), required: true }
            ]

            let checkErr = await validation(params);

            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message })
            }

            let userc = await User.findOne({ _id: userId }).select('_id email hashPassword'); // NOSONER
            console.log("Password Data ==>", userc)

            if (!User.authenticate(data.oldPassword, userc.hashPassword)) {
                return res.status(400).json({
                    status: "failure",
                    message: __("PASSWORD_DOES_NOT_MATCHED")
                })
            }

            let userData = {
                password: data.password,
                id: userId
            }

            User.updatePassword(userData, async (err, user) => {
                if (err) {
                    return res.status(400).json({ status: "failure", message: __("INTERNAL_DB_ERROR") })
                } else {
                    return res.status(200).json({ status: "success", message: __("PASSWORD_UPDATED_SUCCESSFULLY"), data: "" })
                }
            });
        } catch (error) {

            return res.status(500).json({ status: "success", message: __("INTERNAL_SERVER_ERROR") })
        }
    },
    adminLogout: async (req, res) => {
        req.logout();
        // req.session.destroy()

        return res.send({
            status: "success",
            data: "",
            message: ""
        })
    },
    resetPassword: async (req, res) => {

        try {
            let data = req.body;

            let params = [
                { value: data.email, type: "string", title: __("email"), required: true },
            ]

            let checkErr = await validation(params);

            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message })
            }

            let verifyUser = await User.findAdminUser({ email: data.email })

            if (!verifyUser) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: "No SuperAdmin Found" });
            }

            let generatedPassword = crypto.randomBytes(8).toString('hex');

            await User.updateAdminPassword({ id: verifyUser._id, password: generatedPassword }, async (err, user) => {
                if (err) {

                    return res.status(400).json({ status: "failure", statusCode: 400, message: __("INTERNAL_DB_ERROR") })
                }
            });

            let emailParams = {
                name: verifyUser.name,
                OTP: generatedPassword,
                app_name: 'alista',
                logo: "https://" + 'devapialista.skillroots.com' + '/images/alista-sharp.png',
                googleplay_logo: "https://" + 'devapialista.skillroots.com' + '/images/googleplay.png',
                appstore_logo: "https://" + 'devapialista.skillroots.com' + '/images/appstore.png',

            }
            ejs.renderFile('views/adminforgotPassword.ejs', emailParams).then(templateData => {
                let subject = 'Reset Password';
                helper.sendEmail({ email: verifyUser.email, subject: subject, templateData: templateData }, function (err, resppp) { }); // NOSONAR
            }).catch(err => { // NOSONAR
                console.log('email error', err)
            })
            return res.status(200).json({ status: "success", statusCode: 200, message: __('PASSWORD_SENT_SUCCESSFULLY') });
        } catch (err) {

            res.status(400).json({ status: "failure", statusCode: 400, message: __('INTERNAL_SERVER_ERROR') });
            throw new Error(err)
        }
    },
    getAdmins: async (req, res) => {
        try {
            let query = {

                userType: {
                    $in: ["ADMIN", "SUBADMIN", "SUPERADMIN"]
                }
            }
            let user = await User.findAdmins(query)
            if (!user) {
                return res.status(400).send({
                    status: "failure",
                    message: __("USER_NOT_FOUND"),
                    data: ""
                })
            }

            res.status(200).json({
                status: "success",
                message: __(""),
                data: user
            });
        } catch (error) {

            res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error)
        }
    }
}
