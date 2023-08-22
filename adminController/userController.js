 
const mongoose = require('mongoose');
const User = require('../models/userSchema');
const CompanyEmployee = require('../models/companyEmployeeSchema');
const validation = require('../helper/validator.js');
const { __ } = require('i18n');

module.exports = {
    getUsersWithFilter: async (req, res) => {
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




            const user_criteria = {
                userType: {
                    $in: ['USER']
                }
            }

            if (data.user) {

                user_criteria.$or = [
                    {
                        "name": { $regex: data.user.trim(), $options: 'i' }
                    },
                    {
                        "email": { $regex: data.user.trim(), $options: 'i' }
                    },
                    {
                        "mobileNumber": { $regex: data.user.trim(), $options: 'i' }
                    }
                ]
            }
            data.user_criteria = user_criteria;

            const userLists = await User.getUsersWithFilter(data);
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
    approveUser: async (req, res) => {
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

            const approveUser = await User.approveUserById(data);
            if (approveUser) {
                return res.status(200).json({
                    status: "success",
                    message: __("USER_APPROVED"),
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
    blockUser: async (req, res) => {
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

            let msg = data.status.toLowerCase() == 'blocked' ? __("USER_BLOCKED") : __('USER_UNBLOCKED')

            const blockUser = await User.blockUserById(data);
            if (blockUser) {
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
    removeUser: async (req, res) => {
        try {
            let data = req.body;

            let params = [
                { value: data.userId, type: "string", title: __("userId"), required: true }
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            await Promise.all([
                User.removeUserById(data)
            ])

            res.status(200).json({
                status: "success",
                message: __("USER_REMOVED"),
                data: ""
            });

        } catch (error) {
            console.log(error)
            res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error)
        }
    },
    getUserByServiceLocation: async (req, res) => {
        try {
            let data = req.body
            let params = [{ value: data.serviceId, type: "string", title: __("serviceId"), required: true }]

            if (data.countryId) {
                params = [
                    ...params,
                    { value: data.countryId, type: "string", title: __("countryId"), required: true },
                ];
            } else if (data.governateId) {
                params = [
                    ...params,
                    { value: data.governateId, type: "string", title: __("governateId"), required: true }
                ];
            } else if (data.cityId) {
                params = [
                    ...params,
                    { value: data.cityId, type: "string", title: __("cityId"), required: true }
                ];
            } else {
                params = [
                    ...params,
                    { value: data.districtId, type: "string", title: __("districtId"), required: true }]
            }

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }
            const userCount = await User.getUserCountOnLocation(data);

            return res.status(200).json({
                status: "success",
                message: "",
                data: userCount
            });
        } catch (error) {

            res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error)
        }
    },
    getServiceProviderByServiceIdList: async (req, res) => {
        try {
            let data = req.body
            const providers = await User.serviceProviderByServiceIdList(data?.serviceId);

            return res.status(200).json({
                status: "success",
                message: "",
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
    getAdminsAndProviders: async (req, res) => {
        try {
            let query = {

                userType: {
                    $in: ["ADMIN", "SUBADMIN", "SUPERADMIN", "COMPANY", "INDIVIDUAL"]
                }
            }
            let user = await User.findAdminsAndProviders(query)
            if (!user) {
                return res.status(400).send({
                    status: "failure",
                    message: __("USER_NOT_FOUND"),
                    data: ""
                })
            }

            res.status(200).json({
                status: "success",
                message: __(""),
                data: user
            });
        } catch (error) {

            res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error)
        }
    }

}
