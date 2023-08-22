 
const mongoose = require('mongoose');
const User = require('../models/userSchema');
const Region = require('../models/regionSchema');
const Service = require('../models/serviceSchema');
const Task = require('../models/taskSchema');
const CompanyEmployee = require('../models/companyEmployeeSchema');
const validation = require('../helper/validator.js');
const jwt = require('jsonwebtoken');
const { __ } = require('i18n');


module.exports = {
    getProvidersWithFilter: async (req, res) => {
        try {
            let data = req.body;

            let params = [
                { value: data.language, type: "string", title: __("language"), required: true },
                { value: data.name, type: "string", title: __("name"), required: false },

                { value: data.page, type: "number", title: __("page"), required: true },
                { value: data.limit, type: "number", title: __("limit"), required: true },
                { value: data.sortField, type: "string", title: __("sortField"), required: true },
                { value: data.sortOrder, type: "number", title: __("sortOrder"), required: true }
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }


            let provider_criteria = {
                userType: {
                    $in: ['COMPANY', 'INDIVIDUAL']
                }
            }


            if (data.provider) {
                provider_criteria.$or = [
                    {
                        "name": { $regex: data.provider.trim(), $options: 'i' }
                    },
                    {
                        "email": { $regex: data.provider.trim(), $options: 'i' }
                    },
                    {
                        "mobileNumber": { $regex: data.provider.trim(), $options: 'i' }
                    }
                ]

            }

            data.provider_criteria = provider_criteria;

            const userLists = await User.getProvidersWithFilter(data);
            if (userLists.data.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: userLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: userLists
                });
            }
        } catch (error) {

            res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error)
        }
    },
    approveProvider: async (req, res) => {
        try {
            let data = req.body;

            let params = [
                { value: data.userId, type: "string", title: __("userId"), required: true },
                { value: data.accountStatus, type: "string", title: __("AccountStatus"), required: false }
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            const userDetails = await User.findIndividual({ _id: data.userId });

            if (userDetails.accountStatus == "approved") {
                return res.status(400).json({
                    status: "failure",
                    message: __("ALREADY_APPROVED"),
                    data: ''
                });
            }
            //approve provider account
            if (data.accountStatus.toLowerCase() == 'approved') {
                data.status = 'active'
            }

            const approveProvider = await User.approveProviderById(data);
            if (approveProvider) {
                return res.status(200).json({
                    status: "success",
                    message: __("PROVIDER_APPROVED"),
                    data: ""
                });
            } else {
                return res.status(400).json({
                    status: "failure",
                    message: __("NO_RECORD_FOUND"),
                    data: ''
                });
            }
        } catch (error) {

            res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error)
        }
    },
    blockProvider: async (req, res) => {
        try {
            let data = req.body;

            let params = [
                { value: data.userId, type: "string", title: __("userId"), required: true },
                { value: data.status, type: "string", title: __("status"), required: false }
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            let msg = data.status.toLowerCase() == 'blocked' ? __("PROVIDER_BLOCKED") : __('PROVIDER_UNBLOCKED')

            const blockProvider = await User.blockProviderById(data);
            if (blockProvider) {
                return res.status(200).json({
                    status: "success",
                    message: msg,
                    data: ""
                });
            } else {
                return res.status(400).json({
                    status: "failure",
                    message: __("NO_RECORD_FOUND"),
                    data: ''
                });
            }
        } catch (error) {

            res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error)
        }
    },
    removeProvider: async (req, res) => {
        try {
            let data = req.body;
            let params = [
                { value: data.userId, type: "string", title: __("userId"), required: true }
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            let checkUser = await User.findById({ _id: data.userId }).select('_id userType');
            if (!checkUser) {
                return res.status(400).send({
                    status: "failure",
                    message: __("USER_NOT_FOUND"),
                    data: ""
                })
            }

            await Promise.all([
                User.removeProviderById(data),
                Region.removeRegionByUserId(data),
                CompanyEmployee.removeJoinRequestByProviderId(data)
            ])

            res.status(200).json({
                status: "success",
                message: __("PROVIDER_REMOVED"),
                data: ""
            });

        } catch (error) {

            res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error)
        }
    },
    getApprovedServiceProvider: async (req, res) => {
        try {

            let query = {
                accountStatus: "approved",
                userType: {
                    $in: ['COMPANY', 'INDIVIDUAL']
                }
            }
            let providers = await User.findApprovedProvider(query)
            if (!providers) {
                return res.status(400).send({
                    status: "failure",
                    message: __("USER_NOT_FOUND"),
                    data: ""
                })
            }

            res.status(200).json({
                status: "success",
                message: __(""),
                data: providers
            });

        } catch (error) {

            res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error)
        }
    },
}