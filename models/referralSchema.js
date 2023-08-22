"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const couponRelationService = require("../services/coupon/couponRelationService.js");

const couponTypes = ["VOUCHER/COUPON", "REFERRAL"];
const promoTypes = ["COUPON", "VOUCHER"]; //voucher is used by company to give discount to customer
const statusTypes = ["ACTIVE", "DISABLE", "EXPIRED"];
const broadcastType = ["SMS", "PUSH", "PUSH_AND_SMS"];

const ReferralSchema = new Schema({

});

// Pre-remove hook
ReferralSchema.pre("remove", function (next) {
    next();
});

// Pre-save hook
ReferralSchema.pre("save", function (next) {
    next();
});

// Methods
ReferralSchema.methods = {};

// Statics Methods
ReferralSchema.statics = {
    createCoupon: function (data) {
        return this.create(data);
    },

    getCouponAllDetails: function (couponId) {

        let requiredRelation = [
            "selectedClients",
            "createdBy",
            "selectedServices",
            "selectedTasks",
            "availableInCountry",
            "availableInGovernorate",
            "availableInCity",
            "availableInDistrict",
        ];

        let relations =[];

        for (const [key, value] of Object.entries(couponRelationService)) {
            if (requiredRelation.includes(key)) {
                relations.push(value);
            }
        }

        let queryData = this.findById(couponId);
        if (relations.length > 0) {
            relations.forEach((item) => {
                queryData.populate(item);
            });
        }

        return queryData;


    },
    findCouponByQuery: function (query) {
        return this.findOne(query);
    },

    updateCoupon: function (couponId, data) {
        console.log("couponId", couponId);
        console.log("data", data);
        return this.findByIdAndUpdate(couponId, data);
    },
    findCouponById: function (couponId) {
        return this.findById(couponId);
    },

    deleteCoupon: function (couponId) {
        return this.findByIdAndDelete(couponId);
    },

    couponListByFilter: async function (query, options) {

        let page = options.page || 1;
        let limit = options.limit || 10;
        let skip = (page - 1) * limit;
        let sort = options.sort || { createdAt: -1 };


        let coupons = await this.find(query)
            .skip(skip)
            .limit(limit)
            .sort(sort)
            .lean();

        let total = await this.countDocuments(query);

        return { coupons, total };
    },


};

module.exports = mongoose.model("Referrals", ReferralSchema);