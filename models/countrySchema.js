"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CountrySchema = new Schema({

    name: { type: Object }, //Done this for dynamic fields

    countryCode: { type: String, default: null },
    flagUrl: { type: String, default: null },
    currencyCode: { type: String, default: null },//two digit country code
    alpha3: { type: String, default: null },//three digit country code
    currencySign: { type: String, default: null },
    countryTimezones: { type: Array, default: [] },
    countryPhoneCode: { type: String, default: null },
    addedBy: {
        type: String,
        enum: ["ADMIN", "SUBADMIN", "SUPERADMIN", "COMPANY", "INDIVIDUAL"],
        required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },

    status: {
        type: String,
        enum: ["active", "inactive", "blocked"],
        default: "inactive",
    },
    createdAt: { type: Date },
    UpdatedAt: { type: Date },
});

// Pre-remove hook
CountrySchema.pre("remove", function (next) {
    next();
});

// Pre-save hook
CountrySchema.pre("save", function (next) {
    next();
});

// Methods
CountrySchema.methods = {};

// Statics Methods
CountrySchema.statics = {
    addCountry: async function (data, callback) {
        const newRegion = new this(data);
        newRegion.save(callback);
    },
    editCountry: async function (data, callback) {
        this.findOneAndUpdate(
            { _id: data.countryId },
            data,
            { upsert: true },
            callback
        );
    },
    removeCountry: function (countryId) {
        return this.remove({ _id: countryId });
    },
    getCountries: function (data) {
        return this.find({}).select(
            "_id flagUrl countryCode status name addedBy"
        );
    },
    getActiveCountries: function (data) {
        return this.find({ status: "active" }).select(
            "_id flagUrl countryCode status name addedBy"
        );
    },
    getCountryById: function (id) {
        return this.findById({ _id: id }).select(
            "_id flagUrl countryCode status name addedBy"
        );
    },
    filterCountries: async function (options) {
        const criteria = options.criteria || {};
        const page = options.page || 1;
        const limit = options.limit || 10;

        const sortOrder = Number(options.sortOrder) || -1;
        let sortField = options.sortField || 'createdAt';

        if (options.sortField == 'countryName') {
            sortField = `name.${options.language}`;
        }

        const totalCount = await this.countDocuments(criteria).exec();
        const data = await this.find(criteria)
            .populate('userId', 'name')

            .sort({ [sortField]: sortOrder })
            .limit(limit)
            .skip(limit * (page - 1))
            .exec();

        return {
            totalCount: totalCount,
            data: data
        }
    },
    getActiveCountriesByLanguage: async function (options) {
        let selectData = `countryCode flagUrl currencyCode alpha3 status name.${options.languageCode}`;
        let sortBy = `name.${options.languageCode}`
        return this.find({ status: 'active' })
            .select(selectData)
            .sort({ [sortBy]: -1 })
            .exec();
    },
    findUnblockedCountries: function (blockedCountryIds) {
        return this.find({ '_id': { $nin: blockedCountryIds } })
    },
    findCountries: function (query, skip, limit) {
        return this.find(query).skip(skip).limit(limit);
    },
    countCountry: function (data) {
        return this.count(data)
    },
    findCountry: function (data) {
        return this.findOne(data).select('name')
    }
};

module.exports = mongoose.model("Countries", CountrySchema);
