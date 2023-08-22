
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimeSlotSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    timeSlotName: {
        type: String,
        required: true,
    },
    timeSlotType: {
        type: String,
        enum: ["WORKING_HOUR", "NON_WORKING_HOUR"],
        required: true
    },

    locations: {
        countryId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Countries" }],
        governateId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Governates" }],
        cityId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cities" }],
        districtId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Districts" }],
    },
    tasks: {
        categoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Categories" }],
        serviceId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Services" }],
        taskId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tasks" }],
    },
    serviceProviders: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Users" }
    ],
    slotGenerateType: {
        type: String,
        enum: ["AUTOMATIC", "MANUAL"]
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE"],
        default: "ACTIVE"

    },
    slotPerDay: { type: Number },

    availableSlots: [{
        slot: { type: String },
        startTime: { type: String },
        endTime: { type: String }
    }],
    duration: {
        hours: { type: String },
        minutes: { type: String }
    },
    timeSlotsToBeSkipped: { type: Number },
    weekDay: {
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
    aheadBooking: {
        month: { type: String },
        week: { type: String },
        day: { type: String }
    },
    schedule: {
        startDate: { type: String },
        endDate: { type: String },
        startTime: { type: String },
        endTime: { type: String },
        defaultTimeSlotAfterScheduleEnds: { type: mongoose.Schema.Types.ObjectId, ref: "TimeSlots" }
    },
    createdAt: { type: Date },
    UpdatedAt: { type: Date }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false
});

// Statics Methods
TimeSlotSchema.statics = {
    fetchAllTimeSlots: function () {
        return this.find()
    },
    getTotalTimeslots: function () {
        try {
            return this.countDocuments();
        }
        catch (err) {
            console.log(err);
            throw err;
        }


    },
    timeslotFilterCount: function (filter_option) {
        try {

            return this.find(filter_option)

                .countDocuments();

        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    getTimeslotWIthFilter: function (filter_option, limit, page, sortField, sortOrder) {

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

    timeslotAdd: function (data, callback) {
        const newTimeslot = new this(data);
        newTimeslot.save(callback);
    },
    statusUpdate: function (data, callback) {
        return this.findByIdAndUpdate(
            { _id: data.timeSlotId },
            {
                $set: {
                    status: data.status
                }
            },
            { new: true },
            callback
        );
    },
    editTimeslot: async function (timeSlotId, data, callback) {
        this.findOneAndUpdate({ _id: timeSlotId }, data, callback);
    },
    timeSlotDelete: function (data) {
        return this.findOneAndDelete(data)
    },
    timeSlotById: function (data) {
        return this.findOne(data)
            .populate('userId', 'name')
            .populate('locations.countryId', 'name')
            .populate('locations.governateId', 'name')
            .populate('locations.cityId', 'name')
            .populate('locations.districtId', 'name')
            .populate('tasks.categoryId', 'name')
            .populate('tasks.serviceId', 'name')
            .populate('tasks.taskId', 'name')
            .populate('serviceProviders', 'name')
            .populate('schedule.defaultTimeSlotAfterScheduleEnds', 'timeSlotName')

    },
    countTimeslot: function (data) {
        return this.count(data)
    },
    findByService: function (id) {
        return this.find({ "tasks.serviceId": id })
    },
    findByServiceProvider: function (id) {
        return this.find({ "serviceProviders": id })
    }
};

module.exports = mongoose.model("TimeSlots", TimeSlotSchema);