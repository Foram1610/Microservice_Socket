 
const { __ } = require('i18n');
const mongoose = require('mongoose');
const Pages = require('../models/contentSchema')
const validation = require('../helper/validator.js');
const ContactUs = require('../models/contactUsSchema');
const ejs = require('ejs');

module.exports = {

    getAboutUsContent: async (req, res) => {

        let languageCode = req.get('accept-language');
        let contentData = null;

        if (languageCode == undefined || languageCode == '') {
            languageCode = 'en';
            contentData = await Pages.getContentData({
                name: "ABOUT_US",
                languageCode: languageCode
            });
        } else {
            contentData = await Pages.getContentData({
                name: "ABOUT_US",
                languageCode: languageCode
            });

            if (contentData == null) {
                contentData = await Pages.getContentData({
                    name: "ABOUT_US",
                    languageCode: 'en'
                });
            }
        }

        if (contentData == null) {
            res.render('aboutus', {
                title: '',
                data: 'No Content Added'
            });
        } else {
            res.render('aboutus', {
                title: '',
                data: contentData.content
            });
        }
    },

    getPrivacyPolicyContent: async (req, res) => {
        let languageCode = req.get('accept-language');
        let contentData = null;

        if (languageCode == undefined || languageCode == '') {
            languageCode = 'en';
            contentData = await Pages.getContentData({
                name: "PRIVACY_POLICY",
                languageCode: languageCode
            });
        } else {
            contentData = await Pages.getContentData({
                name: "PRIVACY_POLICY",
                languageCode: languageCode
            });

            if (contentData == null) {
                contentData = await Pages.getContentData({
                    name: "PRIVACY_POLICY",
                    languageCode: 'en'
                });
            }
        }

        if (contentData == null) {
            res.render('privacyPolicy', {
                title: '',
                data: 'No Content Added'
            });
        } else {
            res.render('privacyPolicy', {
                title: '',
                data: contentData.content
            });
        }
    },

    getRefundPolicyContent: async (req, res) => {
        let languageCode = req.get('accept-language');
        let contentData = null;

        if (languageCode == undefined || languageCode == '') {
            languageCode = 'en';
            contentData = await Pages.getContentData({
                name: "REFUND_POLICY",
                languageCode: languageCode
            });
        } else {
            contentData = await Pages.getContentData({
                name: "REFUND_POLICY",
                languageCode: languageCode
            });

            if (contentData == null) {
                contentData = await Pages.getContentData({
                    name: "REFUND_POLICY",
                    languageCode: 'en'
                });
            }
        }

        if (contentData == null) {
            res.render('refundPolicy', {
                title: '',
                data: 'No Content Added'
            });
        } else {
            res.render('refundPolicy', {
                title: '',
                data: contentData.content
            });
        }
    },

    getTermsAndConditionsContent: async (req, res) => {
        let languageCode = req.get('accept-language');
        let contentData = null;

        if (languageCode == undefined || languageCode == '') {
            languageCode = 'en';
            contentData = await Pages.getContentData({
                name: "TERMS_CONDITIONS",
                languageCode: languageCode
            });
        } else {
            contentData = await Pages.getContentData({
                name: "TERMS_CONDITIONS",
                languageCode: languageCode
            });

            if (contentData == null) {
                contentData = await Pages.getContentData({
                    name: "TERMS_CONDITIONS",
                    languageCode: 'en'
                });
            }
        }

        if (contentData == null) {
            res.render('tac', {
                title: '',
                data: 'No Content Added'
            });
        } else {
            res.render('tac', {
                title: '',
                data: contentData.content
            });
        }
    },
    providerContactUs: async (req, res) => {
        try {
            let data = req.body
            let params = [
                { value: data.name, type: "string", title: __('name'), required: true },
                { value: data.subject, type: "string", title: __('subject'), required: true },
                { value: data.companyName, type: "string", title: __('companyName'), required: false },
                { value: data.comments, type: "string", title: __('comments'), required: true },
                { value: data.email, type: "string", title: __('email'), required: false }
            ]

            //checking validation
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message })
            }

            let contactUsData = {
                userId: req.user._id,
                email: req.user.email,
                name: data.name,
                subject: data.subject,
                comments: data.comments,
                userType: req.user.userType,
                createdAt: new Date(),
            }

            if (data.email) {
                contactUsData.email = data.email
            }

            if (data.companyName) {
                contactUsData.companyName = data.companyName
            }

            ContactUs.addContactUs(contactUsData, async (err, resp) => {
                if (err) {
                    console.log(err)
                    return res.status(400).json({ status: "failure", statusCode: 400, message: __("INTERNAL_DB_ERROR") })
                } else {

                    res.status(200).json({
                        status: "success",
                        statusCode: 200,
                        message: __("QUERY_SUBMITTED_SUCCESSFULLY"),
                        data: resp
                    })


                }
            });
        } catch (error) {

            res.status(500).json({ status: "failure", statusCode: 400, message: __("INTERNAL_SERVER_ERROR") })
            throw new Error(error)
        }
    },
    contactUs: async (req, res) => {
        try {
            let data = req.body

            let params = [
                { value: data.name, type: "string", title: __('name'), required: true },
                { value: data.subject, type: "string", title: __('subject'), required: true },
                { value: data.companyName, type: "string", title: __('companyName'), required: false },
                { value: data.comments, type: "string", title: __('comments'), required: true },
                { value: data.userType, type: "string", title: __('userType'), required: true },
                { value: data.email, type: "string", title: __('email'), required: true }
            ]

            //checking validation
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message })
            }

            let contactUsData = {
                name: data.name,
                email: data.email,
                subject: data.subject,
                comments: data.comments,
                userType: data.userType.toUpperCase(),
                createdAt: new Date(),
            }

            if (data.companyName) {
                contactUsData.companyName = data.companyName
            }

            ContactUs.addContactUs(contactUsData, async (errr, resp) => {
                if (errr) {

                    return res.status(400).json({ status: "failure", statusCode: 400, message: __("INTERNAL_DB_ERROR") })
                } else {

                    res.status(200).json({
                        status: "success",
                        statusCode: 200,
                        message: __("QUERY_SUBMITTED_SUCCESSFULLY"),
                        data: resp
                    })
                }
            });
        } catch (error) {

            res.status(500).json({ status: "failure", statusCode: 400, message: __("INTERNAL_SERVER_ERROR") })
            throw new Error(error)
        }
    },
    userContactUs: async (req, res) => {
        try {
            let data = req.body

            let params = [
                { value: data.name, type: "string", title: __('name'), required: true },
                { value: data.subject, type: "string", title: __('subject'), required: true },

                { value: data.comments, type: "string", title: __('comments'), required: true },
                { value: data.email, type: "string", title: __('email'), required: false }
            ]

            //checking validation
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message })
            }

            let contactUsData = {
                userId: req.user._id,
                email: req.user.email,
                name: data.name,
                subject: data.subject,
                comments: data.comments,
                userType: req.user.userType,
                createdAt: new Date(),
            }

            if (data.email) {
                contactUsData.email = data.email
            }



            ContactUs.addContactUs(contactUsData, async (eror, resp) => {
                if (eror) {

                    return res.status(400).json({ status: "failure", statusCode: 400, message: __("INTERNAL_DB_ERROR") })
                } else {

                    res.status(200).json({
                        status: "success",
                        statusCode: 200,
                        message: __("QUERY_SUBMITTED_SUCCESSFULLY"),
                        data: resp
                    })
                }
            });
        } catch (error) {

            res.status(500).json({ status: "failure", statusCode: 400, message: __("INTERNAL_SERVER_ERROR") })
            throw new Error(error)
        }
    },
}