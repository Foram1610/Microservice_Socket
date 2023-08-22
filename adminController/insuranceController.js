 
const mongoose = require('mongoose');
const Insurance = require('../models/insuranceSchema');
const validation = require("../helper/validator.js");
module.exports = {
    getInsurance: async (req, res) => {
        try {

            const insuranceData = await Insurance.fetchAllInsurance();

            return res.status(200).json({
                status: "success",
                message: "",
                data: insuranceData
            });
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }
    },
    addInsurance: async (req, res) => {
        try {
            let data = req.body;

            let params = [
                { value: data.insuranceName, type: "string", title: __("insuranceName"), required: true },
                { value: data.periodType, type: "string", title: __("periodType"), required: true },
                { value: data.locations, type: "object", title: __("locations"), required: true },
                { value: data.tasks, type: "object", title: __("tasks"), required: true },
                { value: data.serviceProviders, type: "object", title: __("serviceProviders"), required: true },
                { value: data.schedule, type: "object", title: __("schedule"), required: false },
                { value: data.schedule?.startDate, type: "string", title: __("startDate"), required: false },
                { value: data.schedule?.endDate, type: "string", title: __("endDate"), required: false },
                { value: data.schedule?.startTime, type: "string", title: __("startTime"), required: false },
                { value: data.schedule?.endTime, type: "string", title: __("endTime"), required: false },
                { value: data.schedule?.defaultInsuranceAfterScheduleEnds, type: "string", title: __("defaultInsuranceAfterScheduleEnds"), required: false },
                { value: data.period, type: "object", title: __("period"), required: true },
                { value: data.period?.startDate, type: "string", title: __("startDate"), required: false },
                { value: data.period?.endDate, type: "string", title: __("endDate"), required: false },
                { value: data.period?.startTime, type: "string", title: __("startTime"), required: false },
                { value: data.period?.endTime, type: "string", title: __("endTime"), required: false },
                { value: data.period?.minutes, type: "number", title: __("hours"), required: false },
                { value: data.period?.hours, type: "number", title: __("minutes"), required: false },
                { value: data.period?.days, type: "number", title: __("days"), required: false },
                { value: data.period?.weeks, type: "number", title: __("weeks"), required: false },
                { value: data.period?.months, type: "number", title: __("months"), required: false },
                { value: data.period?.years, type: "number", title: __("years"), required: false },
                { value: data.no_of_level, type: "number", title: __("no_of_level"), required: true },
                { value: data.levels, type: "object", title: __("levels"), required: true },
                { value: data.hintMessage, type: "string", title: __("hintMessage"), required: false },
                { value: data.amountChargedToProvider, type: "object", title: __("amountChargedToProvider"), required: true }

            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }
            //checking warranty is already added or not
            const queryData = {

                insuranceName: data.insuranceName
            }
            let userc = await Insurance.countInsurance(queryData);

            if (userc) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("INSURANCE_ALREADY_EXIST")
                });
            }
            let insuranceData = {
                userId: req.user._id,
                insuranceName: data.insuranceName,
                periodType: data.periodType,
                locations: data.locations,
                tasks: data.tasks,
                serviceProviders: data.serviceProviders,

                period: data.period,
                no_of_level: data.no_of_level,
                levels: data.levels,
                hintMessage: data.hintMessage,
                amountChargedToProvider: data.amountChargedToProvider,
                addedBy: req.user.userType,
                modifiedBy: req.user.userType,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            insuranceData.schedule = {
                startDate: data.schedule?.startDate,
                endDate: data.schedule?.endDate,
                startTime: data.schedule?.startTime,
                endTime: data.schedule?.endTime

            }
            if (data.schedule?.defaultInsuranceAfterScheduleEnds) {
                insuranceData.schedule.defaultInsuranceAfterScheduleEnds = data.schedule?.defaultInsuranceAfterScheduleEnds
            }

            if (data.periodType == "date_time") {
                insuranceData.period = {
                    startDate: data.period?.startDate,
                    endDate: data.period?.endDate,
                    startTime: data.period?.startTime,
                    endTime: data.period?.endTime
                }

            }
            if (data.periodType == "duration") {
                insuranceData.period = {
                    minutes: data.period?.minutes,
                    hours: data.period?.hours,
                    days: data.period?.days,
                    weeks: data.period?.weeks,
                    months: data.period?.months,
                    years: data.period?.years
                }
            }

            Insurance.insuranceAdd(insuranceData, async (err, resp) => {
                if (err) {
                    console.log(err)
                    return res.status(400).json({
                        status: "failure",
                        message: __("INTERNAL_DB_ERROR")
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: __("INSURANCE_ADDED"),
                        data: resp
                    });
                }
            });
        } catch (error) {

            res.status(500).json({ status: "failure", message: __("INTERNAL_SERVER_ERROR") });
            throw new Error(error)
        }
    },
    editInsurance: async (req, res) => {
        try {
            let data = req.body;

            let params = [
                { value: data.insuranceId, type: "string", title: __("insuranceId"), required: true },
                { value: data.periodType, type: "string", title: __("periodType"), required: true },
                { value: data.locations, type: "object", title: __("locations"), required: true },
                { value: data.tasks, type: "object", title: __("tasks"), required: true },
                { value: data.serviceProviders, type: "object", title: __("serviceProviders"), required: true },
                { value: data.schedule, type: "object", title: __("schedule"), required: false },
                { value: data.schedule?.startDate, type: "string", title: __("startDate"), required: false },
                { value: data.schedule?.endDate, type: "string", title: __("endDate"), required: false },
                { value: data.schedule?.startTime, type: "string", title: __("startTime"), required: false },
                { value: data.schedule?.endTime, type: "string", title: __("endTime"), required: false },
                { value: data.schedule?.defaultInsuranceAfterScheduleEnds, type: "string", title: __("defaultInsuranceAfterScheduleEnds"), required: false },
                { value: data.period, type: "object", title: __("period"), required: true },
                { value: data.period?.startDate, type: "string", title: __("startDate"), required: false },
                { value: data.period?.endDate, type: "string", title: __("endDate"), required: false },
                { value: data.period?.startTime, type: "string", title: __("startTime"), required: false },
                { value: data.period?.endTime, type: "string", title: __("endTime"), required: false },
                { value: data.period?.minutes, type: "number", title: __("hours"), required: false },
                { value: data.period?.hours, type: "number", title: __("minutes"), required: false },
                { value: data.period?.days, type: "number", title: __("days"), required: false },
                { value: data.period?.weeks, type: "number", title: __("weeks"), required: false },
                { value: data.period?.months, type: "number", title: __("months"), required: false },
                { value: data.period?.years, type: "number", title: __("years"), required: false },
                { value: data.no_of_level, type: "number", title: __("no_of_level"), required: true },
                { value: data.levels, type: "object", title: __("levels"), required: true },
                { value: data.hintMessage, type: "string", title: __("hintMessage"), required: false },
                { value: data.amountChargedToProvider, type: "object", title: __("amountChargedToProvider"), required: true }
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }
            //checking warranty is already added or not
            let insuranceDetails = await Insurance.insuranceById({ _id: data.insuranceId });
            if (!insuranceDetails) {
                return res.status(400).json({
                    status: "failure",
                    message: __("NO_RECORD_FOUND"),
                    data: insuranceDetails
                });
            }
            const queryData = {
                _id: { $ne: data.insuranceId },
                insuranceName: data.insuranceName
            }
            let userc = await Insurance.countInsurance(queryData);

            if (userc) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("INSURANCE_ALREADY_EXIST")
                });
            }
            let insuranceData = {
                userId: req.user._id,
                insuranceName: data.insuranceName,
                periodType: data.periodType,
                filteredOptions: data.filteredOptions,
                selectedData: data?.selectedData,
                locations: data.locations,
                tasks: data.tasks,
                serviceProviders: data.serviceProviders,

                period: data.period,
                no_of_level: data.no_of_level,
                levels: data.levels,
                hintMessage: data.hintMessage,
                amountChargedToProvider: data.amountChargedToProvider,
                modifiedBy: req.user.userType,

                updatedAt: new Date()
            };
            insuranceData.schedule = {
                startDate: data.schedule?.startDate,
                endDate: data.schedule?.endDate,
                startTime: data.schedule?.startTime,
                endTime: data.schedule?.endTime

            }
            if (data.schedule?.defaultWarrantyAfterScheduleEnds) {
                insuranceData.schedule.defaultWarrantyAfterScheduleEnds = data.schedule?.defaultWarrantyAfterScheduleEnds
            }

            if (data.periodType == "date_time") {
                insuranceData.period = {
                    startDate: data.period?.startDate,
                    endDate: data.period?.endDate,
                    startTime: data.period?.startTime,
                    endTime: data.period?.endTime
                }

            }
            if (data.periodType == "duration") {
                insuranceData.period = {
                    hours: data.period?.hours,
                    minutes: data.period?.minutes,
                    days: data.period?.days,
                    weeks: data.period?.weeks,
                    months: data.period?.months,
                    years: data.period?.years
                }
            }

            Insurance.editInsurance(data.insuranceId, insuranceData, async (err, resp) => {
                if (err) {

                    return res.status(400).json({
                        status: "failure",
                        message: __("INTERNAL_DB_ERROR")
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: __("INSURANCE_UPDATED"),
                        data: resp
                    });
                }
            });
        } catch (error) {

            res.status(500).json({ status: "failure", message: __("INTERNAL_SERVER_ERROR") });
            throw new Error(error)
        }
    },
    getInsuranceWithFilter: async (req, res) => {
        try {
            let data = req.body;
            let limit = data.limit;
            let sortField = data.sortField;
            let sortOrder = parseInt(data.sortOrder);

            let filter_option = {};

            if (data.insurance) {
                filter_option.insuranceName = { $regex: data.insurance.trim(), $options: 'i' }
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
            if (data.no_of_level) {
                filter_option.no_of_level = data.no_of_level
            }
            let page = 0;
            if (data.page >= 0) {
                if (data.page > 0) {
                    page = data.page - 1;
                }

                let insurance = await Insurance.getInsuranceWIthFilter(filter_option, limit, page, sortField, sortOrder);
                if (!insurance) {
                    return res.status(400).json({
                        status: "failure",
                        message: "Not found",
                        data: "",
                        total: 0
                    });
                }

                let total = await Insurance.insuranceFilterCount(filter_option);

                let total_data_in_application = await Insurance.getTotalInsurance();

                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: insurance,
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
    getInsuranceById: async (req, res) => {
        try {
            let insuranceId = req.params.insuranceId;
            let params = [
                {
                    value: insuranceId,
                    type: "string",
                    title: __("insuranceId"),
                    required: true
                }
            ];
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            let insuranceData = await Insurance.insuranceById({ _id: insuranceId });
            if (!insuranceData) {
                return res.status(400).json({
                    status: "failure",
                    message: __("NO_RECORD_FOUND"),
                    data: insuranceData
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: insuranceData
                });
            }
        } catch (error) {

            res.status(500).json({ status: "failure", message: __("INTERNAL_SERVER_ERROR") });
            throw new Error(error)
        }
    },
    editInsuranceStatus: async (req, res) => {
        try {

            let data = req.body;
            let insuranceId = req.params.insuranceId;
            let params = [
                {
                    value: insuranceId,
                    type: "string",
                    title: __("insuranceId"),
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
            let insuranceDetails = await Insurance.insuranceById({ _id: insuranceId });
            if (!insuranceDetails) {
                return res.status(400).json({
                    status: "failure",
                    message: __("NO_RECORD_FOUND"),
                    data: insuranceDetails
                });
            }
            Insurance.statusUpdate({ insuranceId: insuranceId, status: data.status }, async (err, resp) => {
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

    deleteInsurance: async (req, res) => {
        try {

            let insuranceId = req.params.insuranceId;
            let params = [
                {
                    value: insuranceId,
                    type: "string",
                    title: __("insuranceId"),
                    required: true
                }
            ];
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }
            let insuranceDetails = await Insurance.insuranceById({ _id: insuranceId });
            if (!insuranceDetails) {
                return res.status(400).json({
                    status: "failure",
                    message: __("NO_RECORD_FOUND"),
                    data: insuranceDetails
                });
            }
            let insuranceData = await Insurance.insuranceDelete({ _id: insuranceId });
            return res.status(200).json({
                status: "success",
                message: "",
                data: insuranceData
            });
        } catch (error) {

            res.status(500).json({ status: "failure", message: __("INTERNAL_SERVER_ERROR") });
            throw new Error(error)
        }
    }

}