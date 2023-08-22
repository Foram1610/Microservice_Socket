 
const mongoose = require("mongoose");
const SystemSetting = require('../models/systemSettingSchema');
const { __ } = require("i18n");
const validator = require("../validations/validator");
const {systemSettingValidation} = require("../validations/systemSettingValidation");

module.exports = {
    addReferralSetting: async (req, res) => {
        let data = req.body;

        const { error } = validator(systemSettingValidation, data);
        if (error) {
            return res.status(400).json({
                status: "failure",
                message: __(error.message),
            });
        }

        try {
            let setting = await SystemSetting.updateSystemSetting(
                "referral",
                "referralSetting",
                data
            )

            if (setting) {
                return res.status(200).json({
                    status: "success",
                    message: __("REFERRAL_SETTING_UPDATED"),
                    data: setting,
                });
            }
        } catch (err) {
            return res.status(400).json({
                status: "failure",
                message: __(err.message),
            });
        }
    },

    //get referral settigns
    getReferralSetting: async (req, res) => {
        try {
            let setting = await SystemSetting.getReferralSettings();

            if (setting) {
                return res.status(200).json({
                    status: "success",
                    message: __("REFERRAL_SETTING_FETCHED"),
                    data: setting,
                });
            }
        } catch (error) {
            return res.status(400).json({
                status: "failure",
                message: __(error.message),
            });
        }
    }

};
