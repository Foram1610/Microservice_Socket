
const mongoose = require("mongoose");
const User = require('../models/userSchema')
const CompanyEmployee = require('../models/companyEmployeeSchema')
const validation = require("../helper/validator.js");
const { __ } = require("i18n");

module.exports = {
    getCompanyByUniqueId: async (req, res) => {
        let data = req.body;
        let params = [

            {
                value: data.companyUniqueId,
                type: "string",
                title: __("companyUniqueId"),
                required: true,
            },
        ];

        let checkErr = await validation(params);
        if (!checkErr.status) {
            return res.status(400).json({
                status: "failure",
                statusCode: 400,
                message: checkErr.message,
            });
        }

        let companyDetails = await User.getCompanyByUniqueId(data);
        if (companyDetails) {
            return res.status(200).json({
                status: "success",
                statusCode: 200,
                message: "",
                data: companyDetails,
            });
        } else {
            return res.status(400).json({
                status: "failure",
                statusCode: 400,
                message: __("NO_RECORD_FOUND"),
            });
        }
    },
    getIndividualByUniqueId: async (req, res) => {
        let data = req.body;
        let params = [

            {
                value: data.individualUniqueId,
                type: "string",
                title: __("individualUniqueId"),
                required: true,
            },
        ];

        let checkErr = await validation(params);
        if (!checkErr.status) {
            return res.status(400).json({
                status: "failure",
                statusCode: 400,
                message: checkErr.message
            });
        }

        let companyDetails = await User.getIndividualByUniqueId(data);
        if (companyDetails) {
            return res.status(200).json({
                status: "success",
                statusCode: 200,
                message: "",
                data: companyDetails
            });
        } else {
            return res.status(400).json({
                status: "failure",
                statusCode: 400,
                message: __("NO_RECORD_FOUND")
            });
        }
    },
    //added by company
    joinToCompany: async (req, res) => {
        try {
            let data = req.body;
            let individualId = req.user._id;
            let params = [
                {
                    value: data.companyId,
                    type: "string",
                    title: __("companyId"),
                    required: true
                }
            ];

            //checking validation
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: checkErr.message
                });
            }

            let checkIndividual = await User.findOne({
                _id: individualId,
                status: "active",
                isDeleted: false
            });
            if (!checkIndividual) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("INVALID_INDIVIDUAL_ID")
                });
            }

            let checkRequest = await CompanyEmployee.findOne({
                individualId: individualId,
                requestStatus: "accepted"
            });
            if (checkRequest) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("YOU_ALREADY_JOINED_COMPANY")// you already joined
                });
            }

            let checkRequestStatus = await CompanyEmployee.findEmployee({
                individualId: individualId,
                companyId: data.companyId,
                requestStatus: "pending"
            });

            if (checkRequestStatus) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("YOU_HAVE_ALREADY_REQUESTED_THIS_COMPANY") //
                });
            }

            let employeeData = {
                individualId: individualId,
                companyId: data.companyId,
                requestStatus: "pending", //when company add SP it will be pre Accepted
                status: "active",
                requestedBy: req.user.userType,
                createdAt: new Date(),
                isDeleted: false,
            };
            await CompanyEmployee.addRequest(
                employeeData,
                function (error, resp) {
                    if (error) {

                        res.status(400).json({
                            status: "success",
                            statusCode: 400,
                            message: __("INTERNAL_DATABASE_ERROR"),
                        });
                        throw new Error(error);
                    } else {
                        return res.status(200).json({
                            status: "success",
                            statusCode: 200,
                            message: __("SP_JOINED_REQUEST_SUBMITTED"),
                            data: resp,
                        });
                    }
                }
            );
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR"),
            });
            throw new Error(error);
        }
    },
    //added by company
    addEmployeeToCompany: async (req, res) => {
        try {
            let data = req.body;
            let companyId = req.user._id;
            let params = [

                {
                    value: data.individualId,
                    type: "string",
                    title: __("individualId"),
                    required: true,
                },
            ];

            //checking validation
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: checkErr.message,
                });
            }

            let checkIndividual = await User.findIndividual({
                _id: data.individualId,
                status: "active",
                isDeleted: false,
            });
            if (!checkIndividual) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("INVALID_INDIVIDUAL_ID")
                });
            }

            let checkRequest = await CompanyEmployee.findEmployee({
                individualId: data.individualId,
                requestStatus: "accepted"
            });
            if (checkRequest) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("SP_ALREADY_JOINED_COMPANY")
                });
            }

            let checkRequestStatus = await CompanyEmployee.findEmployee({
                individualId: data.individualId,
                companyId: companyId,
                requestStatus: "pending"
            });

            if (checkRequestStatus) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("YOU_HAVE_ALREADY_REQUESTED_THIS_PROVIDER")
                });
            }

            let employeeData = {
                individualId: data.individualId,
                companyId: companyId,
                requestStatus: "pending", //when company add SP it will be pre Accepted
                status: "active",
                requestedBy: req.user.userType,
                createdAt: new Date(),
                isDeleted: false,
            };
            await CompanyEmployee.addRequest(
                employeeData,
                function (err, resp) {
                    if (err) {

                        res.status(400).json({
                            status: "success",
                            statusCode: 400,
                            message: __("INTERNAL_DATABASE_ERROR")
                        });
                        throw new Error(err);
                    } else {
                        return res.status(200).json({
                            status: "success",
                            statusCode: 200,
                            message: __("SP_JOINED_REQUEST_SUBMITTED"),
                            data: resp
                        });
                    }
                }
            );
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error);
        }
    },
    //join by individual
    joinEmployeeToCompany: async (req, res) => {
        try {
            let data = req.body;
            let params = [

                {
                    value: data.companyId,
                    type: "string",
                    title: __("companyId"),
                    required: true
                }
            ];

            //checking validation
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: checkErr.message
                });
            }

            let checkCompany = await User.findIndividual({
                _id: data.companyId,
                status: "active",
                isDeleted: false
            });
            if (!checkCompany) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("INVALID_COMPANY_ID")
                });
            }

            let companyId = req.user._id;
            let employeeData = {
                individualId: data.individualId,
                companyUniqueId: data.companyUniqueId,
                companyId: companyId,
                requestStatus: "accepted", //when company add SP it will be pre Accepted
                status: "active",
                requestedBy: req.user.userType,
                createdAt: new Date()
            };

            await CompanyEmployee.addRequest(
                employeeData,
                function (err, resp) {
                    if (err) {

                        res.status(400).json({
                            status: "failure",
                            statusCode: 400,
                            message: __("INTERNAL_DATABASE_ERROR"),
                        });
                        throw new Error(err);
                    } else {
                        return res.status(200).json({
                            status: "success",
                            statusCode: 200,
                            message: __("SP_JOINED_SUCCESSFULLY"),
                            data: resp
                        });
                    }
                }
            );
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR"),
            });
            throw new Error(error);
        }
    },
    searchCompanyById: async (req, res) => {
        try {
            let data = req.body;
            let params = [
                {
                    value: data.companyId,
                    type: "string",
                    title: __("companyId"),
                    required: true
                }
            ];

            //checking validation
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: checkErr.message
                });
            }

            let checkCompany = await User.findIndividual({
                _id: data.companyId,
                status: "active",
                isDeleted: false
            });

            if (!checkCompany) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("NO_RECORD_FOUND")
                });
            }

            return res.status(200).json({
                status: "success",
                statusCode: 200,
                message: "",
                data: checkCompany,
            });
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR"),
            });
            throw new Error(error);
        }
    },
    acceptRejectIndividualRequest: async (req, res) => {
        //accepted by company
        try {
            let data = req.body;
            let params = [

                {
                    value: data.status,
                    type: "string",
                    title: __("status"),
                    required: true,
                },
                {
                    value: data.requestId,
                    type: "string",
                    title: __("requestId"),
                    required: true,
                },
            ];

            //checking validation
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: checkErr.message,
                });
            }

            let checkRequest = await CompanyEmployee.findEmployee({
                _id: data.requestId,
                isDeleted: false,
            });
            if (!checkRequest) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("INVALID_REQUEST_ID"),
                });
            }

            let checkSpAvailability = await CompanyEmployee.findEmployee({
                _id: data.requestId,
                requestStatus: "pending",
                isDeleted: false,
            });
            if (!checkSpAvailability) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("SP_ALREADY_JOINED_OTHER_COMPANY")
                });
            }

            let employeeData = {
                requestId: data.requestId,
                requestStatus: data.status,
                updatedAt: new Date()
            };

            CompanyEmployee.acceptRejectRequestByCompany(
                employeeData,
                async function (err, resp) {
                    if (err) {

                        res.status(400).json({
                            status: "failure",
                            statusCode: 400,
                            message: __("INTERNAL_DATABASE_ERROR")
                        });
                        throw new Error(err);
                    } else {

                        let companyId = "";
                        let message = "";
                        if (data.status.toLowerCase() == "accepted") {
                            companyId = checkRequest.companyId;
                            message = __("SP_REQUEST_ACCEPTED_SUCCESSFULLY");
                        } else {
                            message = __("SP_REQUEST_REJECTED_SUCCESSFULLY");

                        }

                        User.assignCompanyToIndividual(
                            {
                                individualId: checkRequest.individualId,
                                companyId: companyId
                            },
                            function (error, response) {
                                if (error) {

                                    res.status(400).json({
                                        status: "failure",
                                        statusCode: 400,
                                        message: __("INTERNAL_DATABASE_ERROR")
                                    });
                                } else {
                                    res.status(200).json({
                                        status: "success",
                                        statusCode: 200,
                                        message: message,
                                        data: ""
                                    });
                                }
                            }
                        );
                    }
                }
            );
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error);
        }
    },
    acceptRejectCompanyRequest: async (req, res) => {
        //accepted by individual
        try {
            let data = req.body;
            let params = [

                {
                    value: data.status,
                    type: "string",
                    title: __("status"),
                    required: true
                },
                {
                    value: data.requestId,
                    type: "string",
                    title: __("requestId"),
                    required: true
                }
            ];

            //checking validation
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: checkErr.message
                });
            }

            let checkRequest = await CompanyEmployee.findEmployee({
                _id: data.requestId,
                isDeleted: false
            });
            if (!checkRequest) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("INVALID_REQUEST_ID")
                });
            }

            let checkSpAvailability = await CompanyEmployee.findOne({

                individualId: checkRequest.individualId,

                requestStatus: "accepted",
                isDeleted: false
            });

            if (checkSpAvailability) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("YOU_ALREADY_JOINED_OTHER_COMPANY")
                });
            }

            let employeeData = {
                requestId: data.requestId,
                requestStatus: data.status,
                updatedAt: new Date()
            };

            CompanyEmployee.acceptRejectRequestByCompany(
                employeeData,
                async function (err, resp) {
                    if (err) {

                        res.status(400).json({
                            status: "failure",
                            statusCode: 400,
                            message: __("INTERNAL_DATABASE_ERROR"),
                        });
                        throw new Error(err);
                    } else {
                        let companyId = "";
                        let message = "";
                        if (data.status.toLowerCase() == "accepted") {
                            companyId = checkRequest.companyId;
                            message = __(
                                "COMPANY_REQUEST_ACCEPTED_SUCCESSFULLY"
                            );
                        } else {
                            message = __(
                                "COMPANY_REQUEST_REJECTED_SUCCESSFULLY"
                            );

                        }

                        User.assignCompanyToIndividual(
                            {
                                individualId: checkRequest.individualId,
                                companyId: companyId
                            },
                            function (error) {
                                if (error) {

                                    res.status(400).json({
                                        status: "failure",
                                        statusCode: 400,
                                        message: __("INTERNAL_DATABASE_ERROR"),
                                    });
                                } else {
                                    res.status(200).json({
                                        status: "success",
                                        statusCode: 200,
                                        message: message,
                                        data: "",
                                    });
                                }
                            }
                        );
                    }
                }
            );
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR"),
            });
            throw new Error(error);
        }
    },
    activeInactiveEmployee: async (req, res) => {
        //accepted by company
        try {
            let data = req.body;
            let params = [

                {
                    value: data.status,
                    type: "string",
                    title: __("status"),
                    required: true,
                },
                {
                    value: data.requestId,
                    type: "string",
                    title: __("requestId"),
                    required: true,
                },
            ];

            //checking validation
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: checkErr.message,
                });
            }

            let checkRequest = await CompanyEmployee.findEmployee({
                _id: data.requestId,
                isDeleted: false,
            });
            if (!checkRequest) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("INVALID_REQUEST_ID"),
                });
            }

            let employeeData = {
                requestId: data.requestId,
                status: data.status,

            };

            CompanyEmployee.activeInactiveRequest(
                employeeData,
                async function (err, resp) {
                    if (err) {

                        res.status(400).json({
                            status: "failure",
                            statusCode: 400,
                            message: __("INTERNAL_DATABASE_ERROR"),
                        });
                        throw new Error(err);
                    } else {
                        let message = "";
                        if (data.status.toLowerCase() == "active") {
                            message = __("SP_ACTIVATE_SUCCESSFULLY");
                        } else {
                            message = __("SP_DEACTIVATE_SUCCESSFULLY");
                        }

                        return res.status(200).json({
                            status: "success",
                            statusCode: 200,
                            message: message,
                            data: "",
                        });
                    }
                }
            );
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR"),
            });
            throw new Error(error);
        }
    },
    exitSpFromCompany: async (req, res) => {
        //accepted by individual
        try {
            let data = req.body;
            let params = [
                {
                    value: data.requestId,
                    type: "string",
                    title: __("requestId"),
                    required: true,
                },
            ];

            //checking validation
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: checkErr.message,
                });
            }

            let checkRequest = await CompanyEmployee.findEmployee({
                _id: data.requestId,
                isDeleted: false,
            });
            if (!checkRequest) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("INVALID_REQUEST_ID"),
                });
            }

            let employeeData = {
                requestId: data.requestId,
            };

            CompanyEmployee.removeRequestById(
                employeeData,
                async function (err, resp) {
                    if (err) {

                        res.status(400).json({
                            status: "failure",
                            statusCode: 400,
                            message: __("INTERNAL_DATABASE_ERROR"),
                        });
                        throw new Error(err);
                    } else {
                        User.removeCompanyFromIndividual(
                            { individualId: checkRequest.individualId },
                            function (error) {
                                if (error) {

                                    res.status(400).json({
                                        status: "failure",
                                        statusCode: 400,
                                        message: __("INTERNAL_DATABASE_ERROR"),
                                    });
                                } else {
                                    res.status(200).json({
                                        status: "success",
                                        statusCode: 200,
                                        message: __(
                                            "COMPANY_REMOVED_SUCCESSFULLY"
                                        ),
                                        data: "",
                                    });
                                }
                            }
                        );
                    }
                }
            );
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR"),
            });
            throw new Error(error);
        }
    },
    removeSpFromCompany: async (req, res) => {
        //accepted by individual
        try {
            let data = req.body;
            let params = [
                {
                    value: data.requestId,
                    type: "string",
                    title: __("requestId"),
                    required: true,
                },
            ];

            //checking validation
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: checkErr.message,
                });
            }

            let checkRequest = await CompanyEmployee.findEmployee({
                _id: data.requestId,
                isDeleted: false,
            });
            if (!checkRequest) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("INVALID_REQUEST_ID"),
                });
            }

            let employeeData = {
                requestId: data.requestId,
            };

            CompanyEmployee.removeRequestById(
                employeeData,
                async function (err, resp) {
                    if (err) {

                        res.status(400).json({
                            status: "failure",
                            statusCode: 400,
                            message: __("INTERNAL_DATABASE_ERROR"),
                        });
                        throw new Error(err);
                    } else {
                        User.removeCompanyFromIndividual(
                            { individualId: checkRequest.individualId },
                            function (error) {
                                if (error) {
                                    res.status(400).json({
                                        status: "failure",
                                        statusCode: 400,
                                        message: __("INTERNAL_DATABASE_ERROR"),
                                    });
                                } else {
                                    res.status(200).json({
                                        status: "success",
                                        statusCode: 200,
                                        message: __("SP_REMOVED_SUCCESSFULLY"),
                                        data: ""
                                    });
                                }
                            }
                        );
                    }
                }
            );
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR"),
            });
            throw new Error(error);
        }
    },
    getCompanyPendingRequest: async (req, res) => {
        try {
            let companyId = req.user._id;

            let pendingRequest = await CompanyEmployee.getCompanyPendingRequest(
                { companyId: companyId }
            );
            if (pendingRequest.length > 0) {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: "",
                    data: pendingRequest,
                });
            } else {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("NO_RECORD_FOUND"),
                });
            }
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR"),
            });
            throw new Error(error);
        }
    },
    getIndividualPendingRequest: async (req, res) => {
        try {
            let individualId = req.user._id;

            let pendingRequest = await CompanyEmployee.getIndividualPendingRequest(
                { individualId: individualId }
            );
            if (pendingRequest.length > 0) {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: "",
                    data: pendingRequest,
                });
            } else {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("NO_RECORD_FOUND"),
                });
            }
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR"),
            });
            throw new Error(error);
        }
    },
    getCompanyAcceptedRequest: async (req, res) => {
        try {
            let companyId = req.user._id;


            let acceptedRequest = await CompanyEmployee.getCompanyAcceptedRequest(
                { companyId: companyId }
            );
            if (acceptedRequest.length > 0) {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: "",
                    data: acceptedRequest,
                });
            } else {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("NO_RECORD_FOUND"),
                });
            }
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR"),
            });
            throw new Error(error);
        }
    },
    getIndividualAcceptedRequest: async (req, res) => {
        try {
            let individualId = req.user._id;

            let acceptedRequest = await CompanyEmployee.getIndividualAcceptedRequest(
                { individualId: individualId }
            );
            if (acceptedRequest.length > 0) {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: "",
                    data: acceptedRequest,
                });
            } else {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("NO_RECORD_FOUND"),
                });
            }
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR"),
            });
            throw new Error(error);
        }
    },
    getProviderDetails: async (req, res) => {
        try {
            let providerId = req.params.providerId;
            let languageCode = req.languageCode;
            let providerDerails = await User.getProviderDetails({
                providerId: providerId,
                languageCode: languageCode,
            });
            if (providerDerails) {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: "",
                    data: providerDerails,
                });
            } else {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("NO_RECORD_FOUND"),
                });
            }
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR"),
            });
            throw new Error(error);
        }
    },
};
