"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RegionSchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
        countryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Countries",
            required: true,
        },
        governateId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Governates",
            required: true,
        },
        cityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cities",
            required: true,
        },
        districtId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Districts",
            required: true,
        },
        location: {
            type: { type: String, enum: ["Point"] },
            coordinates: { type: [Number], required: true },
        },
        addedBy: {
            type: String,
            enum: ["ADMIN", "SUBADMIN", "SUPERADMIN", "COMPANY", 'INDIVIDUAL'],
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive", "blocked"],
            default: "active",
        },
        isDefault: { type: Boolean, default: false },
        createdAt: { type: Date },
        UpdatedAt: { type: Date },
    },
    {
        toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
        toObject: { virtuals: true }, // So `toObject()` output includes virtuals
        id: false
    }
);

//create virtual fields
RegionSchema.virtual("countryDetails", {
    ref: "Countries", // The model to use
    localField: "countryId", // Find people where `localField`
    foreignField: "_id", // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: true,

});

RegionSchema.virtual("governateDetails", {
    ref: "Governates",
    localField: "governateId",
    foreignField: "_id",
    justOne: true,
});

RegionSchema.virtual("cityDetails", {
    ref: "Cities",
    localField: "cityId",
    foreignField: "_id",
    justOne: true,
});

RegionSchema.virtual("districtDetails", {
    ref: "Districts",
    localField: "districtId",
    foreignField: "_id",
    justOne: true,
});

RegionSchema.virtual("usersDetails", {
    ref: "Users",
    localField: "userId",
    foreignField: "_id",
    justOne: true,
});


// Methods
RegionSchema.methods = {};

// Statics Methods
RegionSchema.statics = {
    addRegion: function (data, callback) {
        const newRegion = new this(data);
        newRegion.save(callback);
    },
    editRegion: function (data, callback) {
        this.findOneAndUpdate(
            { _id: data.regionId },
            data,
            { upsert: true },
            callback
        );
    },
    removeRegion: function (data) {
        return this.remove({ _id: data._id });
    },
    removeRegionByUserId: function (data) {
        return this.deleteMany({ userId: data.userId });
    },
    setDefaultRegion: async function (data, callback) {
        this.findOneAndUpdate({ _id: data.regionId, userId: data.userId }, data, { new: true }, callback);
    },
    unsetDefaultRegionWithUserId: async function (data, callback) {
        this.updateMany({ userId: data.userId }, data, callback);
    },
    getRegions: function (data) {
        return this.find({})
            .populate({
                path: "countryDetails",
                select: "name",
            })
            .populate({
                path: "governateDetails",
                select: "name",
            })
            .populate({
                path: "cityDetails",
                select: "name",
            })
            .populate({
                path: "districtDetails",
                select: "name",
            });
    },
    getUserRegions: function (data) {
        return this.find({ userId: data.userId })
            .populate({
                path: "countryDetails",
                select: "name",
            })
            .populate({
                path: "governateDetails",
                select: "name",
            })
            .populate({
                path: "cityDetails",
                select: "name",
            })
            .populate({
                path: "districtDetails",
                select: "name",
            });
    },
    getActiveRegions: function (data) {
        return this.find({ status: "active" })
            .populate({
                path: "Countries",
                select: "name",
            })
            .populate({
                path: "Governates",
                select: "name",
            })
            .populate({
                path: "Cities",
                select: "name",
            })
            .populate({
                path: "Districts",
                select: "name",
            });
    },
    getUserActiveRegions: function (data) {
        return this.find({ status: "active", userId: data.userId })
            .populate({
                path: "Countries",
                select: "name",
            })
            .populate({
                path: "Governates",
                select: "name",
            })
            .populate({
                path: "Cities",
                select: "name",
            })
            .populate({
                path: "Districts",
                select: "name",
            });
    },
    getRegionById: function (id) {
        return this.findById({ _id: id })
            .populate({
                path: "Countries",
                select: "name",
            })
            .populate({
                path: "Governates",
                select: "name",
            })
            .populate({
                path: "Cities",
                select: "name",
            })
            .populate({
                path: "Districts",
                select: "name",
            });
    },
    getRegionByCountryId: function (countryId) {
        return this.findOne({ countryId: countryId })
    },
    getRegionByGovernateId: function (governateId) {
        return this.findOne({ governateId: governateId })
    },
    getRegionByDistrictId: function (districtId) {
        return this.findOne({ districtId: districtId })
    },
    getRegionByCityId: function (cityId) {
        return this.findOne({ cityId: cityId })
    },
    filterRegions: async function (options) {
        const country_criteria = options.country_criteria || "";
        const governate_criteria = options.governate_criteria || "";
        const district_criteria = options.district_criteria || "";
        const city_criteria = options.city_criteria || "";
        const page = options.page || 1;
        const limit = options.limit || 30;

        const sortOrder = Number(options.sortOrder) || -1;
        let sortField = '';

        switch (options.sortField) {
            case "countryName":
                sortField = `countryDetails.name.${options.language}`;
                break;
            case "governateName":
                sortField = `governateDetails.name.${options.language}`;
                break;
            case "cityName":
                sortField = `cityDetails.name.${options.language}`;
                break;
            case "districtName":
                sortField = `districtDetails.name.${options.language}`;
                break;
            default:
                sortField = "createdAt"
        }

        let matchVal = {}
        if (country_criteria) {
            let keys = Object.keys(options.country_criteria)
            const _key = `countryDetails.${keys[0]}`;
            matchVal = {
                ...matchVal,
                [_key]: { $regex: options.country.trim(), $options: 'i' }
            }
        }

        if (governate_criteria) {
            let keys = Object.keys(options.governate_criteria)
            const _key = `governateDetails.${keys[0]}`;
            matchVal = {
                ...matchVal,
                [_key]: { $regex: options.governate.trim(), $options: 'i' }
            }
        }

        if (city_criteria) {
            let keys = Object.keys(options.city_criteria)
            const _key = `cityDetails.${keys[0]}`;
            matchVal = {
                ...matchVal,
                [_key]: { $regex: options.city.trim(), $options: 'i' }
            }
        }

        if (district_criteria) {
            let keys = Object.keys(options.district_criteria)
            const _key = `districtDetails.${keys[0]}`;
            matchVal = {
                ...matchVal,
                [_key]: { $regex: options.district.trim(), $options: 'i' }
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
                    from: "governates",
                    localField: "governateId",
                    foreignField: "_id",
                    as: "governateDetails"
                }
            },
            {
                "$lookup": {
                    from: "cities",
                    localField: "cityId",
                    foreignField: "_id",
                    as: "cityDetails"
                }
            },


            {
                "$lookup": {
                    from: "districts",
                    localField: "districtId",
                    foreignField: "_id",
                    as: "districtDetails"
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
                totalCount: result[0].total,
                data: result[0].results
            }
        } else {
            return {
                data: [],
                totalCount: 0
            }
        }
    },
    filterUserRegions: async function (options) {
        const country_criteria = options.country_criteria || "";
        const governate_criteria = options.governate_criteria || "";
        const district_criteria = options.district_criteria || "";
        const city_criteria = options.city_criteria || "";
        const page = options.page || 1;
        const limit = options.limit || 30;

        const sortOrder = Number(options.sortOrder) || -1;
        let sortField = '';

        if (options.sortField == 'countryName') {
            sortField = `countryDetails.name.${options.language}`;
        }

        if (options.sortField == 'governateName') {
            sortField = `governateDetails.name.${options.language}`;
        }

        if (options.sortField == 'cityName') {
            sortField = `cityDetails.name.${options.language}`;
        }
        if (options.sortField == 'districtName') {
            sortField = `districtDetails.name.${options.language}`;
        }

        let matchVal = {
            userId: data.userId
        }
        if (country_criteria) {
            let keys = Object.keys(options.country_criteria)
            const _key = `countryDetails.${keys[0]}`;
            matchVal = {
                ...matchVal,
                [_key]: { $regex: options.country, $options: 'i' }
            }
        }

        if (governate_criteria) {
            let keys = Object.keys(options.governate_criteria)
            const _key = `governateDetails.${keys[0]}`;
            matchVal = {
                ...matchVal,
                [_key]: { $regex: options.governate, $options: 'i' }
            }
        }

        if (city_criteria) {
            let keys = Object.keys(options.city_criteria)
            const _key = `cityDetails.${keys[0]}`;
            matchVal = {
                ...matchVal,
                [_key]: { $regex: options.city, $options: 'i' }
            }
        }

        if (district_criteria) {
            let keys = Object.keys(options.district_criteria)
            const _key = `districtDetails.${keys[0]}`;
            matchVal = {
                ...matchVal,
                [_key]: { $regex: options.district, $options: 'i' }
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
                    from: "governates",
                    localField: "governateId",
                    foreignField: "_id",
                    as: "governateDetails"
                }
            },
            {
                "$lookup": {
                    from: "cities",
                    localField: "cityId",
                    foreignField: "_id",
                    as: "cityDetails"
                }
            },
            {
                "$lookup": {
                    from: "districts",
                    localField: "districtId",
                    foreignField: "_id",
                    as: "districtDetails"
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
    countRegion: function (data) {
        return this.count(data)
    }
};

module.exports = mongoose.model("Regions", RegionSchema);
