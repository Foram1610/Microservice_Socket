"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");
const objectId = require("objectid");
const helper = require("../helper/helper");
const saltRounds = 10;

const UserSchema = new Schema(
    {
        uniqueId: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        emailStatus: {
            type: String,
            enum: ["unverified", "verified"],
            default: "unverified",
        },
        mobileNumber: { type: String },
        mobileNumberStatus: {
            type: String,
            enum: ["unverified", "verified"],
            default: "verified",
        },
        countryCode: { type: String },
        address: { type: String },
        hashPassword: { type: String },
        profileImage: { type: String, default: "" },
        OTP: { type: String },
        OTPexp: { type: Date },

        languageId: { type: mongoose.Schema.Types.ObjectId, ref: "Languages" },
        languageDetails: { type: Object },
        avgRating: { type: Number, default: 0 },
        userType: {
            type: String,
            enum: [
                "USER",
                "COMPANY",
                "INDIVIDUAL",
                "ADMIN",
                "SUPERADMIN",
                "SUBADMIN",
            ],
        },
        gender: { type: String, enum: ["Male", "Female", "Others"] },
        deviceType: { type: String, enum: ["android", "ios", "others"] }, //save last login device type
        registerFrom: { type: String, enum: ["android", "ios", "others"] }, //save this during register time
        signUpBy: {
            type: String,
            enum: ["manual", "google", "apple", "facebook", "microsoft"],
        },
        DOB: { type: String }, //Date format is YYYY-MM-DD
        timezone: { type: String },
        facebookId: { type: String },
        googleId: { type: String },
        appleId: { type: String },
        twitterId: { type: String },
        microsoftId: { type: String },
        linkedinId: { type: String },
        firebaseToken: [
            //for push notification
            {
                token: { type: String },
                deviceType: {
                    type: String,
                    enum: ["android", "ios", "others"],
                },
            },
        ],

        referalCode: { type: String },
        customerLocation: {
            type: { type: String, enum: ["Point"] },
            coordinates: { type: [Number], required: true },
        },
        //user Locations  use only for user case
        locations: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId },
                countryId: { type: mongoose.Schema.Types.ObjectId },
                governateId: { type: mongoose.Schema.Types.ObjectId },
                cityId: { type: mongoose.Schema.Types.ObjectId },
                districtId: { type: mongoose.Schema.Types.ObjectId },
                countryName: { type: Object },
                governateName: { type: Object },
                cityName: { type: Object },
                districtName: { type: Object },
                addressLine1: { type: String },
                street: { type: String },
                houseNumber: { type: String },
                appartment: { type: String },
                floor: { type: String },
                landmark: { type: String },
                locationCordinate: {
                    type: { type: String, enum: ["Point"] },
                    coordinates: { type: [Number], required: true },
                },
                tag: {
                    type: String,
                    enum: ["HOME", "WORK", "APPARTMENT", "OTHERS"],
                }, //'HOME','WORK','APPARTMENT','OTHERS'

                isDefault: { type: Boolean, default: false },
                status: {
                    type: String,
                    enum: ["active", "inactive"],
                    default: "active",
                },
                createdAt: { type: Date },
                UpdatedAt: { type: Date },
            },
        ],
        socketId: { type: String },
        status: {
            type: String,
            enum: ["active", "inactive", "blocked", "suspended"],
            default: "inactive",
        },
        isDeleted: { type: Boolean, default: false },
        deletedReason: { type: String },
        //provider fields
        accountStatus: {
            type: String,
            enum: ["approved", "pending"],
            default: "approved",
        }, //used only in provider case
        services: [
            {
                serviceId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Services",
                },
                categoryId: { type: mongoose.Schema.Types.ObjectId },
            },
        ],
        timeslots: [
            {
                timeslotId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "TimeSlots",
                },
                availability: [{
                    locations: {
                        countryId: { type: mongoose.Schema.Types.ObjectId, ref: "Countries" },
                        governateId: { type: mongoose.Schema.Types.ObjectId, ref: "Governates" },
                        cityId: { type: mongoose.Schema.Types.ObjectId, ref: "Cities" },
                        districtId: { type: mongoose.Schema.Types.ObjectId, ref: "Districts" },
                    },
                    weekday: {
                        monday: {
                            type: Boolean,
                            default: false
                        },
                        tuesday: {
                            type: Boolean,
                            default: false
                        },
                        wednesday: {
                            type: Boolean,
                            default: false
                        },
                        thursday: {
                            type: Boolean,
                            default: false
                        },
                        friday: {
                            type: Boolean,
                            default: false
                        },
                        saturday: {
                            type: Boolean,
                            default: false
                        },
                        sunday: {
                            type: Boolean,
                            default: false
                        },
                        all: {
                            type: Boolean,
                            default: false
                        }
                    },
                    slots: [{ type: String }]
                }

                ]
            }
        ],

        idNumber: { type: String }, //use in case of indivisual SP when company accept joining request company uniq
        companyName: { type: String }, //use in case of company SP
        commercialRegNo: { type: String }, //use in case of company SP
        documentImage: { type: String },
        //End
        //Use in case of individual SP
        assignedCompanyId: { type: mongoose.Schema.Types.ObjectId }, //id of uset table
        serialNumber: { type: Number },
        createdAt: { type: Date },
        UpdatedAt: { type: Date },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        id: false,
    }
);

//password enryption
UserSchema.virtual("password")
    .set(function (password) {
        this._password = password;
        this.hashPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });


// Methods
UserSchema.methods = {
    encryptPassword: function (password) {
        if (!password) return "";

        try {
            return bcrypt.hashSync(password, saltRounds);
        } catch (err) {
            return "";
        }
    },
};

// Statics Methods

// UserSchema.statics('addUser', function (data, callback) {
//     const newUser = new this(data);
//     newUser.save(callback);
// })

// addUser: ,
UserSchema.statics = {
    authenticate: async function (password, hashPassword) {
        const result = await bcrypt.compare(password, hashPassword);
        return result;
    },
    updateEmailStatus: function (data) {
        return this.update({ _id: data._id }, { $set: { emailStatus: 'verified' } });
    },
    updateFirebaseToken: function (data) {
        let condition = {
            "firebaseToken.token": { $ne: data.firebaseToken },
            _id: data.id,
        };

        return this.updateOne(
            condition,
            {
                $addToSet: {
                    firebaseToken: {
                        //all device login token
                        token: data.firebaseToken,
                        deviceType: data.deviceType
                    },
                },

            },
            { safe: true, multi: true }

        );
    },

    load: function (_id) {
        return this.findOne({ _id })
            .populate("user", "name email username")
            .populate("comments.user")
            .exec();
    },

    addUser: function (data, callback) {
        const newUser = new this(data);
        return newUser.save(callback);
    },

    addAdmin: function (data, callback) {
        const newUser = new this(data);
        return newUser.save(callback);
    },

    editAdmin: function (data, callback) {
        this.findOneAndUpdate(
            { _id: data.userId },
            data,
            { new: true },
            callback
        );
    },

    removeUser: function (data) {
        return this.remove({ _id: data._id });
    },
    deleteUserImage: function (data) {

        return this.updateOne(
            { _id: data.id },
            { $set: { documentImage: "" } }
        );
    },
    updatePassword: async function (data, callback) {

        data.hashPassword = bcrypt.hashSync(data.password, saltRounds);
        this.findOneAndUpdate({ _id: data.id }, data, { new: true }, callback);
    },

    updateOTP: async function (data) {
        return this.findOneAndUpdate({ _id: data.id }, data, { new: true });
    },

    list: function (options) {
        const criteria = options.criteria || {};
        const page = options.page || 0;
        const limit = options.limit || 30;
        return this.find(criteria)
            .populate("user", "name username")
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(limit * page)
            .exec();
    },

    findUserById: function (id, callback) {
        this.findById({ _id: id }, callback);
    },
    updateUserById: function (data, callback) {
        if (data.password) {
            data.hashPassword = bcrypt.hashSync(data.password, saltRounds);
        }
        this.findOneAndUpdate({ _id: data._id }, data, { new: true }, callback);
    },
    approveUserById: function (data) {
        return this.findOneAndUpdate(
            { _id: data.userId, userType: { $in: ["USER"] } },
            data,
            { new: true }
        );
    },
    blockUserById: function (data) {
        return this.findOneAndUpdate(
            { _id: data.userId, userType: { $in: ["USER"] } },
            { status: data.status },
            { new: true }
        );
    },
    approveProviderById: function (data) {
        return this.findOneAndUpdate(
            { _id: data.userId, userType: { $in: ["COMPANY", "INDIVIDUAL"] } },
            data,
            { new: true }
        );
    },
    blockProviderById: function (data) {
        return this.findOneAndUpdate(
            { _id: data.userId, userType: { $in: ["COMPANY", "INDIVIDUAL"] } },
            { status: data.status },
            { new: true }
        );
    },
    removeUserById: function (data) {
        return this.remove({
            _id: data.userId,
            userType: { $in: ["USER"] },
        });
    },
    removeProviderById: function (data) {
        return this.remove({
            _id: data.userId,
            userType: { $in: ["COMPANY", "INDIVIDUAL"] },
        });
    },
    logout: function (data, callback) {
        // this.update({_id:data.userId},{$unset:{ firebaseToken:1 }},{safe:true,multi:true},callback)
        this.update(
            { _id: data.userId },
            {
                $pull: {
                    firebaseToken: {
                        token: data.firebaseToken,
                        deviceType: data.deviceType,
                    },
                },
            },
            callback
        );
    },
    getUsersWithFilter: async function (options) {
        const user_criteria = options.user_criteria || {};
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
                sortField = `districtDetails.name.${options.language}`;
                break;
            case "userName":
                sortField = `name.${options.language}`;
                break;
            default:
                sortField = "createdAt";
        }

        let matchVal = user_criteria;



        const result = await this.aggregate([
            {
                $lookup: {
                    from: "locations",
                    localField: "_id",
                    foreignField: "userId",
                    as: "locationDetails",
                },
            },
            {
                $match: matchVal,
            },
            {
                $sort: {
                    [sortField]: sortOrder,
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: 1,
                    },
                    results: {
                        $push: "$$ROOT",
                    },
                },
            },
            {
                $project: {
                    total: 1,
                    results: {
                        // [previous_resultm, skip_page,limit]
                        $slice: ["$results", limit * (page - 1), limit],
                    },
                },
            },
        ]);
        if (result.length > 0) {
            return {
                totalCount: result.length > 0 ? result[0].total : 0,
                data: result.length > 0 ? result[0].results : [],
            };
        } else {
            return {
                data: [],
                totalCount: 0,
            };
        }
    },
    getProvidersWithFilter: async function (options) {
        const provider_criteria = options.provider_criteria || {};
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
                sortField = `districtDetails.name.${options.language}`;
                break;
            case "providerName":
                sortField = `name.${options.language}`;
                break;
            default:
                sortField = "createdAt";
        }

        let matchVal = provider_criteria;

        let selectVal = {

            "uniqueId": 1,
            "name": 1,
            "email": 1,
            "emailStatus": 1,
            "mobileNumber": 1,
            "mobileNumberStatus": 1,
            "countryCode": 1,
            "address": 1,
            "profileImage": 1,
            "avgRating": 1,
            "userType": 1,
            "gender": 1,
            "deviceType": 1,
            "registerFrom": 1,
            "signUpBy": 1,
            "DOB": 1,
            "timezone": 1,
            "locations": 1,
            "accountStatus": 1,
            "companyName": 1,
            "commercialRegNo": 1,
            "createdAt": 1,
            "UpdatedAt": 1,
            "status": 1,
            serviceCount: {
                $size: "$services"
            }
        };



        const result = await this.aggregate([

            {
                $match: matchVal,
            },

            {
                $project: selectVal

            },

            {
                $sort: {
                    [sortField]: sortOrder,
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: 1,
                    },
                    results: {
                        $push: "$$ROOT",
                    },
                },
            },
            {
                $project: {
                    total: 1,
                    results: {
                        // [previous_resultm, skip_page,limit]
                        $slice: ["$results", limit * (page - 1), limit],
                    },
                },
            },
        ]);
        if (result.length > 0) {
            return {
                totalCount: result.length > 0 ? result[0].total : 0,
                data: result.length > 0 ? result[0].results : [],
            };
        } else {
            return {
                data: [],
                totalCount: 0,
            };
        }
    },

    //Locations
    addLocation: async function (data, callback) {
        this.findOneAndUpdate(
            { _id: data.userId },
            { $push: { locations: data } },
            { fields: { locations: 1 }, new: true },
            callback
        );
    },
    editLocation: async function (data, callback) {
        let updateData = {
            "locations.$.userId": data.userId,
            "locations.$.countryId": data.countryId,
            "locations.$.governateId": data.governateId,
            "locations.$.cityId": data.cityId,
            "locations.$.districtId": data.districtId,
            "locations.$.countryName": data.countryName,
            "locations.$.governateName": data.governateName,
            "locations.$.cityName": data.cityName,
            "locations.$.districtName": data.districtName,
            "locations.$.addressLine1": data.addressLine1,
            "locations.$.street": data.street,
            "locations.$.houseNumber": data.houseNumber,
            "locations.$.appartment": data.appartment,
            "locations.$.floor": data.floor,
            "locations.$.landmark": data.landmark,
            "locations.$.tag": data.tag,
            "locations.$.locationCordinate": data.locationCordinate,
        };

        this.findOneAndUpdate(
            { "locations._id": data.locationId, _id: data.userId },
            { $set: updateData },
            { fields: { "locations.$": 1 } },
            callback
        );
    },
    removeLocation: function (data) {
        return this.findOneAndUpdate(
            { _id: data.userId },
            { $pull: { locations: { _id: data.locationId } } },
            { fields: { locations: 1 } }
        );
    },
    setDefaultLocation: async function (data, callback) {
        let updateData = {
            "locations.$.isDefault": data.isDefault,
        };

        this.findOneAndUpdate(
            { "locations._id": data.locationId, _id: data.userId },
            { $set: updateData },
            { fields: { locations: 1 }, new: true },
            callback
        );
    },
    unsetDefaultLocationWithUserId: async function (data, callback) {
        let updateData = {
            "locations.$[elem].isDefault": data.isDefault,
        };

        let arrayFilter = {
            arrayFilters: [{ "elem.isDefault": true }],
            // "multi": true
        };
        this.updateMany(
            { "locations.userId": data.userId, _id: data.userId },
            { $set: updateData },
            arrayFilter,
            callback
        );
    },
    updateLocationStatus: async function (locationId, callback) {
        this.findOneAndUpdate(
            { _id: locationId },
            { status: data.status },
            { new: true },
            callback
        );
    },
    getLocations: function (data) {
        return this.find({}).select("locations");
    },

    getActiveLocations: function (data) {
        return this.findOne({ "locations.status": "active" }).select(
            "locations"
        );
    },
    getActiveUserLocations: function (data) {
        let select = `locations._id locations.userId locations.countryId locations.governateId locations.cityId locations.districtId locations.countryName.${data.languageCode} locations.governateName.${data.languageCode} locations.cityName.${data.languageCode} locations.districtName.${data.languageCode}
        locations.addressLine1  locations.street locations.houseNumber locations.appartment locations.floor locations.landmark locations.tag locations.isDefault locations.status locations.createdAt locations.UpdatedAt locations.locationCordinate `;
        return this.findOne({
            "locations.status": "active",
            _id: data.userId,
        }).select(select);
    },
    getLocationById: function (locationId) {
        return this.findById({ "locations._id": locationId }).select(
            "locations"
        );
    },
    findUser: function (id) {
        return this.findOne({ _id: id });
    },
    getProviderServices: async function (options) {
        let matchQuery = {
            _id: options.userId,
        };

        const result = await this.aggregate([
            {
                $match: matchQuery,
            },
            {
                $project: {
                    _id: 1,
                    services: 1,
                },
            },
        ]);

        if (result.length > 0) {
            return {
                data: result[0].services.length > 0 ? result[0].services : [],
            };
        } else {
            return {
                data: [],
            };
        }
    },
    getProviderServicesWithFilter: async function (options) {


        let matchQuery = {
            _id: options.userId,
        };

        if (options.categoryId) {
            matchQuery["services.categoryId"] = objectId(options.categoryId);
        }

        let projects = {};
        if (options.categoryId) {
            projects = {
                services: {
                    $filter: {
                        input: "$services",
                        as: "services",
                        cond: {
                            $eq: [
                                "$$services.categoryId",
                                objectId(options.categoryId),
                            ],
                        },
                    },
                },
                _id: 0,
            };
        } else {
            projects = {
                _id: 1,
                services: 1,
            };
        }

        const result = await this.aggregate([
            {
                $match: matchQuery,
            },

            {
                $project: projects,
            },
        ]);



        if (result.length > 0) {
            return {
                data: result[0].services.length > 0 ? result[0].services : [],
            };
        } else {
            return {
                data: [],
            };
        }
    },
    getCompanyByRegistrationNo: function (data) {
        return this.findOne({
            commercialRegNo: {
                $regex: data.commercialRegNo.trim(),
                $options: "i",
            },
            status: "active",
            userType: "COMPANY",
            isDeleted: false,
        }).select(
            "profileImage name companyName commercialRegNo uniqueId userType email emailStatus mobileNumber mobileNumberStatus countryCode gender DOB"
        );
    },
    getCompanyByUniqueId: function (data) {
        return this.findOne({
            uniqueId: { $regex: data.companyUniqueId.trim() },
            status: "active",
            userType: "COMPANY",
            isDeleted: false,
        }).select("profileImage name companyName commercialRegNo uniqueId userType email emailStatus mobileNumber mobileNumberStatus countryCode gender DOB");
    },
    getIndividualByUniqueId: function (data) {
        return this.findOne({
            uniqueId: { $regex: data.individualUniqueId.trim() },
            status: "active",
            userType: "INDIVIDUAL",
            isDeleted: false,
        }).select("profileImage name uniqueId userType email emailStatus mobileNumber mobileNumberStatus countryCode gender DOB");
    },
    assignCompanyToIndividual: async function (data, callback) {
        let updateData = {};
        if (data.companyId) {
            updateData.$set = {
                assignedCompanyId: data.companyId,
            };
        } else {
            updateData.$unset = {
                assignedCompanyId: "",
            };
        }
        this.updateOne({ _id: data.individualId }, updateData, callback);
    },
    removeCompanyFromIndividual: async function (data, callback) {
        let updateData = {
            $unset: {
                assignedCompanyId: "",
            },
        };

        this.updateOne({ _id: data.individualId }, updateData, callback);
    },
    getProviderDetails: async function (data) {
        let languageCode = data.languageCode;

        let projects = {
            _id: 1,
            name: 1,
            email: 1,
            mobileNumber: 1,
            uniqueId: 1,
            countryCode: 1,
            createdAt: 1,
            userType: 1,
            profileImage: 1,
            documentImage: 1,
            companyName: 1,
            commercialRegNo: 1,
            idNumber: 1,
            regions: {
                _id: 1,
                country: {
                    [`name.${languageCode}`]: 1,
                },
                governate: {
                    [`name.${languageCode}`]: 1,
                },
                city: {
                    [`name.${languageCode}`]: 1,
                },
                district: {
                    [`name.${languageCode}`]: 1,
                },
            },
        };

        let userDetails = await this.aggregate([
            {
                $lookup: {
                    from: "regions",
                    localField: "_id",
                    foreignField: "userId",
                    as: "regions",
                },
            },
            {
                $unwind: {
                    path: "$regions",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: "countries",
                    localField: "regions.countryId",
                    foreignField: "_id",
                    as: "regions.country",
                },
            },
            {
                $lookup: {
                    from: "governates",
                    localField: "regions.governateId",
                    foreignField: "_id",
                    as: "regions.governate",
                },
            },
            {
                $lookup: {
                    from: "cities",
                    localField: "regions.cityId",
                    foreignField: "_id",
                    as: "regions.city",
                },
            },
            {
                $lookup: {
                    from: "districts",
                    localField: "regions.districtId",
                    foreignField: "_id",
                    as: "regions.district",
                },
            },
            {
                $match: {
                    _id: mongoose.Types.ObjectId(data.providerId),
                    userType: {
                        $in: ["COMPANY", "INDIVIDUAL"],
                    },
                    isDeleted: false,

                },
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    email: { $first: "$email" },
                    mobileNumber: { $first: "$mobileNumber" },
                    countryCode: { $first: "$countryCode" },
                    regions: { $push: "$regions" },
                    createdAt: { $first: "$createdAt" },
                    uniqueId: { $first: "$uniqueId" },
                    userType: { $first: "$userType" },
                    profileImage: { $first: "$profileImage" },
                    documentImage: { $first: "$documentImage" },
                    idNumber: { $first: "$idNumber" },
                    companyName: { $first: "$companyName" },
                    commercialRegNo: { $first: "$commercialRegNo" },
                },
            },
            {
                $project: projects,
            },
        ]);
        if (userDetails.length > 0) {
            let userService = await this.findOne({ _id: data.providerId })
                .populate({
                    path: "services.serviceId",
                    model: "Services",
                    select: {
                        [`name.${languageCode}`]: 1,
                    },
                })
                .select("services");
            if (userService) {
                userDetails[0].services = userService.services;
            } else {
                userDetails[0].services = [];
            }
            return userDetails[0];
        } else {
            return null;
        }
    },
    findAdminUser: async function (data) {
        return this.findOne({
            email: data.email,
            isDeleted: false,
            userType: "SUPERADMIN",
        });
    },
    updateAdminPassword: async function (data, callback) {
        let hashPassword = bcrypt.hashSync(data.password, saltRounds);

        try {
            let updateData = {
                hashPassword: hashPassword
            };
            let update = await this.updateOne({
                _id: data.id,
                userType: "SUPERADMIN",
                isDeleted: false
            }, updateData);
            callback(null, update);
        } catch (error) {
            callback(error, null);
        }

    },
    getUserCountOnLocation: async function (data) {

        let key;
        let matchVal;

        if (data.districtId) {
            matchVal = "locations.districtId"
            key = "districtId"
        } else if (data.cityId) {
            matchVal = "locations.cityId"
            key = "cityId"
        } else if (data.governateId) {
            matchVal = "locations.governateId"
            key = "governateId"
        } else if (data.countryId) {
            matchVal = "locations.countryId"
            key = "countryId"
        }

        const result = await this.aggregate([
            {
                $unwind: { path: "$locations", preserveNullAndEmptyArrays: true }
            },
            {
                $unwind: { path: "$services", preserveNullAndEmptyArrays: true }
            },
            {
                $match: {
                    $and: [
                        { [matchVal]: objectId(data[key]) },
                        { "services.serviceId": objectId(data.serviceId) }
                    ]

                }
            },

            {
                $facet: {
                    totalRecords: [
                        {
                            $count: "total"
                        }
                    ]


                }
            }

        ]);

        return {

            total: result[0].totalRecords.length > 0 ? result[0].totalRecords[0].total : 0
        }

    },
    serviceProviderByServiceIdList: async function (data) {
        return this.find({
            'services.serviceId': { $in: data }, accountStatus: "approved",
            userType: {
                $in: ['COMPANY', 'INDIVIDUAL']
            }
        })
            .select("_id name mobileNumber email services")

    },
    serviceProviderByServiceId: async function (data) {
        return this.find(data)

    },
    timeslotToProvider: async function (providerId, data) {
        return this.findOneAndUpdate({ _id: providerId }, { timeslots: data }, { upsert: true })

    },
    findSwaggerUser: async function (email) {
        return this.findOne({ email: email }).select('_id profileImage languageDetails isDeleted _id uniqueId name email countryCode DOB gender mobileNumber hashPassword userType');

    },
    countUser: function (data) {
        return this.count(data)
    },
    findLoggedInUser: function (data) {
        return this.findOne(data).select('_id profileImage languageDetails isDeleted _id uniqueId name email countryCode DOB gender mobileNumber hashPassword userType');
    },
    findIndividual: function (data) {
        return this.findOne(data)
    },
    findUserDetails: function (data) {
        return this.findOne(data).select('_id profileImage languageDetails isDeleted _id uniqueId name assignedCompanyId email countryCode DOB gender mobileNumber hashPassword userType status accountStatus companyName commercialRegNo idNumber firebaseToken');
    },
    findUserDetails2: function (data) {
        return this.findOne(data).select('_id profileImage languageDetails isDeleted _id uniqueId name email countryCode DOB gender mobileNumber hashPassword userType firebaseToken');
    },
    userCheck: function (data) {
        return this.findOne(data).select("email companyName");
    },
    userCheck2: function (data) {
        return this.findOne(data).select("mobileNumber countryCode companyName");
    },
    userCheck3: function (data) {
        return this.findOne(data).select("companyName");
    },
    userCheck4: function (data) {
        return this.findOne(data).select('email');
    },
    userCheck5: function (data) {
        return this.findOne(data).select('mobileNumber countryCode');
    },
    userCheck6: function (data) {
        return this.findOne(data).select("mobileNumber countryCode companyName");
    },
    findApprovedProvider: async function (data) {
        return this.find(data).select('_id name');
    },
    findAdminsAndProviders: async function (data) {
        return this.find(data).select('_id name');
    },
    findAdmins: async function (data) {
        return this.find(data).select('_id name');
    }
};

module.exports = mongoose.model("Users", UserSchema);