"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitySchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
        name: { type: Object }, //Done this for dynamic fields
        countryId: { type: mongoose.Schema.Types.ObjectId, ref: "Countries" },
        governateId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Governates",
        },

        addedBy: {
            type: String,
            enum: ["ADMIN", "SUBADMIN", "SUPERADMIN", "COMPANY", "INDIVIDUAL"],
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
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        id: false
    }
);

CitySchema.virtual("countryDetails", {
    ref: "Countries",
    localField: "countryId",
    foreignField: "_id",
    justOne: true,
});

CitySchema.virtual("governateDetails", {
    ref: "Governates",
    localField: "governateId",
    foreignField: "_id",
    justOne: true,
});


// Methods
CitySchema.methods = {};

// Statics Methods
CitySchema.statics = {
    addCity: async function (data, callback) {
        const newCity = new this(data);
        newCity.save(callback);
    },
    editCity: async function (data, callback) {
        this.findOneAndUpdate(
            { _id: data.cityId },
            data,
            { upsert: true },
            callback
        );
    },
    removeCity: function (cityId) {
        return this.remove({ _id: cityId });
    },
    removeCityByCountry: function (countryId) {
        return this.deleteMany({ countryId: countryId });
    },
    removeCityByGovernate: function (governateId) {
        return this.deleteMany({ governateId: governateId });
    },
    updateCityByCountry: function (countryId, status) {
        return this.updateMany({ countryId: countryId }, { status: status }, { new: true });
    },
    updateCityByGovernate: function (governateId, status) {
        return this.updateMany({ governateId: governateId }, { status: status }, { new: true });
    },
    getCities: function (data) {
        return this.find({})
            .populate("countryDetails governateDetails")
            .select("_id status name addedBy countryId governateId districtId");
    },
    getCitiesByGovernate: function (data) {
        return this.find({ governateId: data.governateId })
            .populate("countryDetails governateDetails")
            .select("_id status name addedBy countryId governateId");
    },
    getActiveCitiesByGovernate: function (data) {
        return this.find({
            governateId: data.governateId,
            status: "active",
        })
            .populate("countryDetails governateDetails")
            .select("_id status name addedBy countryId governateId");
    },
    getActiveCities: function (data) {
        return this.find({ status: "active" })
            .populate("countryDetails governateDetails")
            .select("_id status name addedBy countryId governateId districtId");
    },
    getCityById: function (id) {
        return this.findById({ _id: id })
            .populate("countryDetails governateDetails")
            .select("_id status name addedBy countryId governateId districtId");
    },
    getActiveCitiesByLanguage: async function (options) {
        let selectData = `countryId governateId status name.${options.languageCode}`;
        let sortBy = `name.${options.languageCode}`
        return this.find({ status: 'active', governateId: options.governateId })
            .select(selectData)
            .sort({ [sortBy]: -1 })
            .exec();
    },
    filterCities: async function (options) {
        const country_criteria = options.country_criteria || "";
        const governate_criteria = options.governate_criteria || "";

        const city_criteria = options.city_criteria || {};
        const page = options.page || 1;
        const limit = options.limit || 10;

        let sortField = '';

        switch (options.sortField) {
            case "countryName":
                sortField = `countryDetails.name.${options.language}`;
                break;
            case "governateName":
                sortField = `governateDetails.name.${options.language}`;
                break;
            case "cityName":
                sortField = `name.${options.language}`;
                break;
            default:
                sortField = "createdAt"
        }

        const sortOrder = Number(options.sortOrder) || -1;

        let matchVal = city_criteria
        if (Object.keys(matchVal).length !== 0) {
            let keys = Object.keys(options.city_criteria)
            const _key = `${keys[0]}`;
            matchVal = {
                [_key]: { $regex: options.city.trim(), $options: 'i' }
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
    findUnblockedCities: function (blockCityId, governateId) {
        return this.find({ '_id': { $nin: blockCityId }, 'governateId': governateId })

    },
    citiesByGovernateList: function (data) {
        return this.find({ 'governateId': { $in: data } })
            .select("_id name governateId countryId")
            .populate("countryDetails", "name")
            .populate("governateDetails", "name")

    },
    findCities: function (query, skip, limit) {
        return this.find(query).skip(skip).limit(limit);
    },
    countCity: function (data) {
        return this.count(data)
    },
    findCity: function (data) {
        return this.findOne(data).select('name')
    }
};

module.exports = mongoose.model("Cities", CitySchema);