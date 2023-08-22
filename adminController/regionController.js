 
const mongoose = require("mongoose");
const Region = require('../models/regionSchema');
const validation = require("../helper/validator.js");
const { __ } = require("i18n");

module.exports = {
    addRegion: async (req, res) => {
        try {
            let data = req.body;


            let params = [
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
                    value: data.cityId,
                    type: "string",
                    title: __("cityId"),
                    required: true
                },
                {
                    value: data.districtId,
                    type: "string",
                    title: __("districtId"),
                    required: true
                },
                {
                    value: data.status,
                    type: "string",
                    title: __("status"),
                    required: true
                }

            ];

            //checking validation
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }

            let queryData = {
                countryId: data.countryId,
                governateId: data.governateId,
                districtId: data.districtId,
                cityId: data.cityId
            }
            let userc = await Region.countRegion(queryData);
            if (userc) {
                return res.status(400).json({
                    status: "failure",
                    message: __("REGION_ALREADY_EXIST")
                });
            }

            let serviceData = {
                userId: req.user._id,
                countryId: data.countryId,
                governateId: data.governateId,
                cityId: data.cityId,
                districtId: data.districtId,
                addedBy: req.user.userType,
                status: data.status,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            //Creating Provider if not registered before
            Region.addRegion(serviceData, async (err, resp) => {
                if (err) {

                    return res.status(400).json({
                        status: "failure",
                        message: __("INTERNAL_DB_ERROR")
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: __("REGION_ADDED"),
                        data: resp
                    });
                }
            });
        } catch (error) {

            return res.status(500).json({
                status: "success",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    editRegion: async (req, res) => {
        try {
            let data = req.body;


            let params = [
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
                    value: data.cityId,
                    type: "string",
                    title: __("cityId"),
                    required: true
                },
                {
                    value: data.districtId,
                    type: "string",
                    title: __("districtId"),
                    required: true
                },
                {
                    value: data.regionId,
                    type: "string",
                    title: __("regionId"),
                    required: true
                },
                {
                    value: data.status,
                    type: "string",
                    title: __("status"),
                    required: true
                }

            ];

            //checking validation
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }

            let queryData = {
                _id: { $ne: data.regionId },
                countryId: data.countryId,
                governateId: data.governateId,
                cityId: data.cityId,
                districtId: data.districtId
            }
            let userc = await Region.countRegion(queryData);
            if (userc) {
                return res.status(400).json({
                    status: "failure",
                    message: __("REGION_ALREADY_EXIST")
                });
            }

            let regionData = {
                userId: req.user._id,
                countryId: data.countryId,
                governateId: data.governateId,
                cityId: data.cityId,
                districtId: data.districtId,
                regionId: data.regionId,
                status: data.status,

                updatedAt: new Date()

            };

            //Creating Provider if not registered before
            Region.editRegion(regionData, async (err, resp) => {
                if (err) {

                    return res.status(400).json({
                        status: "failure",
                        message: __("INTERNAL_DB_ERROR")
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: __("REGION_UPDATED"),
                        data: resp
                    });
                }
            });
        } catch (error) {

            return res.status(500).json({
                status: "success",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getAllRegions: async (req, res) => {
        try {
            let regionsLists = await Region.getRegions();
            if (regionsLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: regionsLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: regionsLists
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getAllRegionsByFilter: async (req, res) => {
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
                    value: data.district,
                    type: "string",
                    title: __("district"),
                    required: false
                },
                {
                    value: data.city,
                    type: "string",
                    title: __("city"),
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
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            const languageCode = `name.${data.language}`;

            //filter with country
            if (data.country) {
                const country_criteria = {
                    [languageCode]: data.country
                };
                data.country_criteria = country_criteria;
            }
            //filter with Governate
            if (data.governate) {
                const governate_criteria = {
                    [languageCode]: data.governate,
                    countryDetails: {
                        $ne: null
                    }
                };
                data.governate_criteria = governate_criteria;
            }
            //filter with City
            if (data.city) {
                const city_criteria = {
                    [languageCode]: data.city,
                    governateDetails: {
                        $ne: null
                    }
                };
                data.city_criteria = city_criteria;
            }
            //filter with District
            if (data.district) {
                const district_criteria = {
                    [languageCode]: data.district,
                    cityDetails: {
                        $ne: null
                    }
                };
                data.district_criteria = district_criteria;
            }
            const regionLists = await Region.filterRegions(data);
            if (regionLists.data.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: regionLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: regionLists
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getActiveRegions: async (req, res) => {
        try {
            let regionsLists = await Region.getActiveRegions();
            if (regionsLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: regionsLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: regionsLists
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getRegionById: async (req, res) => {
        try {
            let regionId = req.params.regionId;
            let params = [
                {
                    value: regionId,
                    type: "string",
                    title: __("regionId"),
                    required: true
                }
            ];
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }

            let regionDetails = await Region.getRegionById(regionId);
            if (regionDetails) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: regionDetails
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: regionDetails
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    removeRegionById: async (req, res) => {
        try {
            let regionId = req.params.regionId;
            let params = [
                {
                    value: regionId,
                    type: "string",
                    title: __("regionId"),
                    required: true
                }
            ];
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }

            var regionDetails = await Region.getRegionById(regionId);
            if (!regionDetails) {
                return res.status(400).json({
                    status: "failure",
                    message: __("NO_RECORD_FOUND"),
                    data: regionDetails
                });
            }
            regionDetails = await Region.removeRegion({ _id: regionId });
            if (regionDetails) {
                return res.status(200).json({
                    status: "success",
                    message: __("REGION_REMOVED"),
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
    }
};
