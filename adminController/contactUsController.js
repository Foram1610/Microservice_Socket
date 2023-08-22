 
const mongoose = require("mongoose");
const ContactUs = require('../models/contactUsSchema');
const Language = require('../models/languageSchema');
const validation = require("../helper/validator.js");
const User = require('../models/userSchema');
const { __ } = require("i18n");
const helper = require('../helper/helper');
const ejs = require('ejs');
module.exports = {
    getContactUsByFilter: async (req, res) => {
        try {
            let data = req.body;

            let params = [

                { value: data.name, type: "string", title: __("name"), required: false },
                { value: data.page, type: "number", title: __("page"), required: true },
                { value: data.limit, type: "number", title: __("limit"), required: true },
                { value: data.sortField, type: "string", title: __("sortField"), required: true },
                { value: data.sortOrder, type: "number", title: __("sortOrder"), required: true }
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            if (data.user) {
                const user_criteria = {
                };
                user_criteria.$or = [
                    {
                        "name": { $regex: data.user.trim(), $options: 'i' }
                    },
                    {
                        "userType": { $regex: data.user.trim(), $options: 'i' }
                    },
                    {
                        "subject": { $regex: data.user.trim(), $options: 'i' }
                    },
                    {
                        "comments": { $regex: data.user.trim(), $options: 'i' }
                    },
                    {
                        "email": { $regex: data.user.trim(), $options: 'i' }
                    }
                ]
                data.user_criteria = user_criteria;
            }

            const contactUsLists = await ContactUs.filterContactUs(data);
            if (contactUsLists.data.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: contactUsLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: contactUsLists
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getContactUsContactedByFilter: async (req, res) => {
        try {
            let data = req.body;

            let params = [

                { value: data.name, type: "string", title: __("name"), required: false },
                { value: data.page, type: "number", title: __("page"), required: true },
                { value: data.limit, type: "number", title: __("limit"), required: true },
                { value: data.sortField, type: "string", title: __("sortField"), required: true },
                { value: data.sortOrder, type: "number", title: __("sortOrder"), required: true }
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            if (data.user) {
                const user_criteria = {};
                user_criteria.$or = [
                    {
                        "name": { $regex: data.user.trim(), $options: 'i' }
                    },
                    {
                        "companyName": { $regex: data.user.trim(), $options: 'i' }
                    },
                    {
                        "comments": { $regex: data.user.trim(), $options: 'i' }
                    },
                    {
                        "email": { $regex: data.user.trim(), $options: 'i' }
                    },
                    {
                        "subject": { $regex: data.user.trim(), $options: 'i' }
                    },
                    {
                        "userType": { $regex: data.user.trim(), $options: 'i' }
                    }
                ]
                data.user_criteria = user_criteria;
            }

            const contactUsLists = await ContactUs.filterContactUsContacted(data);
            if (contactUsLists.data.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: contactUsLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: contactUsLists
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    queryDetails: async (req, res) => {
        try {
            let queryId = req.params.queryId;

            let data = await ContactUs.getQueryByid(queryId)

            return res.status(200).json({
                status: "success",
                message: "",
                data: data
            });

        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }

    },
    replyToQuery: async (req, res) => {

        try {
            let data = req.body;
            let adminId = req.user._id;

            let params = [
                { value: data.queryId, type: "string", title: "queryId", required: true },
                { value: data.reply, type: "string", title: "string", required: true },

            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            let query = await ContactUs.getQueryByidOnly(data.queryId);
            if (!query) {
                return res.status(400).json({
                    status: "failure",
                    message: "query not found",
                });
            }

            //CHECK IF QUERY HAS EMAIL 

            let userEmail = "";
            if (query.email) {
                userEmail = query.email;
            } else {
                let userId = query.userId;

                User.findUserById(userId, (err, resdata) => {
                    if (err) {
                        return res.status(500).json({
                            status: "failure",
                            message: __("INTERNAL_SERVER_ERROR")
                        });
                    } else {
                        userEmail = resdata.email;
                    }
                });
            }

            let replyData = {
                id: data.queryId,
                adminId: adminId,
                userEmail: userEmail,
            };

            let admin = {}
            await User.findUserById(adminId, (err, resdata) => {
                if (err) {
                    return res.status(500).json({
                        status: "failure",
                        message: __("INTERNAL_SERVER_ERROR")
                    });
                } else {
                    admin = resdata;

                }
            });

            let contactUs = await ContactUs.changeQueryStatus(replyData);
            if (!contactUs) {
                return res.status(400).json({
                    status: "failure",
                    message: "no query found",
                    contactUs: contactUs
                });
            } else {
                let emailParams = {
                    name: query.name,
                    html: data.reply,
                    admin: admin.name,
                    logo: "https://" + 'devapialista.skillroots.com' + '/images/alista-sharp.png',
                    googleplay_logo: "https://" + 'devapialista.skillroots.com' + '/images/googleplay.png',
                    appstore_logo: "https://" + 'devapialista.skillroots.com' + '/images/appstore.png',
                }
                ejs.renderFile('views/replyTocustomerQuery.ejs', emailParams).then(templateData => {
                    let subject = 'Answer to your Query';
                    helper.sendEmail({ email: userEmail, subject: subject, templateData: templateData }, function (err, resppp) { }); // NOSONAR
                }).catch(err => { // NOSONAR
                    console.log('email error', err)
                })
                return res.status(200).json({
                    status: "success",
                    message: __("STATUS_CHANGED_SUCCESSFULLY"),
                    contactUs: contactUs
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }

    }
};
