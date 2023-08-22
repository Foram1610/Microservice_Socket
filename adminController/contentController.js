const mongoose = require('mongoose');
const ContentModel = require('../models/contentSchema')
const Language = require('../models/languageSchema')
const validation = require('../helper/validator.js');
const { __ } = require('i18n');
const ObjectId = require('objectid');

module.exports = {
    addContent: async (req, res) => {
        let data = req.body;
        const { name, type, content } = data;
        let params = [
            { value: data.type, type: "string", title: __('type'), required: true },
            { value: data.name, type: "object", title: __('name'), required: true },
            { value: data.content, type: "object", title: __('content'), required: true },
            { value: data.status, type: "string", title: __('status'), required: true }
        ]

        let getAllLanguage = await Language.getAllLanguageCode();
        if (getAllLanguage.length <= 0) {
            return res.status(400).json({ status: "failure", message: __("PLEASE_ADD_LANGUAGE") })
        }

        getAllLanguage.forEach(element => {
            let n = data.name[element.languageCode]
            let c = data.content[element.languageCode]
            let cT = element.languageName + ' content';
            let t = element.languageName + ' name';

            params.push(
                { value: n, type: "string", title: t, required: true },
                { value: c, type: "string", title: cT, required: true }
            )
        });

        let checkErr = await validation(params);
        if (!checkErr.status) {
            return res.status(400).json({ status: "failure", message: checkErr.message })
        }

        let contentNew = new ContentModel({
            name: name,
            type: type,
            content: content,
            addedBy: req.user.userType,
            status: data.status,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        contentNew.save(function (err, d) {
            if (err) {
                return res.status(400).json({ status: "failure", message: __("INTERNAL_DB_ERROR") })
            } else {
                return res.status(200).json({ status: "success", message: __("PAGES_ADDED"), data: d })
            }
        })
    },
    editContent: async (req, res) => {

        let data = req.body;
        const { name, content, contentId } = data;

        let params = [
            { value: data.name, type: "object", title: __('name'), required: true },
            { value: data.content, type: "object", title: __('content'), required: true },
            { value: data.status, type: "string", title: __('status'), required: true }
        ]

        let checkErr = await validation(params);
        if (!checkErr.status) {
            return res.status(400).json({ status: "failure", message: checkErr.message })
        }

        let getAllLanguage = await Language.getAllLanguageCode();
        if (getAllLanguage.length <= 0) {
            return res.status(400).json({ status: "failure", message: __("PLEASE_ADD_LANGUAGE") })
        }

        getAllLanguage.forEach(element => {
            let name1 = data.name[element.languageCode]
            let content1 = data.content[element.languageCode]
            let contentTitle1 = element.languageName + ' content';
            let title1 = element.languageName + ' name';

            params.push(
                { value: name1, type: "string", title: title1, required: true },
                { value: content1, type: "string", title: contentTitle1, required: true }
            )
        });

        if (!ObjectId.isValid(contentId)) {
            return res.json({
                status: 'failure',
                message: __("INVALID_ID")
            });
        }

        let obj = {
            name: name,
            content: content,
            status: data.status,
            updatedAt: new Date()
        }

        ContentModel.updateContent(obj, function (err, resp) {
            if (err) {

                return res.status(400).json({ status: "failure", message: __("INTERNAL_DB_ERROR") })
            } else {
                return res.status(200).json({ status: "success", message: __("PAGES_UPDATED"), data: resp })
            }
        })
    },
    deleteContent: async (req, res) => {
        const {
            contentId,
            status
        } = req.body;

        if (!ObjectId.isValid(contentId)) {
            return res.json({
                status: 'failure',
                message: __("INVALID_ID")
            });
        }

        if (!status) {
            return res.json({
                status: 'failure',
                message: __("STATUS_IS_REQUIRED")
            });
        }

        ContentModel.updateStatus({ _id: contentId }, { status: status }, function (err, data) {
            if (err) {

                return res.status(400).json({ status: "failure", message: __("INTERNAL_DB_ERROR") })
            } else {
                return res.status(200).json({ status: "success", message: __("PAGES_REMOVED"), data: "" })
            }
        });
    },
    getAllContents: async (req, res) => {
        ContentModel.getContents(function (err, data) {
            if (err) {

                return res.status(400).json({ status: "failure", message: __("INTERNAL_DB_ERROR") })
            } else {
                return res.status(200).json({ status: "success", message: "", data: data })
            }
        });
    },
    getContentById: async (req, res) => {
        const contentId = req.params.id;
        if (!ObjectId.isValid(contentId)) {
            return res.json({
                status: 'failure',
                message: __("INVALID_ID")
            });
        }

        ContentModel.getContentById(contentId, function (err1, data) {
            if (err1) {
                return res.status(400).json({ status: "failure", message: __("INTERNAL_DB_ERROR") })
            } else {
                return res.status(200).json({ status: "success", message: "", data: data })
            }
        });
    },
    getPrivacyPolicyContent: async (req, res) => {
        let contentData = await ContentModel.getPrivacyPolicy({
            type: "PRIVACY_POLICY",
            attributes: "name.en type content.en status"
        });


        if (contentData == null) {
            res.render('privacyPolicy', {
                title: '',
                data: __("NO_RECORD_FOUND")
            });
        } else {
            res.render('privacyPolicy', {
                title: 'Privacy Policy',
                data: contentData.content['en']
            });
        }
    },
    getTermsCondition: async (req, res) => {
        let contentData = await ContentModel.getTermAndCondition({
            type: "TERMS_CONDITIONS",
            attributes: "name.en type content.en status"
        });

        if (contentData == null) {
            res.render('termsCondition', {
                title: 'Terms & Condition',
                data: __("NO_RECORD_FOUND")
            });
        } else {
            res.render('termsCondition', {
                title: 'Terms & Condition',
                data: contentData.content['en']
            });
        }
    },
    getPaymentAndRefundPolicies: async (req, res) => {
        let contentData = await ContentModel.getPaymentAndRefundPolicies({
            type: "PAYMENT_AND_REFUND_POLICY",
            attributes: "name.en type content.en status"
        });

        if (contentData == null) {
            res.render('paymentRefundPolicy', {
                title: 'Payment & Refund Policy',
                data: __("NO_RECORD_FOUND")
            });
        } else {
            res.render('paymentRefundPolicy', {
                title: 'Payment & Refund Policy',
                data: contentData.content['en']
            });
        }
    }
};
