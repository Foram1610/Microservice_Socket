"use strict";
const mongoose = require("mongoose");
const Country = mongoose.model("Countries");
const Schema = mongoose.Schema;

const GovernateSchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
        name: { type: Object }, //Done this for dynamic fields
        countryId: { type: mongoose.Schema.Types.ObjectId, ref: "Countries" },
        addedBy: {
            type: String,
            enum: ["ADMIN", "SUBADMIN", "SUPERADMIN", "COMPANY", "INDIVIDUAL",],
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive", "blocked"],
            default: "inactive",
        },
        createdAt: { type: Date },
        UpdatedAt: { type: Date },
    },
    {
        toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
        toObject: { virtuals: true }, // So `toObject()` output includes virtuals
        id: false
    }
);

//Creating virtual fields
GovernateSchema.virtual("countryDetails", {
    ref: "Countries",
    localField: "countryId",
    foreignField: "_id",
    justOne: true,
});



// Methods
GovernateSchema.methods = {};

// Statics Methods
GovernateSchema.statics = {
    addGovernate: async function (data, callback) {
        const newRegion = new this(data);
        newRegion.save(callback);
    },
    editGovernate: async function (data, callback) {
        this.findOneAndUpdate(
            { _id: data.governateId },
            data,
            { upsert: true },
            callback
        );
    },
    removeGovernate: function (governateId) {
        return this.remove({ _id: governateId });
    },
    removeGovernateByCountry: function (countryId) {
        return this.deleteMany({ countryId: countryId });
    },
    updateGovernateByCountry: function (countryId, status) {
        return this.updateMany({ countryId: countryId }, { status: status }, { new: true });
    },
    getGovernates: function (data) {
        return this.find({})
            .populate("countryDetails")
            .select("_id status name countryId addedBy");
    },
    getGovernatesByCountryId: function (data) {
        return this.find({ countryId: data.countryId })
            .populate("countryDetails")
            .select("_id status name countryId addedBy");
    },
    getActiveGovernatesByCountryId: function (data) {
        return this.find({
            countryId: data.countryId,
            status: "active",
        })
            .populate("countryDetails")
            .select("_id status name countryId addedBy");
    },
    getActiveGovernates: function (data) {
        return this.find({ status: "active" })
            .populate("countryDetails")
            .select("_id status countryId name addedBy");
    },
    getGovernateById: function (id) {
        return this.findById({ _id: id })
            .populate("countryDetails")
            .select("_id status name addedBy countryId");
    },
    filterGovernates: async function (options) {
        const country_criteria = options.country_criteria || "";
        const governate_criteria = options.governate_criteria || {};
        const page = options.page || 1;
        const limit = options.limit || 10;

        const sortOrder = Number(options.sortOrder) || -1;
        let sortField = '';

        switch (options.sortField) {
            case "countryName":
                sortField = `countryDetails.name.${options.language}`;
                break;
            case "governateName":
                sortField = `name.${options.language}`;
                break;
            default:
                sortField = "createdAt"
        }

        let matchVal = governate_criteria

        if (Object.keys(matchVal).length !== 0) {
            let keys = Object.keys(options.governate_criteria)
            const _key = `${keys[0]}`;
            matchVal = {
                [_key]: { $regex: options.governate.trim(), $options: 'i' }
            }
        }

        if (country_criteria) {

            let keys = Object.keys(options.country_criteria)

            const _key = `countryDetails.${keys[0]}`;
            matchVal = {
                ...matchVal,
                [_key]: { $regex: options.country.trim(), $options: 'i' }
            }
        }



        const result = await this.aggregate([
            {
                "$lookup": {
                    from: "countries",
                    localField: "countryId",
                    foreignField: "_id",
                    as: "countryDetails"
                }
            },
            {

                "$lookup": {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },

            {
                $match: matchVal
            },
            {
                $sort: {
                    [sortField]: sortOrder
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: 1
                    },
                    results: {
                        $push: '$$ROOT'
                    }
                }
            },
            {
                $project: {
                    total: 1,
                    results: {
                        // [previous_resultm, skip_page,limit]
                        $slice: ['$results', (limit * (page - 1)), limit]
                    }
                }
            },
        ]);

        if (result.length > 0) {
            return {
                totalCount: result.length > 0 ? result[0].total : 0,
                data: result.length > 0 ? result[0].results : []
            }
        } else {
            return {
                data: [],
                totalCount: 0
            }
        }

    },
    getActiveGovernateByLanguage: async function (options) {
        let selectData = `countryId status name.${options.languageCode}`;
        let sortBy = `name.${options.languageCode}`
        return this.find({ status: 'active', countryId: options.countryId })
            .select(selectData)
            .sort({ [sortBy]: -1 })
            .exec();
    },
    findUnblockedGovernates: function (blockGovernateId, countryId) {
        return this.find({ '_id': { $nin: blockGovernateId }, 'countryId': countryId })

    },
    governatesByCountryList: function (data) {
        return this.find({ 'countryId': { $in: data } })
            .select("_id name countryId")
            .populate("countryDetails", "name")
    },
    findGovernates: function (query, skip, limit) {
        return this.find(query).skip(skip).limit(limit);
    },
    countGovernate: function (data) {
        return this.count(data)
    },
    findGovernate: function (data) {
        return this.findOne(data).select('name')
    }
};

module.exports = mongoose.model("Governates", GovernateSchema);
