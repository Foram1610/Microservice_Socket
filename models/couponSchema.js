"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const couponRelationService = require("../services/coupon/couponRelationService.js");

const couponTypes = ["VOUCHER/COUPON", "REFERRAL"];
const promoTypes = ["COUPON", "VOUCHER"]; //voucher is used by company to give discount to customer
const statusTypes = ["ACTIVE", "DISABLE", "EXPIRED"];
const broadcastType = ["SMS", "PUSH", "PUSH_AND_SMS"];

const CouponSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    modifiedBy: {
        type: String,
        required: true,
        enum: ["ADMIN", "SUBADMIN", "SUPERADMIN", "PROVIDER"],
    },
    name: { type: String, required: true },
    code: { type: String, required: true },
    type: { type: String, enum: couponTypes, required: true },
    promoType: { type: String, enum: promoTypes, required: true },
    status: { type: String, enum: statusTypes, default: "DISABLE" },
    availableTo: {
        allClient: { type: Boolean, default: false },
        firstOrderClient: { type: Boolean, default: false },
        selectedClient: {
            enabled: { type: Boolean, default: false },
            clientIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
        },
        notAOrderSince: {
            enabled: { type: Boolean, default: false },
            days: { type: Number, default: 0 },
        },
    },
    availableToServiceTask: {
        allService: { type: Boolean, default: false },
        selectedServices: [
            { type: mongoose.Schema.Types.ObjectId, ref: "Services" },
        ],
        selectedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tasks" }],
    },
    maximumUses: {
        enabled: { type: Boolean, default: false },
        uses: { type: Number, default: null },
    },
    maximumClientUses: {
        enabled: { type: Boolean, default: false },
        maximumUses: { type: Number, default: null },
    },
    maximumCompletedOrder: {
        enabled: { type: Boolean, default: false },
        maximumCompletedOrderCount: { type: Number, default: null },
    },
    location: {
        allLocation: { type: Boolean, default: false },
        availableInCountry: [
            { type: mongoose.Schema.Types.ObjectId, ref: "Countries" },
        ],
        availableInGovernorate: [
            { type: mongoose.Schema.Types.ObjectId, ref: "Governates" },
        ],
        availableInCity: [
            { type: mongoose.Schema.Types.ObjectId, ref: "Cities" },
        ],
        availableInDistrict: [
            { type: mongoose.Schema.Types.ObjectId, ref: "Districts" },
        ],
    },
    timeLine: {
        dateTimeInterval: { type: Boolean, required: true, default: false },
        dateTimeIntervalStart: { type: Date },
        dateTimeIntervalEnd: { type: Date },
        validTill: { type: Boolean, required: true, default: false },
        validTillDate: { type: Date },
    },
    action: {
        cashOnWallet: {
            enabled: { type: Boolean, default: false },
            amount: { type: Number, default: 0 },
        },
        discountPercentage: {
            enabled: { type: Boolean, default: false },
            percentage: { type: Number, default: 0 },
            uptoEnabled: { type: Boolean, default: false },
            upto: { type: Number, default: 0 },
        },
        discountAmount: {
            enabled: { type: Boolean, default: false },
            amount: { type: Number, default: 0 },
        },
    },
    message: { type: String, default: null },
    broadcastType: { type: String, enum: broadcastType, required: true },
},
    {
        timestamps: true,
    }
);

// Pre-remove hook
CouponSchema.pre("remove", function (next) {
    next();
});

// Pre-save hook
CouponSchema.pre("save", function (next) {
    next();
});

// Methods
CouponSchema.methods = {};

// Statics Methods
CouponSchema.statics = {
    createCoupon: function (data) {
        return this.create(data);
    },

    getCouponAllDetails: function (couponId) {

        let requiredRelation = [
            "selectedClients",
            "createdBy",
            "updatedBy",
            "selectedServices",
            "selectedTasks",
            "availableInCountry",
            "availableInGovernorate",
            "availableInCity",
            "availableInDistrict",
        ];

        let relations = [];

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
            .populate([
                couponRelationService.createdBy,
                couponRelationService.updatedBy,
            ])
            .skip(skip)
            .limit(limit)
            .sort(sort)
            .exec();
        // .lean();

        let total = await this.countDocuments(query);

        return { coupons, total };
    },

    updateStatus: function (couponId, status) {
        return this.findByIdAndUpdate(couponId, { status: status });
    }


};

module.exports = mongoose.model("Coupons", CouponSchema);
