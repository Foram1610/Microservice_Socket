const mongoose = require('mongoose');
const Language = require('../models/languageSchema');
const validation = require('../helper/validator.js');
const { __ } = require('i18n');
const LocaleCode = require('locale-code');

module.exports = {
    addLanguage: async (req, res) => {
        try {
            let data = req.body;

            let params = [

                { value: data.localeCode, type: "string", title: __("localeCode"), required: true }
            ]

            //checking validation
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message })
            }

            if (!LocaleCode.validateLanguageCode(data.localeCode)) {
                return res.status(400).json({
                    status: "failure",
                    message: __("INVALID_LANGUAGE_CODE")
                });
            }

            let checkLanguage = await Language.getLanguageByLocaleCode(data.localeCode);
            if (checkLanguage) {
                return res.status(400).json({
                    status: "failure",
                    message: __("LANGUAGE_ALREADY_EXISTS")
                });
            }

            data.languageCode = LocaleCode.getLanguageCode(data.localeCode); // 'en'
            data.languageName = LocaleCode.getLanguageName(data.localeCode); // 'Chinese'
            data.languageNativeName = LocaleCode.getLanguageNativeName(data.localeCode); //'中文'
            data.countryCode = LocaleCode.getCountryCode(data.localeCode); // 'US'
            data.countryName = LocaleCode.getCountryName(data.localeCode); // 'United States'
            data.status = "active";
            data.flagUrl = "https://countryflag.s3.us-east-2.amazonaws.com/" + data.countryCode.toLowerCase() + ".png";
            data.userId = req.user._id;
            data.createdAt = new Date()
            data.updatedAt = new Date()


            Language.addLanguage(data, (err, resdata) => {
                if (err) {
                    return res.status(500).json({
                        status: "failure",
                        message: __("INTERNAL_DATABASE_ERROR")
                    });
                } else {
                    res.json({
                        status: "success",
                        message: __("LANGUAGE_ADDED"),
                        data: resdata
                    });
                }
            });
        } catch (error) {

            return res.status(500).json({ status: "failure", message: __("INTERNAL_SERVER_ERROR") })
        }
    },
    editLanguage: async (req, res) => {
        try {
            let data = req.body;


            let params = [
                { value: data.languageId, type: "string", title: __('languageId'), required: true },
                { value: data.localeCode, type: "string", title: __("localeCode"), required: true }
            ]

            //checking validation
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message })
            }

            if (!LocaleCode.validateLanguageCode(data.localeCode)) {
                return res.status(400).json({
                    status: "failure",
                    message: __("INVALID_LANGUAGE_CODE")
                });
            }

            let checkLanguage = await Language.findLanguage({ _id: { $ne: data.languageId }, localeCode: data.localeCode });
            if (checkLanguage) {
                return res.status(400).json({
                    status: "failure",
                    message: __("LANGUAGE_ALREADY_EXISTS")
                });
            }

            data.languageCode = LocaleCode.getLanguageCode(data.localeCode); // 'en'
            data.languageName = LocaleCode.getLanguageName(data.localeCode); // 'Chinese'
            data.languageNativeName = LocaleCode.getLanguageNativeName(data.localeCode); //'中文'
            data.countryCode = LocaleCode.getCountryCode(data.localeCode); // 'US'
            data.countryName = LocaleCode.getCountryName(data.localeCode); // 'United States'
            data.status = "active";
            data.flagUrl = "https://countryflag.s3.us-east-2.amazonaws.com/" + data.countryCode.toLowerCase() + ".png";
            data.userId = req.user._id;
            data.updatedAt = new Date()

            Language.editLanguage(data, (err, resdata) => {
                if (err) {
                    return res.status(500).json({
                        status: "failure",
                        message: __("INTERNAL_DATABASE_ERROR")
                    });
                } else {
                    res.json({
                        status: "success",
                        message: __("LANGUAGE_UPDATED"),
                        data: resdata
                    });
                }
            });
        } catch (error) {

            return res.status(500).json({ status: "failure", message: __("INTERNAL_SERVER_ERROR") })
        }
    },
    getLanguageList: async (req, res) => {
        try {
            Language.getAllLanguages((err, resdata) => {
                if (err) {
                    return res.status(400).json({
                        status: "failure",
                        message: __("INTERNAL_DB_ERROR")
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: "",
                        data: resdata
                    });
                }
            });
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getLanguageDetailsById: async (req, res) => {
        try {
            let id = req.params.languageId;
            if (!id) {
                return res.status(400).json({
                    status: "failure",
                    message: __("LANGUAGE_ID_IS_REQUIRED")
                });
            }

            Language.getLanguageById(id, (err, resdata) => {
                if (err) {
                    console.log(err)
                    return res.status(400).json({
                        status: "failure",
                        message: __("INTERNAL_DB_ERROR")
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: "",
                        data: resdata
                    });
                }
            });
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getEnabledLanguageList: async (req, res) => {
        try {
            Language.getEnabledLanguages((err, resdataa) => {
                if (err) {
                    return res.status(400).json({
                        status: "failure",
                        message: __("INTERNAL_DB_ERROR")
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: "",
                        data: resdataa
                    });
                }
            });
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    removeLanguageData: async (req, res) => {
        try {
            let data = req.body;
            let params = [
                { value: data.languageId, type: "string", title: __('languageId'), required: true }
            ]

            //checking validation
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message })
            }

            Language.removeLanguage(data.languageId, (err, resdata) => {
                if (err) {
                    return res.status(400).json({
                        status: "failure",
                        message: __("INTERNAL_DB_ERROR")
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: __("LANGUAGE_DELETED"),
                        data: resdata
                    });
                }
            });
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    }

}
