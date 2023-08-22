
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const insuranceSchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },

        insuranceName: {
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
            minutes: { type: Number },
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
            defaultInsuranceAfterScheduleEnds: { type: mongoose.Schema.Types.ObjectId, ref: "Insurance" }
        },
        serviceProviders: [
            { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true }
        ],
        locations: [{
            countryId: { type: mongoose.Schema.Types.ObjectId, ref: "Countries", required: true },
            governateId: { type: mongoose.Schema.Types.ObjectId, ref: "Governates", required: true },
            cityId: { type: mongoose.Schema.Types.ObjectId, ref: "Cities", required: true },
            districtId: { type: mongoose.Schema.Types.ObjectId, ref: "Districts", required: true },
        }],
        tasks: [{
            categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Categories", required: true },
            serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Services", required: true },
            taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Tasks", required: true },
        }],

        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Inactive",
        },
        addedBy: {
            type: String,
            enum: ["ADMIN", "SUBADMIN", "SUPERADMIN", "COMPANY", "INDIVIDUAL"],
            required: true,
        },
        modifiedBy: {
            type: String,
            enum: ["ADMIN", "SUBADMIN", "SUPERADMIN", "COMPANY", "INDIVIDUAL"],

        },
        no_of_level: { type: Number, required: true },
        levels: [{
            name: { type: String, required: true },
            amountType: {
                type: String,
                enum: ["percentage", "number"],
                required: true

            },
            amount: { type: Number, required: true },
            capLimit: { type: Number, required: true }
        }

        ],
        hintMessage: { type: String },
        amountChargedToProvider: {
            amountType: {
                type: String,
                enum: ["percentage", "number"],
                required: true
            },
            amount: { type: Number, required: true }
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

// Statics Methods
insuranceSchema.statics = {
    fetchAllInsurance: function () {
        return this.find()
    },
    countInsurance: function (data) {
        return this.count(data)
    },
    insuranceAdd: function (data, callback) {
        const newWarranty = new this(data);
        newWarranty.save(callback);
    },
    getTotalInsurance: function () {
        try {
            return this.countDocuments();
        }
        catch (err) {
            console.log(err);
            throw err;
        }

    },
    insuranceFilterCount: function (filter_option) {
        try {

            return this.find(filter_option)

                .countDocuments();

        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    getInsuranceWIthFilter: function (filter_option, limit, page, sortField, sortOrder) {

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
            { _id: data.insuranceId },
            {
                $set: {
                    status: data.status
                }
            },
            { new: true },
            callback
        );
    },
    insuranceById: function (data) {
        return this.findOne(data)
            .populate("locations.countryId", "name")
            .populate("locations.governateId", "name")
            .populate("locations.cityId", "name")
            .populate("locations.districtId", "name")
            .populate("tasks.categoryId", "name")
            .populate("tasks.serviceId", "name")
            .populate("tasks.taskId", "name")
            .populate("serviceProviders", "name mobileNumber email")
            .populate('userId', 'name userType')
    },
    insuranceDelete: function (data) {
        return this.findOneAndDelete(data)
    },
    editInsurance: async function (insuranceId, data, callback) {
        this.findOneAndUpdate({ _id: insuranceId }, data, callback);
    }

};

module.exports = mongoose.model("Insurance", insuranceSchema);
