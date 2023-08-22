 
const mongoose = require("mongoose");
const Country = require('../models/countrySchema');
const Governate = require('../models/governateSchema');
const District = require('../models/districtSchema');
const Region = require('../models/regionSchema');
const City = require('../models/citySchema');
const Language = require('../models/languageSchema');
const validation = require("../helper/validator.js");
const { __ } = require("i18n");

module.exports = {
    addGovernate: async (req, res) => {
        try {
            let data = req.body;


            let params = [
                {
                    value: data.name,
                    type: "object",
                    title: __("name"),
                    required: true
                },
                {
                    value: data.countryId,
                    type: "string",
                    title: __("countryId"),
                    required: true
                },
                {
                    value: data.status,
                    type: "string",
                    title: __("status"),
                    required: true
                }
            ];

            var checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }

            let getAllLanguage = await Language.getAllLanguageCode();

            if (getAllLanguage.length <= 0) {
                return res.status(400).json({
                    status: "failure",
                    message: __("PLEASE_ADD_LANGUAGE")
                });
            }

            getAllLanguage.forEach((element) => {
                let name = data.name[element.languageCode];
                let title = element.languageName + " name";
                params.push({
                    value: name,
                    type: "string",
                    title: title,
                    required: true
                });
            });

            //checking validation
            checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }

            let queryData = {
                $or: [
                    {
                        "name.en": data.name.en
                    },
                    {
                        "name.ar": data.name.ar
                    }
                ]
            }
            let checkCountry = await Governate.countGovernate(queryData);
            if (checkCountry) {
                return res.status(400).json({
                    status: "failure",
                    message: __("GOVERNATE_ALREADY_EXIST")
                });
            }

            let governateData = {
                name: data.name,
                countryId: data.countryId,
                status: data.status,
                addedBy: req.user.userType,
                userId: req.user._id,

                createdAt: new Date(),
                updatedAt: new Date()
            };

            //Creating governate
            Governate.addGovernate(governateData, async (err, resp) => {
                if (err) {

                    return res.status(400).json({
                        status: "failure",
                        message: __("INTERNAL_DB_ERROR")
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: __("GOVERNATE_ADDED"),
                        data: resp
                    });
                }
            });
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    editGovernate: async (req, res) => {
        try {
            let data = req.body;


            let params = [
                {
                    value: data.name,
                    type: "object",
                    title: __("name"),
                    required: true
                },
                {
                    value: data.countryId,
                    type: "string",
                    title: __("countryId"),
                    required: true
                },
                {
                    value: data.governateId,
                    type: "string",
                    title: __("governateId"),
                    required: true
                },
                {
                    value: data.status,
                    type: "string",
                    title: __("status"),
                    required: true
                }
            ];

            var checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }

            let getAllLanguage = await Language.getAllLanguageCode();

            if (getAllLanguage.length <= 0) {
                return res.status(400).json({
                    status: "failure",
                    message: __("PLEASE_ADD_LANGUAGE")
                });
            }

            getAllLanguage.forEach((element3) => {
                let name = data.name[element3.languageCode];
                let title = element3.languageName + " name";
                params.push({
                    value: name,
                    type: "string",
                    title: title,
                    required: true
                });
            });

            //checking validation
            checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }

            let queryData = {
                _id: { $ne: data.governateId },
                $or: [
                    {
                        "name.en": data.name.en
                    },
                    {
                        "name.ar": data.name.ar
                    }
                ]
            }
            let checkCountry = await Governate.countGovernate(queryData);
            if (checkCountry) {
                return res.status(400).json({
                    status: "failure",
                    message: __("GOVERNATE_ALREADY_EXIST")
                });
            }

            let governateData = {
                name: data.name,
                countryId: data.countryId,
                governateId: data.governateId,
                status: data.status,

                updatedAt: new Date()

            };

            //checking country is used in regions or not when deactivate country
            if (data.status.toLowerCase() == 'inactive') {
                let isUsed = await Region.getRegionByGovernateId(data.governateId);
                if (isUsed) {
                    return res.status(400).json({ status: "failure", message: __("GOVERNATE_CAN_NOT_DEACTIVATE") });
                }
            }

            //Creating governate
            Governate.editGovernate(governateData, async (err, resp) => {
                if (err) {

                    return res.status(400).json({
                        status: "failure",
                        message: __("INTERNAL_DB_ERROR")
                    });
                } else {
                    if (data.status.toLowerCase() == 'inactive') {
                        City.updateCityByGovernate(data.governateId, data.status);
                        await District.updateDistrictByGovernate(data.governateId, data.status);
                    }

                    return res.status(200).json({
                        status: "success",
                        message: __("GOVERNATE_UPDATED"),
                        data: resp
                    });
                }
            });
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getGovernates: async (req, res) => {
        try {
            let governateLists = await Governate.getGovernates();

            if (governateLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: governateLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: governateLists
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getGovernatesByFilter: async (req, res) => {
        try {
            let data = req.body;

            let params = [
                {
                    value: data.language,
                    type: "string",
                    title: __("language"),
                    required: true
                },
                {
                    value: data.country,
                    type: "string",
                    title: __("country"),
                    required: false
                },
                {
                    value: data.governate,
                    type: "string",
                    title: __("governate"),
                    required: false
                },
                {
                    value: data.page,
                    type: "number",
                    title: __("page"),
                    required: false
                },
                {
                    value: data.limit,
                    type: "number",
                    title: __("limit"),
                    required: false
                }
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }

            const languageCode = `name.${data.language}`;

            if (data.country) {
                const country_criteria = {
                    [languageCode]: data.country
                };
                data.country_criteria = country_criteria;
            }

            if (data.governate) {
                const governate_criteria = {
                    [languageCode]: data.governate
                };
                data.governate_criteria = governate_criteria;
            }
            const governateLists = await Governate.filterGovernates(data);
            if (governateLists.data.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: governateLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: governateLists
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getGovernatesByCountryId: async (req, res) => {
        try {
            let data = req.params;

            let params = [
                {
                    value: data.countryId,
                    type: "string",
                    title: __("countryId"),
                    required: true
                }
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }
            let governateLists = await Governate.getGovernatesByCountryId({
                countryId: data.countryId
            });
            if (governateLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: governateLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: governateLists
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getActiveGovernatesByCountryId: async (req, res) => {
        try {
            let data = req.params;

            let params = [
                {
                    value: data.countryId,
                    type: "string",
                    title: __("countryId"),
                    required: true
                }
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }
            let governateLists = await Governate.getActiveGovernatesByCountryId({
                countryId: data.countryId
            });
            if (governateLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: governateLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: governateLists
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getActiveGovernates: async (req, res) => {
        try {
            let governateLists = await Governate.getActiveGovernates();
            if (governateLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: governateLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: governateLists
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getGovernateById: async (req, res) => {
        try {
            let governateId = req.params.governateId;
            let params = [
                {
                    value: governateId,
                    type: "string",
                    title: __("governateId"),
                    required: true
                }
            ];
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }

            let governateDetails = await Governate.getGovernateById(
                governateId
            );
            if (governateDetails) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: governateDetails
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: governateDetails
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    removeGovernateById: async (req, res) => {
        try {
            let governateId = req.params.governateId;
            let params = [
                {
                    value: governateId,
                    type: "string",
                    title: __("governateId"),
                    required: true
                }
            ];
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            var governateDetails = await Governate.getGovernateById(governateId);
            if (!governateDetails) {
                return res.status(400).json({
                    status: "failure",
                    message: __("NO_RECORD_FOUND"),
                    data: governateDetails
                });
            }

            //checking country is used in regions or not when DELETEING country
            let isUsed = await Region.getRegionByGovernateId(governateId);
            if (isUsed) {
                return res.status(400).json({ status: "failure", message: __("GOVERNATE_IS_USED_IN_REGIONS") });
            }
            governateDetails = await Governate.removeGovernate(governateId);
            if (governateDetails) {
                await City.removeCityByGovernate(governateId);
                await District.removeDistrictByGovernate(governateId);
                return res.status(200).json({
                    status: "success",
                    message: __("GOVERNATE_REMOVED"),
                    data: ""
                });
            } else {
                return res.status(400).json({
                    status: "failure",
                    message: __("INTERNAL_DB_ERROR")
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getGovernatesByCountryIdList: async (req, res) => {
        try {
            let data = req.body
            const governates = await Governate.governatesByCountryList(data?.countryId);

            return res.status(200).json({
                status: "success",
                message: "",
                data: governates
            });
        } catch (error) {

            res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error)
        }
    }

};
