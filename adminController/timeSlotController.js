const mongoose = require('mongoose');
const TimeSlot = require('../models/timeSlotSchema');
const validation = require("../helper/validator.js");
module.exports = {
    getTimeSlot: async (req, res) => {
        try {

            const timeSlotData = await TimeSlot.fetchAllTimeSlots();

            return res.status(200).json({
                status: "success",
                message: "",
                data: timeSlotData
            });
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }
    },
    getTimeSlotById: async (req, res) => {
        try {
            let timeSlotId = req.params.timeSlotId;
            let params = [
                {
                    value: timeSlotId,
                    type: "string",
                    title: __("timeSlotId"),
                    required: true
                }
            ];
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            let timeSlotData = await TimeSlot.timeSlotById({ _id: timeSlotId });
            if (!timeSlotData) {
                return res.status(400).json({
                    status: "failure",
                    message: __("NO_RECORD_FOUND"),
                    data: timeSlotData
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: timeSlotData
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }
    },
    getTimeSlotWithFilter: async (req, res) => {
        try {
            let data = req.body;
            let limit = data.limit;
            let sortField = data.sortField;
            let sortOrder = parseInt(data.sortOrder);

            let filter_option = {};

            if (data.timeslot && data.timeslot != "") {
                filter_option.timeSlotName = data.timeslot
            }

            if (data.category && data.category != "") {
                filter_option.timeSlotType = data.category
            }
            let page = 0;
            if (data.page >= 0) {
                if (data.page > 0) {
                    page = data.page - 1;
                }


                let timeslots = await TimeSlot.getTimeslotWIthFilter(filter_option, limit, page, sortField, sortOrder);

                if (!timeslots) {
                    return res.status(400).json({
                        status: "failure",
                        message: "Not found",
                        data: "",
                        total: 0
                    });
                }


                let total = await TimeSlot.timeslotFilterCount(filter_option);

                let total_data_in_application = await TimeSlot.getTotalTimeslots();

                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: timeslots,
                    total: total,
                    total_data_in_application: total_data_in_application

                });
            } else {
                return res.status(400).json({
                    status: "failure",
                    message: "Page number must be greater then zero",
                    data: ""
                });
            }

        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }
    },

    addTimeSlot: async (req, res) => {
        try {
            let data = req.body;

            let params = [
                { value: data.timeSlotName, type: "string", title: __("timeSlotName"), required: true },
                { value: data.timeSlotType, type: "string", title: __("timeSlotType"), required: true },
                { value: data.locations, type: "object", title: __("locations"), required: true },
                { value: data.tasks, type: "object", title: __("tasks"), required: true },
                { value: data.serviceProviders, type: "object", title: __("serviceProviders"), required: true },
                { value: data.slotGenerateType, type: "string", title: __("slotGenerateType"), required: true },
                { value: data.weekDay, type: "object", title: __("weekDay"), required: true }

            ];

            //checking timeslot is already added or not
            const queryData = {
                userId: req.user._id,
                timeSlotName: data.timeSlotName
            }
            let userc = await TimeSlot.countTimeslot(queryData);

            if (userc) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("TIMESLOT_ALREADY_EXIST")
                });
            }

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }
            let timeSlotData = {
                userId: req.user._id,
                timeSlotName: data.timeSlotName,
                timeSlotType: data.timeSlotType,
                locations: data.locations,
                tasks: data.tasks,
                serviceProviders: data.serviceProviders,
                slotGenerateType: data.slotGenerateType,
                slotPerDay: data.slotPerDay,
                availableSlots: data.availableSlots,
                duration: data.duration,
                timeSlotsToBeSkipped: data.timeSlotsToBeSkipped,
                weekDay: data.weekDay,
                aheadBooking: data.aheadBooking,

                addedBy: req.user.userType,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            if (data.schedule?.defaultTimeSlotAfterScheduleEnds) {
                timeSlotData.schedule = data.schedule
            }

            TimeSlot.timeslotAdd(timeSlotData, async (err, resp) => {
                if (err) {

                    return res.status(400).json({
                        status: "failure",
                        message: __("INTERNAL_DB_ERROR")
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: __("TIMESLOT_ADDED"),
                        data: resp
                    });
                }
            });
        } catch (error) {

            res.status(500).json({ status: "failure", message: __("INTERNAL_SERVER_ERROR") });
            throw new Error(error)
        }
    },
    editTimeSlot: async (req, res) => {
        try {
            let data = req.body;

            let params = [
                { value: data.timeSlotId, type: "string", title: __("timeSlotId"), required: true },
                { value: data.timeSlotName, type: "string", title: __("timeSlotName"), required: true },
                { value: data.timeSlotType, type: "string", title: __("timeSlotType"), required: true },
                { value: data.locations, type: "object", title: __("locations"), required: true },
                { value: data.tasks, type: "object", title: __("tasks"), required: true },
                { value: data.serviceProviders, type: "object", title: __("serviceProviders"), required: true },
                { value: data.slotGenerateType, type: "string", title: __("slotGenerateType"), required: true },
                { value: data.weekDay, type: "object", title: __("weekDay"), required: true }

            ];


            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }

            let timeSlotDetails = await TimeSlot.timeSlotById({ _id: data.timeSlotId });
            if (!timeSlotDetails) {
                return res.status(400).json({
                    status: "failure",
                    message: __("NO_RECORD_FOUND"),
                    data: timeSlotDetails
                });
            }
            //checking validation
            const queryData = {
                _id: { $ne: data.timeSlotId },
                timeSlotName: data.timeSlotName

            }
            let checkTimeSlot = await TimeSlot.countTimeslot(queryData);
            if (checkTimeSlot) {
                return res.status(400).json({ status: "failure", message: __("TIMESLOT_ALREADY_EXIST") });
            }

            let timeslotData = {
                userId: req.user._id,
                timeSlotName: data.timeSlotName,
                timeSlotType: data.timeSlotType,
                locations: data.locations,
                tasks: data.tasks,
                serviceProviders: data.serviceProviders,
                slotGenerateType: data.slotGenerateType,
                slotPerDay: data.slotPerDay,
                availableSlots: data.availableSlots,
                duration: data.duration,
                timeSlotsToBeSkipped: data.timeSlotsToBeSkipped,
                weekDay: data.weekDay,
                aheadBooking: data.aheadBooking,

                addedBy: req.user.userType,
                updatedAt: new Date()
            };

            if (data.schedule?.defaultTimeSlotAfterScheduleEnds) {
                timeslotData.schedule = data.schedule
            }

            //Creating category
            TimeSlot.editTimeslot(data.timeSlotId, timeslotData, async (err, resp) => {
                if (err) {

                    return res.status(400).json({ status: "failure", message: __("INTERNAL_DB_ERROR") });
                } else {

                    return res.status(200).json({ status: "success", message: __("TIMESLOT_UPDATED"), data: resp });

                }
            });
        } catch (error) {

            res.status(500).json({ status: "failure", message: __(error.message) });
            throw new Error(error)
        }
    },

    editTimeSlotStatus: async (req, res) => {
        try {


            let data = req.body;
            let timeSlotId = req.params.timeSlotId;
            let params = [
                {
                    value: timeSlotId,
                    type: "string",
                    title: __("timeSlotId"),
                    required: true
                },
                {
                    value: data.status,
                    type: "string",
                    title: __("status"),
                    required: true
                }
            ];
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }
            let timeSlotDetails = await TimeSlot.timeSlotById({ _id: timeSlotId });
            if (!timeSlotDetails) {
                return res.status(400).json({
                    status: "failure",
                    message: __("NO_RECORD_FOUND"),
                    data: timeSlotDetails
                });
            }
            TimeSlot.statusUpdate({ timeSlotId: timeSlotId, status: data.status }, async (err, resp) => {
                if (err) {

                    return res.status(400).json({
                        status: "failure",
                        message: __("INTERNAL_DB_ERROR")
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: __("STATUS_CHANGED"),
                        data: resp
                    });
                }

            });
        } catch (error) {

            res.status(500).json({ status: "failure", message: __("INTERNAL_SERVER_ERROR") });
            throw new Error(error)
        }

    },

    deleteTimeSlot: async (req, res) => {
        try {

            let timeSlotId = req.params.timeSlotId;
            let params = [
                {
                    value: timeSlotId,
                    type: "string",
                    title: __("timeSlotId"),
                    required: true
                }
            ];
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }
            let timeSlotDetails = await TimeSlot.timeSlotById({ _id: timeSlotId });
            if (!timeSlotDetails) {
                return res.status(400).json({
                    status: "failure",
                    message: __("NO_RECORD_FOUND"),
                    data: timeSlotDetails
                });
            }
            let timeSlotData = await TimeSlot.timeSlotDelete({ _id: timeSlotId });
            return res.status(200).json({
                status: "success",
                message: "",
                data: timeSlotData
            });
        } catch (error) {

            res.status(500).json({ status: "failure", message: __("INTERNAL_SERVER_ERROR") });
            throw new Error(error)
        }
    }

}