"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DistrictSchema = new Schema(
    {
        name: { type: Object }, //Done this for dynamic fields
        countryId: { type: mongoose.Schema.Types.ObjectId, ref: "Countries" },
        governateId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Governates",
        },
        cityId: { type: mongoose.Schema.Types.ObjectId, ref: "Cities" },
        addedBy: {
            type: String,
            enum: ["ADMIN", "SUBADMIN", "SUPERADMIN", "COMPANY", "INDIVIDUAL"],
            required: true,
        },
        addedById: { type: mongoose.Schema.Types.ObjectId, refPath: "addedBy" },
        status: {
            type: String,
            enum: ["active", "inactive", "blocked"],
            default: "inactive",
        },
        googleMapName: {
            type: String,
            required: true,
        },
        bounds: {
            type: Object,
            required: false,
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
DistrictSchema.virtual("countryDetails", {
    ref: "Countries",
    localField: "countryId",
    foreignField: "_id",
    justOne: true,
});

DistrictSchema.virtual("governateDetails", {
    ref: "Governates",
    localField: "governateId",
    foreignField: "_id",
    justOne: true,
});

DistrictSchema.virtual("cityDetails", {
    ref: "Cities",
    localField: "cityId",
    foreignField: "_id",
    justOne: true,
});



// Methods
DistrictSchema.methods = {};

// Statics Methods
DistrictSchema.statics = {
    addDistrict: async function (data, callback) {
        const newDistrict = new this(data);
        newDistrict.save(callback);
    },
    editDistrict: async function (data, callback) {
        this.findOneAndUpdate(
            { _id: data.districtId },
            data,
            { upsert: true },
            callback
        );
    },
    removeDistrict: function (districtId) {
        return this.remove({ _id: districtId });
    },
    removeDistrictByCountry: function (countryId) {
        return this.deleteMany({ countryId: countryId });
    },
    removeDistrictByCity: function (cityId) {
        return this.deleteMany({ cityId: cityId });
    },
    removeDistrictByGovernate: function (governateId) {
        return this.deleteMany({ governateId: governateId });
    },
    updateDistrictByCountry: function (districtId, status) {
        return this.updateMany({ districtId: districtId }, { status: status }, { new: true });
    },
    updateDistrictByGovernate: function (governateId, status) {
        return this.updateMany({ governateId: governateId }, { status: status }, { new: true });
    },
    updateDistrictByCity: function (cityId, status) {
        return this.updateMany({ cityId: cityId }, { status: status }, { new: true });
    },
    getDistricts: function (data) {
        return this.find({})
            .populate("countryDetails governateDetails cityDetails")
            .select("_id status name addedBy countryId governateId cityId");
    },
    getDistrictsByCity: function (data) {
        return this.find({ cityId: data.cityId })
            .populate("countryDetails governateDetails cityDetails")
            .select("_id status name addedBy countryId governateId cityId");
    },
    getActiveDistrictsByCity: function (data) {
        return this.find({
            cityId: data.cityId,
            status: "active",
        })
            .populate("countryDetails governateDetails cityDetails")
            .select("_id status name addedBy countryId governateId cityId");
    },
    getActiveDistricts: function (data) {
        return this.find({ status: "active" })
            .populate("countryDetails governateDetails cityDetails")
            .select("_id status name addedBy countryId governateId cityId");
    },
    getDistrictById: function (id) {
        return this.findById({ _id: id })
            .populate("countryDetails governateDetails cityDetails")
            .select("_id status name addedBy countryId governateId cityId googleMapName");
    },
    getActiveDistrictsByLanguage: async function (options) {
        let selectData = `countryId governateId cityId status name.${options.languageCode}`;
        let sortBy = `name.${options.languageCode}`
        return this.find({ status: 'active', cityId: options.cityId })
            .select(selectData)
            .sort({ [sortBy]: -1 })
            .exec();
    },
    filterDistricts: async function (options, callback) {
        const country_criteria = options.country_criteria || '';
        const governate_criteria = options.governate_criteria || '';
        const district_criteria = options.district_criteria || {};
        const city_criteria = options.city_criteria || '';
        const page = options.page || 1;
        const limit = options.limit || 10;

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
                sortField = `name.${options.language}`;
                break;
            default:
                sortField = "createdAt"
        }


        let matchVal = district_criteria;
        if (Object.keys(matchVal).length !== 0) {
            let keys = Object.keys(options.district_criteria)
            const _key = `${keys[0]}`;
            matchVal = {
                [_key]: { $regex: options.district.trim(), $options: 'i' }
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
                    from: "users",
                    localField: "addedById",
                    foreignField: "_id",
                    as: "adminDetails"
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
    allBoundCoordinates: async function (options) {
        // get all district that has bounds and return those bounds
        return this.find({

            bounds: {
                $exists: true,
                $ne: []
            },

        }).select('bounds').exec();

    },
    isUserInsideDistrict: (user_coordinates, bound) => {

        if (user_coordinates.lat > bound.bounds.southwest.lat && user_coordinates.lat < bound.bounds.northeast.lat && user_coordinates.lng > bound.bounds.southwest.lng && user_coordinates.lng < bound.bounds.northeast.lng) {

            return true;
        }

        return false;
    },
    identifyDistrictFromUserLocation: async function (user_coordinates) {


        let data = await this.find({
            bounds: {
                $exists: true,
                $ne: []
            },
            "bounds.northeast.lat": {
                $gt: user_coordinates.lat
            },
            "bounds.northeast.lng": {
                $gt: user_coordinates.lng
            },
            "bounds.southwest.lat": {
                $lt: user_coordinates.lat
            },
            "bounds.southwest.lng": {
                $lt: user_coordinates.lng
            }

        }).select('_id').exec()
        if (data.length > 0) {
            return {
                status: true,
                districtId: data[0]._id
            }
        } else {


            return {
                status: false,
            }
        }
    },

    getDistrictByBound: async function (bounds) {
        return this.find({
            bounds: bounds,
        })
    },

    findUnblockedDistricts: function (blockDistrictId, cityId) {
        return this.find({ '_id': { $nin: blockDistrictId }, 'cityId': cityId })

    },
    districtsByCityList: function (data) {
        return this.find({ 'cityId': { $in: data } })
            .select("_id name cityId governateId countryId")
            .populate("countryDetails", "name")
            .populate("governateDetails", "name")
            .populate("cityDetails", "name")

    },
    findDistricts: function (query, skip, limit) {
        return this.find(query).skip(skip).limit(limit);
    },
    countDistrict: function (data) {
        return this.count(data)
    },
    findDistrict: function (data) {
        return this.findOne(data).select('name')
    }

};

module.exports = mongoose.model("Districts", DistrictSchema);
