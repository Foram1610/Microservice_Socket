 
const mongoose = require("mongoose");
const Region = require('../models/regionSchema');
const validation = require("../helper/validator.js");
const { __ } = require("i18n");

module.exports = {
    addRegion: async (req, res) => {
        try {
            let data = req.body;
            let params = [
                { value: data.countryId, type: "string", title: __("countryId"), required: true },
                { value: data.governateId, type: "string", title: __("governateId"), required: true },
                { value: data.cityId, type: "string", title: __("cityId"), required: true },
                { value: data.districtId, type: "string", title: __("districtId"), required: true }

            ];

            //checking validation
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message });
            }

            //checking region is alredy added or not
            let userc = await Region.countRegion({
                userId: req.user._id,
                countryId: data.countryId,
                governateId: data.governateId,
                cityId: data.cityId,
                districtId: data.districtId
            });

            if (userc) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("REGION_ALREADY_EXIST")
                });
            }

            let regionData = {
                userId: req.user._id,
                countryId: data.countryId,
                governateId: data.governateId,
                cityId: data.cityId,
                districtId: data.districtId,
                addedBy: req.user.userType,
                status: 'active'
            };

            //first added will be default region
            let regionCount = await Region.count({ userId: req.user._id });
            if (regionCount < 1) {
                regionData.isDefault = true
            } else {
                regionData.isDefault = false
            }

            //Creating Provider if not registered before
            Region.addRegion(regionData, async (err, resp) => {
                if (err) {

                    return res.status(400).json({
                        status: "failure",
                        statusCode: 400,
                        message: __("INTERNAL_DB_ERROR")
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        statusCode: 200,
                        message: __("REGION_ADDED"),
                        data: resp
                    });
                }
            });
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error)
        }
    },
    editRegion: async (req, res) => {
        try {
            let data = req.body;

            let params = [
                { value: data.countryId, type: "string", title: __("countryId"), required: true },
                { value: data.governateId, type: "string", title: __("governateId"), required: true },
                { value: data.cityId, type: "string", title: __("governateId"), required: true },
                { value: data.districtId, type: "string", title: __("districtId"), required: true },
                { value: data.regionId, type: "string", title: __("regionId"), required: true }

            ];

            //checking validation
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message });
            }

            //checking region is alredy added or not
            let userc = await Region.countRegion({
                _id: { $ne: data.regionId },
                userId: req.user._id,
                countryId: data.countryId,
                governateId: data.governateId,
                cityId: data.cityId,
                districtId: data.districtId
            });

            if (userc) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("REGION_ALREADY_EXIST")
                });
            }

            let regionData = {
                userId: req.user._id,
                countryId: data.countryId,
                governateId: data.governateId,
                cityId: data.cityId,
                districtId: data.districtId,
                regionId: data.regionId
            };

            //Creating Provider if not registered before
            Region.editRegion(regionData, async (err, resp) => {
                if (err) {

                    return res.status(400).json({
                        status: "failure",
                        statusCode: 400,
                        message: __("INTERNAL_DB_ERROR")
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        statusCode: 200,
                        message: __("REGION_UPDATED"),
                        data: resp
                    });
                }
            });
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error)
        }
    },
    getAllRegions: async (req, res) => {
        try {
            let regionsLists = await Region.getUserRegions({ userId: req.user._id });
            if (regionsLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: "",
                    data: regionsLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: __("NO_RECORD_FOUND"),
                    data: regionsLists
                });
            }
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error)
        }
    },
    getAllRegionsByFilter: async (req, res) => {
        try {
            let data = req.body;
            data.userId = req.user._id
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
                return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message });
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
            //filter with city
            if (data.city) {
                const city_criteria = {
                    [languageCode]: data.city,
                    governateDetails: {
                        $ne: null
                    }
                };
                data.city_criteria = city_criteria;
            }

            //filter with Disrict
            if (data.district) {
                const city_criteria = {
                    [languageCode]: data.district,
                    cityDetails: {
                        $ne: null
                    }
                };
                data.city_criteria = city_criteria;
            }
            const regionLists = await Region.filterUserRegions(data);
            if (regionLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: "",
                    data: regionLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: __("NO_RECORD_FOUND"),
                    data: regionLists
                });
            }
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error)
        }
    },
    getActiveRegions: async (req, res) => {
        try {
            let regionsLists = await Region.getUserActiveRegions({ userId: req.user._id });
            if (regionsLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: "",
                    data: regionsLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: __("NO_RECORD_FOUND"),
                    data: regionsLists
                });
            }
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error)
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
                return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message });
            }

            let regionDetails = await Region.getRegionById(regionId);
            if (regionDetails) {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: "",
                    data: regionDetails
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: __("NO_RECORD_FOUND"),
                    data: regionDetails
                });
            }
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error)
        }
    },
    removeRegionById: async (req, res) => {
        try {
            let regionId = req.body.regionId;
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
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            let regionDetails = await Region.getRegionById(regionId);
            if (!regionDetails) {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("NO_RECORD_FOUND"),
                    data: regionDetails
                });
            }

            regionDetails = await Region.removeRegion({ _id: regionId });
            if (regionDetails) {
                return res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: __("REGION_REMOVED"),
                    data: ""
                });
            } else {
                return res.status(400).json({
                    status: "failure",
                    statusCode: 400,
                    message: __("INTERNAL_DB_ERROR")
                });
            }
        } catch (error) {

            res.status(500).json({
                status: "failure",
                statusCode: 500,
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error)
        }
    },
    changeDefaultRegion: async (req, res) => {
        try {
            let userId = req.user._id

            let data = req.body;

            let params = [
                { value: data.regionId, type: "string", title: __("regionId"), required: true }

            ];

            let checkErr = await validation(params);

            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message })
            }

            let setDefaultRegionData = {
                regionId: data.regionId,
                userId: userId,
                isDefault: true
            }

            let unsetDefaultRegiomData = {
                userId: userId,
                isDefault: false
            }

            //unset all default regions
            Region.unsetDefaultRegionWithUserId(unsetDefaultRegiomData, function (err, resp) {
                if (err) {

                    res.status(400).json({ status: "failure", statusCode: 400, message: __('INTERNAL_DB_ERROR') })
                    throw new Error(err)
                } else {
                    //set selected regions as default regions
                    Region.setDefaultRegion(setDefaultRegionData, function (err, resp) { // NOSONAR
                        if (err) {

                            res.status(400).json({ status: "failure", statusCode: 400, message: __('INTERNAL_DB_ERROR') })
                            throw new Error(err)
                        } else {
                            return res.status(200).json({ status: "success", statusCode: 200, data: resp, message: __('DEFAULT_REGION_UPDATED') })
                        }
                    })
                }
            })
        } catch (err) {

            res.status(500).json({ status: "failure", statusCode: 500, message: __('INTERNAL_SERVER_ERROR') })
            throw new Error(err)
        }
    }
};
