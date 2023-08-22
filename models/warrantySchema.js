
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const warrantySchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },

        warrantyName: {
            type: String,
            required: true
        },
        periodType: {
            type: String,
            enum: ["date_time", "duration"],
            required: true
        },
        period: {

            startDate: { type: String },
            endDate: { type: String },
            startTime: { type: String },
            endTime: { type: String },
            hours: { type: Number },
            days: { type: Number },
            weeks: { type: Number },
            months: { type: Number },
            years: { type: Number }

        },
        schedule: {
            startDate: { type: String },
            endDate: { type: String },
            startTime: { type: String },
            endTime: { type: String },
            defaultWarrantyAfterScheduleEnds: { type: mongoose.Schema.Types.ObjectId, ref: "Warranty" }
        },
        serviceProviders: [
            { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true }
        ],
        locations: [{
            countryId: { type: mongoose.Schema.Types.ObjectId, ref: "Countries", required: true },
            governateId: { type: mongoose.Schema.Types.ObjectId, ref: "Governates", required: true },
            cityId: { type: mongoose.Schema.Types.ObjectId, ref: "Cities", required: true },
            districtId: { type: mongoose.Schema.Types.ObjectId, ref: "Districts", required: true }
        }],
        tasks: [{
            categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Categories", required: true },
            serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Services", required: true },
            taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Tasks", required: true }
        }],

        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Inactive"
        },
        addedBy: {
            type: String,
            enum: ["ADMIN", "SUBADMIN", "SUPERADMIN", "COMPANY", "INDIVIDUAL"],
            required: true
        },
        modifiedBy: {
            type: String,
            enum: ["ADMIN", "SUBADMIN", "SUPERADMIN", "COMPANY", "INDIVIDUAL"]

        },

        createdAt: { type: Date },
        UpdatedAt: { type: Date }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        id: false
    }
);

// Statics Methods
warrantySchema.statics = {
    fetchAllWarranty: function () {
        return this.find()
    },
    countWarranty: function (data) {
        return this.count(data)
    },
    warrantyAdd: function (data, callback) {
        const newWarranty = new this(data);
        newWarranty.save(callback);
    },
    getTotalWarranty: function () {
        try {
            return this.countDocuments();
        } catch (err) {
            console.log(err);
            throw err;
        }

    },
    warrantyFilterCount: function (filter_option) {
        try {

            return this.find(filter_option)

                .countDocuments();

        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    getWarrantyWIthFilter: function (filter_option, limit, page, sortField, sortOrder) {

        try {

            return this.find(filter_option)
                .populate('userId', 'name')
                .limit(parseInt(limit))
                .skip(limit * page)
                .sort({ [sortField]: sortOrder });

        } catch (err) {
            console.log(err);
            throw err;
        }

    },
    statusUpdate: function (data, callback) {
        return this.findByIdAndUpdate(
            { _id: data.warrantyId },
            {
                $set: {
                    status: data.status
                }
            },
            { new: true },
            callback
        );
    },
    warrantyById: function (data) {
        return this.findOne(data)
            .populate("locations.countryId", "name")
            .populate("locations.governateId", "name")
            .populate("locations.cityId", "name")
            .populate("locations.districtId", "name")
            .populate("tasks.categoryId", "name")
            .populate("tasks.serviceId", "name")
            .populate("tasks.taskId", "name")
            .populate("serviceProvider", "name mobileNumber email")
            .populate('userId', 'name userType')
    },
    warrantyDelete: function (data) {
        return this.findOneAndDelete(data)
    },
    editWarranty: async function (warrantyId, data, callback) {
        this.findOneAndUpdate({ _id: warrantyId }, data, callback);
    }

};

module.exports = mongoose.model("Warranty", warrantySchema);
