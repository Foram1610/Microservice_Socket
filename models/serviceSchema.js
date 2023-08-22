"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const SerivceSchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categories",
            required: true,
        },
        name: {
            type: Object,
            required: true,
        },
        image: {
            type: String
        },
        addedBy: {
            type: String,
            enum: ["ADMIN", "SUBADMIN", "SUPERADMIN"],
            required: true,
        },



        blockCountryId: [{ type: mongoose.Schema.Types.ObjectId, ref: "countries" }],
        blockGovernateId: [{ type: mongoose.Schema.Types.ObjectId, ref: "governates" }],
        blockCityId: [{ type: mongoose.Schema.Types.ObjectId, ref: "cities" }],
        blockDistrictId: [{ type: mongoose.Schema.Types.ObjectId, ref: "districts" }],
        status: {
            type: String,
            enum: ["active", "inactive", "blocked"],
            default: "active",
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

//create virtual fields
SerivceSchema.virtual("categoryDetails", {
    ref: "Categories",
    localField: "categoryId",
    foreignField: "_id",
    justOne: true,
    // options: { sort: { name: -1 }, limit: 5 }
});

SerivceSchema.virtual("usersDetails", {
    ref: "Users",
    localField: "userId",
    foreignField: "_id",
    justOne: true,
});


// Statics Methods
SerivceSchema.statics = {
    addService: function (data, callback) {
        const newService = new this(data);
        newService.save(callback);
    },
    editService: function (data, callback) {
        this.findOneAndUpdate(
            { _id: data.serviceId },
            data,
            { upsert: true },
            callback
        );
    },
    removeService: function (data) {
        return this.remove({ _id: data._id });
    },
    setDefaultService: async function (data, callback) {
        this.findOneAndUpdate({ _id: data.serviceId, userId: data.userId }, data, { new: true }, callback);
    },
    unsetDefaultServiceWithUserId: async function (data, callback) {
        this.updateMany({ userId: data.userId }, data, callback);
    },
    getServices: function (data) {
        return this.find({})
            .populate({
                path: "categoryDetails",
                select: "name",
            })
    },

    getUserServices: function (data) {
        return this.find({ userId: data.userId })
            .populate({
                path: "categoryDetails",
                select: "name",
            })
    },
    getActiveServices: function (data) {
        return this.find({ status: "active" })
            .populate({
                path: "categoryDetails",
                select: "name",
            })
    },
    getUserActiveServices: function (data) {
        return this.find({ status: "active", userId: data.userId })
            .populate({
                path: "categoryDetails",
                select: "name",
            })
    },
    getServiceById: function (id) {
        return this.findById({ _id: id })
            .populate({
                path: "categoryDetails",
                select: "name",
            })
    },
    getUserById: function (url) {
        return this.findOne({ image: url })
            .populate({
                path: "categoryDetails",
                select: "name",
            })

    },
    getActiveServicesWithFilter: async function (options) {

        const service_criteria = options.service_criteria || {};
        const page = options.page || 1;
        const limit = options.limit || 500; //when pagination is not required

        let sortField = '';
        switch (options.sortField) {
            case "categoryName":
                sortField = `categoryDetails.name.${options.language}`;
                break;
            case "serviceName":
                sortField = `name.${options.language}`;
                break;
            default:
                sortField = "createdAt"
        }

        const sortOrder = Number(options.sortOrder) || -1;

        let matchVal = service_criteria



        let selectVal = {
            "_id": 1,
            "categoryId": 1,
            "userId": 1,
            "image": 1,
        }
        let name = `name.${options.language}`
        selectVal[name] = 1



        const result = await this.aggregate([
            {
                $match: matchVal
            },
            {
                $project: selectVal
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
                        // [previous_result, skip_page,limit]
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
    filterServices: async function (options) {
        const category_criteria = options.category_criteria || "";
        const service_criteria = options.service_criteria || "";

        const page = options.page || 1;
        const limit = options.limit || 30;

        const sortOrder = Number(options.sortOrder) || -1;
        const ObjectId = mongoose.Types.ObjectId;
        let sortField = '';
        switch (options.sortField) {
            case "categoryName":
                sortField = `categoryDetails.name.${options.language}`;
                break;
            case "serviceName":
                sortField = `name.${options.language}`;
                break;
            default:
                sortField = "createdAt"
        }
        let matchOptions = {}
        let matchVal = []
        if (service_criteria) {
            matchVal = [...matchVal, service_criteria]

        }

        if (category_criteria) {

            matchVal = [
                ...matchVal,
                { "categoryId": ObjectId(category_criteria) }
            ]
        }

        if (service_criteria || category_criteria) {
            matchOptions = {
                '$and': [
                    ...matchVal

                ]
            }
        }



        const result = await this.aggregate([
            {
                "$lookup": {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categoryDetails"
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
                $match: matchOptions
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
                        // [previous_result, skip_page,limit]
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
    filterUserServices: async function (options) {
        const category_criteria = options.category_criteria || "";
        const service_criteria = options.service_criteria || "";

        const page = options.page || 1;
        const limit = options.limit || 20;

        const sortOrder = Number(options.sortOrder) || -1;
        let sortField = '';
        switch (options.sortField) {
            case "categoryName":
                sortField = `categoryDetails.name.${options.language}`;
                break;
            case "serviceName":
                sortField = `name.${options.language}`;
                break;
            default:
                sortField = "createdAt"
        }


        let matchVal = service_criteria

        if (category_criteria) {
            let keys = Object.keys(options.category_criteria)
            const _key = `categoryDetails.${keys[0]}`;
            matchVal = {
                ...matchVal,
                [_key]: { $regex: options.country, $options: 'i' }
            }
        }



        const result = await this.aggregate([
            {
                "$lookup": {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categoryDetails"
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
                        // [previous_result, skip_page,limit]
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
    gerServiceByIdWithBlockedLocation: function (serviceId) {
        return this.findOne({ _id: serviceId })

            .populate({
                path: 'blockCountryId',
                model: 'Countries',
                select: '_id name'
            })
            .populate({
                path: 'blockGovernateId',
                model: 'Governates',
                select: '_id name'
            })
            .populate({
                path: 'blockCityId',
                model: 'Cities',
                select: '_id name'
            })
            .populate({
                path: 'blockDistrictId',
                model: 'Districts',
                select: '_id name'
            })
    },

    servicesFallUnderDistrict: function (district, filterOption) {

        let languageCode = filterOption.languageCode
        let page = filterOption.page || 1;
        let limit = filterOption.limit || 20;


        let query = {
            $and: [
                //not in
                {
                    blockCountryId: {
                        $nin: [district.countryId]
                    }
                },
                {
                    blockGovernateId: {
                        $nin: [district.governateId]
                    }
                },
                {
                    blockCityId: {
                        $nin: [district.cityId]
                    }
                },
                {
                    blockDistrictId: {
                        $nin: [district._id]
                    }
                },


            ],
            status: 'active'
        }



        return this.find(query)
            .populate("categoryId", `_id name.${languageCode}`)
            .select(`_id name.${languageCode} image categoryId`)
            .skip((page - 1) * limit)
            .limit(limit)



    },
    findBlockedIds: function (serviceId, queryField) {
        return this.findOne({ _id: serviceId })
            .select(queryField)

    },
    servicesByCategory: async function (options) {

        return this.find({ categoryId: options })
            .select("_id name categoryId")
            .exec();
    },

    servicesByCategoryList: async function (data) {
        return this.find({ 'categoryId': { $in: data } })
            .select("_id name categoryId")

    },
    servicesByCategoryAndDistrictList: async function (data) {
        return this.find(data)
            .populate({
                path: "categoryDetails",
                select: "name"
            })
            .select("_id name categoryId")

    },
    findServiceInDB: function (id) {
        return this.findOne({ _id: id })
    }
};

module.exports = mongoose.model("Services", SerivceSchema);
