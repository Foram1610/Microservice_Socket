 
const mongoose = require('mongoose');
const Warranty = require('../models/warrantySchema');
const validation = require("../helper/validator.js");
module.exports = {
    getWarranty: async (req, res) => {
        try {

            const warrantyData = await Warranty.fetchAllWarranty();

            return res.status(200).json({
                status: "success",
                message: "",
                data: warrantyData
            });
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }
    },
    addWarranty: async (req, res) => {
        try {
            let data = req.body;

            let params = [
                { value: data.warrantyName, type: "string", title: __("warrantyName"), required: true },
                { value: data.periodType, type: "string", title: __("periodType"), required: true },
                { value: data.locations, type: "object", title: __("locations"), required: true },
                { value: data.tasks, type: "object", title: __("tasks"), required: true },
                { value: data.serviceProviders, type: "object", title: __("serviceProviders"), required: true },
                { value: data.schedule, type: "object", title: __("schedule"), required: false },
                { value: data.schedule?.startDate, type: "string", title: __("startDate"), required: false },
                { value: data.schedule?.endDate, type: "string", title: __("endDate"), required: false },
                { value: data.schedule?.startTime, type: "string", title: __("startTime"), required: false },
                { value: data.schedule?.endTime, type: "string", title: __("endTime"), required: false },
                { value: data.schedule?.defaultWarrantyAfterScheduleEnds, type: "string", title: __("defaultWarrantyAfterScheduleEnds"), required: false },
                { value: data.period, type: "object", title: __("period"), required: true },
                { value: data.period?.startDate, type: "string", title: __("startDate"), required: false },
                { value: data.period?.endDate, type: "string", title: __("endDate"), required: false },
                { value: data.period?.startTime, type: "string", title: __("startTime"), required: false },
                { value: data.period?.endTime, type: "string", title: __("endTime"), required: false },
                { value: data.period?.hours, type: "number", title: __("hours"), required: false },
                { value: data.period?.days, type: "number", title: __("days"), required: false },
                { value: data.period?.weeks, type: "number", title: __("weeks"), required: false },
                { value: data.period?.months, type: "number", title: __("months"), required: false },
                { value: data.period?.years, type: "number", title: __("years"), required: false }

            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }
            //checking warranty is already added or not
            const queryData = {

                warrantyName: data.warrantyName
            }
            let userc = await Warranty.countWarranty(queryData);

            if (userc) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("WARRANTY_ALREADY_EXIST")
                });
            }

            let warrantyData = {
                userId: req.user._id,
                warrantyName: data.warrantyName,
                periodType: data.periodType,
                locations: data.locations,
                tasks: data.tasks,
                serviceProviders: data.serviceProviders,

                period: data.period,
                addedBy: req.user.userType,
                modifiedBy: req.user.userType,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            warrantyData.schedule = {
                startDate: data.schedule?.startDate,
                endDate: data.schedule?.endDate,
                startTime: data.schedule?.startTime,
                endTime: data.schedule?.endTime

            }
            if (data.schedule?.defaultWarrantyAfterScheduleEnds) {
                warrantyData.schedule.defaultWarrantyAfterScheduleEnds = data.schedule?.defaultWarrantyAfterScheduleEnds
            }

            if (data.periodType == "date_time") {
                warrantyData.period = {
                    startDate: data.period?.startDate,
                    endDate: data.period?.endDate,
                    startTime: data.period?.startTime,
                    endTime: data.period?.endTime
                }

            }
            if (data.periodType == "duration") {
                warrantyData.period = {
                    hours: data.period?.hours,
                    days: data.period?.days,
                    weeks: data.period?.weeks,
                    months: data.period?.months,
                    years: data.period?.years
                }
            }

            Warranty.warrantyAdd(warrantyData, async (err, resp) => {
                if (err) {

                    return res.status(400).json({
                        status: "failure",
                        message: __("INTERNAL_DB_ERROR")
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: __("WARRANTY_ADDED"),
                        data: resp
                    });
                }
            });
        } catch (error) {

            res.status(500).json({ status: "failure", message: __("INTERNAL_SERVER_ERROR") });
            throw new Error(error)
        }
    },
    editWarranty: async (req, res) => {
        try {
            let data = req.body;

            let params = [
                { value: data.warrantyId, type: "string", title: __("warrantyId"), required: true },
                { value: data.warrantyName, type: "string", title: __("warrantyName"), required: true },
                { value: data.periodType, type: "string", title: __("periodType"), required: true },
                { value: data.locations, type: "object", title: __("locations"), required: true },
                { value: data.tasks, type: "object", title: __("tasks"), required: true },
                { value: data.serviceProviders, type: "object", title: __("serviceProviders"), required: true },
                { value: data.schedule, type: "object", title: __("schedule"), required: false },
                { value: data.schedule?.startDate, type: "string", title: __("startDate"), required: false },
                { value: data.schedule?.endDate, type: "string", title: __("endDate"), required: false },
                { value: data.schedule?.startTime, type: "string", title: __("startTime"), required: false },
                { value: data.schedule?.endTime, type: "string", title: __("endTime"), required: false },
                { value: data.schedule?.defaultWarrantyAfterScheduleEnds, type: "string", title: __("defaultWarrantyAfterScheduleEnds"), required: false },
                { value: data.period, type: "object", title: __("period"), required: true },
                { value: data.period?.startDate, type: "string", title: __("startDate"), required: false },
                { value: data.period?.endDate, type: "string", title: __("endDate"), required: false },
                { value: data.period?.startTime, type: "string", title: __("startTime"), required: false },
                { value: data.period?.endTime, type: "string", title: __("endTime"), required: false },
                { value: data.period?.hours, type: "number", title: __("hours"), required: false },
                { value: data.period?.days, type: "number", title: __("days"), required: false },
                { value: data.period?.weeks, type: "number", title: __("weeks"), required: false },
                { value: data.period?.months, type: "number", title: __("months"), required: false },
                { value: data.period?.years, type: "number", title: __("years"), required: false }

            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }
            //checking warranty is already added or not
            let warrantyDetails = await Warranty.warrantyById({ _id: data.warrantyId });
            if (!warrantyDetails) {
                return res.status(400).json({
                    status: "failure",
                    message: __("NO_RECORD_FOUND"),
                    data: warrantyDetails
                });
            }
            const queryData = {
                _id: { $ne: data.warrantyId },
                warrantyName: data.warrantyName
            }
            let userc = await Warranty.countWarranty(queryData);

            if (userc) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("WARRANTY_ALREADY_EXIST")
                });
            }
            let warrantyData = {
                userId: req.user._id,
                warrantyName: data.warrantyName,
                periodType: data.periodType,
                filteredOptions: data.filteredOptions,
                selectedData: data?.selectedData,
                locations: data.locations,
                tasks: data.tasks,
                serviceProviders: data.serviceProviders,

                period: data.period,

                modifiedBy: req.user.userType,

                updatedAt: new Date()
            };
            warrantyData.schedule = {
                startDate: data.schedule?.startDate,
                endDate: data.schedule?.endDate,
                startTime: data.schedule?.startTime,
                endTime: data.schedule?.endTime

            }
            if (data.schedule?.defaultWarrantyAfterScheduleEnds) {
                warrantyData.schedule.defaultWarrantyAfterScheduleEnds = data.schedule?.defaultWarrantyAfterScheduleEnds
            }

            if (data.periodType == "date_time") {
                warrantyData.period = {
                    startDate: data.period?.startDate,
                    endDate: data.period?.endDate,
                    startTime: data.period?.startTime,
                    endTime: data.period?.endTime
                }

            }
            if (data.periodType == "duration") {
                warrantyData.period = {
                    hours: data.period?.hours,
                    days: data.period?.days,
                    weeks: data.period?.weeks,
                    months: data.period?.months,
                    years: data.period?.years
                }
            }

            Warranty.editWarranty(data.warrantyId, warrantyData, async (err, resp) => {
                if (err) {

                    return res.status(400).json({
                        status: "failure",
                        message: __("INTERNAL_DB_ERROR")
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: __("WARRANTY_UPDATED"),
                        data: resp
                    });
                }
            });
        } catch (error) {

            res.status(500).json({ status: "failure", message: __("INTERNAL_SERVER_ERROR") });
            throw new Error(error)
        }
    },
    getWarrantyWithFilter: async (req, res) => {
        try {
            let data = req.body;
            let limit = data.limit;
            let sortField = data.sortField;
            let sortOrder = parseInt(data.sortOrder);

            let filter_option = {};

            if (data.warranty) {
                filter_option.warrantyName = { $regex: data.warranty.trim(), $options: 'i' }
            }

            if (data.periodType) {
                filter_option.periodType = data.periodType
            }
            if (data.status) {
                filter_option.status = data.status
            }
            if (data.addedBy) {
                filter_option.userId = data.addedBy
            }
            if (data.modifiedBy) {
                filter_option.modifiedBy = data.modifiedBy
            }

            let page = 0;
            if (data.page >= 0) {
                if (data.page > 0) {
                    page = data.page - 1;
                }

                let warranty = await Warranty.getWarrantyWIthFilter(filter_option, limit, page, sortField, sortOrder);
                if (!warranty) {
                    return res.status(400).json({
                        status: "failure",
                        message: "Not found",
                        data: "",
                        total: 0
                    });
                }

                let total = await Warranty.warrantyFilterCount(filter_option);

                let total_data_in_application = await Warranty.getTotalWarranty();

                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: warranty,
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
    getWarrantyById: async (req, res) => {
        try {
            let warrantyId = req.params.warrantyId;
            let params = [
                {
                    value: warrantyId,
                    type: "string",
                    title: __("warrantyId"),
                    required: true
                }
            ];
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            let warrantyData = await Warranty.warrantyById({ _id: warrantyId });
            if (!warrantyData) {
                return res.status(400).json({
                    status: "failure",
                    message: __("NO_RECORD_FOUND"),
                    data: warrantyData
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: warrantyData
                });
            }
        } catch (error) {

            res.status(500).json({ status: "failure", message: __("INTERNAL_SERVER_ERROR") });
            throw new Error(error)
        }
    },
    editWarrantyStatus: async (req, res) => {
        try {

            let data = req.body;
            let warrantyId = req.params.warrantyId;
            let params = [
                {
                    value: warrantyId,
                    type: "string",
                    title: __("warrantyId"),
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
            let warrantyDetails = await Warranty.warrantyById({ _id: warrantyId });
            if (!warrantyDetails) {
                return res.status(400).json({
                    status: "failure",
                    message: __("NO_RECORD_FOUND"),
                    data: warrantyDetails
                });
            }
            Warranty.statusUpdate({ warrantyId: warrantyId, status: data.status }, async (err, resp) => {
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

    deleteWarranty: async (req, res) => {
        try {

            let warrantyId = req.params.warrantyId;
            let params = [
                {
                    value: warrantyId,
                    type: "string",
                    title: __("warrantyId"),
                    required: true
                }
            ];
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }
            let warrantyDetails = await Warranty.warrantyById({ _id: warrantyId });
            if (!warrantyDetails) {
                return res.status(400).json({
                    status: "failure",
                    message: __("NO_RECORD_FOUND"),
                    data: warrantyDetails
                });
            }
            let warrantyData = await Warranty.warrantyDelete({ _id: warrantyId });
            return res.status(200).json({
                status: "success",
                message: "",
                data: warrantyData
            });
        } catch (error) {

            res.status(500).json({ status: "failure", message: __("INTERNAL_SERVER_ERROR") });
            throw new Error(error)
        }
    }

}