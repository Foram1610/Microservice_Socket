"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SystemSettingSchema = new Schema({
    moduleName: { type: String, required: true },
    settingName: { type: String, required: true },
    settingValue: {
        type: Object,
        required: true,
        default: {}
    },
});

SystemSettingSchema.statics = {
    updateSystemSetting: function (moduleName, settingName, settingValue) {

        return this.findOneAndUpdate(
            {
                moduleName
                , settingName
            },
            {
                $set: {
                    settingValue

                }
            },
            { new: true }
        )


    },

    getReferralSettings: function () {
        return this.findOne({ moduleName: "referral", settingName: "referralSetting" })
    }
}


module.exports = mongoose.model("SystemSettings", SystemSettingSchema);


