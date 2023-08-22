'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactUs = new Schema({
    name: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    subject: { type: String },
    email: { type: String },
    companyName: { type: String },
    comments: { type: String },
    userType: { type: String, enum: ["USER", "COMPANY", "INDIVIDUAL", "PROVIDER"] },
    createdAt: { type: Date },
    UpdatedAt: { type: Date },
    status: { type: String, enum: ["PENDING", "CONTACTED", "REJECTED"], default: "PENDING" },
    replyData: {
        repliedAt: { type: Date },
        adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false
});


// Statics Methods
ContactUs.statics = {
    addContactUs: function (data, callback) {
        const newContactUs = new this(data);
        newContactUs.save(callback);
    },

    editContactUs: function (data, callback) {
        this.findOneAndUpdate({ _id: data.contactId }, data, { new: true }, callback);
    },

    removeContactUs: function (data) {
        return this.remove({ _id: data._id });
    },

    filterContactUs: async function (options) {
        const user_criteria = options.user_criteria || {};
        const page = options.page || 1;
        const limit = options.limit || 500; //when pagination is not required

        let sortField = options.sortField || 'createdAt';


        const sortOrder = options.sortOrder || -1;

        let matchVal = user_criteria



        let selectVal = {
            "_id": 1,
            "userId": 1,
            "name": 1,
            "subject": 1,
            "email": 1,
            "companyName": 1,
            "comments": 1,
            "userType": 1,
            "status": 1,
            "createdAt": 1,

        }

        const result = await this.aggregate([
            {
                $match:
                {
                    $and: [
                        matchVal,
                        {
                            status: { $ne: "CONTACTED" }
                        }
                    ]
                }
            },
            {
                $sort: {
                    [sortField]: sortOrder
                }
            },
            {
                $project: selectVal
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
    filterContactUsContacted: async function (options) {
        const user_criteria = options.user_criteria || {};



        const page = options.page || 1;
        const limit = options.limit || 500; //when pagination is not required

        let sortField = options.sortField || 'createdAt';


        const sortOrder = options.sortOrder || -1;

        let matchVal = user_criteria



        let selectVal = {
            "_id": 1,
            "userId": 1,
            "name": 1,
            "subject": 1,
            "email": 1,
            "companyName": 1,
            "comments": 1,
            "userType": 1,

            "createdAt": 1,
            "updatedAt": 1,

            "replyData.repliedAt": 1,
            "adminDetails.name": 1,

        }

        const result = await this.aggregate([
            {
                $match:
                {
                    $and: [
                        matchVal,
                        {
                            status: { $eq: "CONTACTED" }
                        }

                    ]
                }
            },

            {
                $sort: {
                    [sortField]: sortOrder
                }
            },

            //JOIN WITH USER TABLE
            {
                $lookup: {
                    from: "users",
                    localField: "replyData.adminId",
                    foreignField: "_id",
                    as: "adminDetails",


                }
            },
            {
                $project: selectVal
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
    getQueryByid: function (id) {
        return this.findOne({ _id: id })
            .populate('userId', 'email')
    },
    getQueryByidOnly: function (id) {
        return this.findOne({ _id: id })
    },

    changeQueryStatus: function (replyData) {

        return this.findOneAndUpdate({ _id: replyData.id },
            {
                $set: {
                    status: "CONTACTED",
                    replyData: {
                        repliedAt: new Date(),
                        adminId: replyData.adminId,
                    }
                }
            },
            { new: true });

    },
};

module.exports = mongoose.model('ContactUs', ContactUs);
