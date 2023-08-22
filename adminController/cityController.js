 
const mongoose = require("mongoose");
const Country = require('../models/countrySchema');
const Governate = require('../models/governateSchema');
const City = require('../models/citySchema');
const District = require('../models/districtSchema');
const Region = require('../models/regionSchema');
const Language = require('../models/languageSchema');
const validation = require("../helper/validator.js");
const { __ } = require("i18n");

module.exports = {
    addCity: async (req, res) => {
        try {
            let data = req.body;

            let params = [
                { value: data.name, type: "object", title: __("name"), required: true },
                { value: data.countryId, type: "string", title: __("countryId"), required: true },
                { value: data.governateId, type: "string", title: __("governateId"), required: true },
                { value: data.status, type: "string", title: __("status"), required: true }
            ];

            let checkErr = await validation(params);
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
            let checkCity = await City.countCity(queryData);
            if (checkCity) {
                return res.status(400).json({
                    status: "failure",
                    message: __("CITY_ALREADY_EXIST")
                });
            }

            let cityData = {
                name: data.name,
                countryId: data.countryId,
                governateId: data.governateId,

                status: data.status,
                addedBy: req.user.userType,
                userId: req.user._id,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            //Creating governate
            City.addCity(cityData, async (err, resp) => {
                if (err) {
                    console.log("check err user details e", err);
                    return res.status(400).json({
                        status: "failure",
                        message: __("INTERNAL_DB_ERROR")
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: __("CITY_ADDED"),
                        data: resp
                    });
                }
            });
        } catch (error) {
            console.log("check reporpr", error);
            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    editCity: async (req, res) => {
        try {
            let data = req.body;

            let params = [
                { value: data.name, type: "object", title: __("name"), required: true },
                { value: data.countryId, type: "string", title: __("countryId"), required: true },
                { value: data.governateId, type: "string", title: __("governateId"), required: true },

                { value: data.cityId, type: "string", title: __("cityId"), required: true },
                { value: data.status, type: "string", title: __("status"), required: true }
            ];

            let checkErr = await validation(params);
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

            getAllLanguage.forEach((elem) => {
                let name = data.name[elem.languageCode];
                let title = elem.languageName + " name";
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
                _id: { $ne: data.cityId },
                $or: [
                    {
                        "name.en": data.name.en
                    },
                    {
                        "name.ar": data.name.ar
                    }
                ]
            }

            let checkCity = await City.countCity(queryData);
            if (checkCity) {
                return res.status(400).json({
                    status: "failure",
                    message: __("CITY_ALREADY_EXIST")
                });
            }

            let cityData = {
                name: data.name,
                countryId: data.countryId,
                governateId: data.governateId,

                cityId: data.cityId,
                status: data.status,

                updatedAt: new Date()

            };

            //checking country is used in regions or not when deactivate country
            if (data.status.toLowerCase() == 'inactive') {
                let isUsed = await Region.getRegionByCityId(data.cityId);
                if (isUsed) {
                    return res.status(400).json({ status: "failure", message: __("CITY_CAN_NOT_DEACTIVATE") });
                }
            }

            //Creating governate
            City.editCity(cityData, async (err, resp) => {
                if (err) {

                    return res.status(400).json({
                        status: "failure",
                        message: __("INTERNAL_DB_ERROR")
                    });
                } else {
                    if (data.status.toLowerCase() == 'inactive') {
                        await District.updateDistrictByCity(data.cityId, data.status);
                    }

                    return res.status(200).json({
                        status: "success",
                        message: __("CITY_UPDATED"),
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
    getCities: async (req, res) => {
        try {
            let cityLists = await City.getCities();
            if (cityLists.length > 0) {
                return res
                    .status(200)
                    .json({ status: "success", message: "", data: cityLists });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: cityLists
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getCitiesByFilter: async (req, res) => {
        try {
            let data = req.body;

            let params = [
                { value: data.language, type: "string", title: __("language"), required: true },
                { value: data.country, type: "string", title: __("country"), required: false },
                { value: data.governate, type: "string", title: __("governate"), required: false },

                { value: data.city, type: "string", title: __("city"), required: false },
                { value: data.page, type: "number", title: __("page"), required: true },
                { value: data.limit, type: "number", title: __("limit"), required: true },
                { value: data.sortField, type: "string", title: __("sortField"), required: true },
                { value: data.sortOrder, type: "number", title: __("sortOrder"), required: true }
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
                    [languageCode]: data.governate,
                    countryDetails: {
                        $ne: null
                    }
                };
                data.governate_criteria = governate_criteria;
            }
            if (data.district) {
                const district_criteria = {
                    [languageCode]: data.district,
                    governateDetails: {
                        $ne: null
                    }
                };
                data.district_criteria = district_criteria;
            }
            if (data.city) {
                const city_criteria = {
                    [languageCode]: data.city,
                    governateDetails: {
                        $ne: null
                    }
                };
                data.city_criteria = city_criteria;
            }

            const cityLists = await City.filterCities(data);
            if (cityLists.data.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: cityLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: cityLists
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
    getCitiesByGovernate: async (req, res) => {
        try {
            let data = req.params;

            let params = [
                {
                    value: data.governateId,
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

            let cityLists = await City.getCitiesByGovernate({
                governateId: data.governateId
            });

            if (cityLists.length > 0) {
                return res
                    .status(200)
                    .json({ status: "success", message: "", data: cityLists });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: cityLists
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
    getActiveCitiesByGovernate: async (req, res) => {
        try {
            let data = req.params;

            let params = [
                {
                    value: data.governateId,
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

            let cityLists = await City.getActiveCitiesByGovernate({
                governateId: data.governateId
            });

            if (cityLists.length > 0) {
                return res
                    .status(200)
                    .json({ status: "success", message: "", data: cityLists });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: cityLists
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
    getActiveCities: async (req, res) => {
        try {
            let citiesLists = await City.getActiveCities();
            if (citiesLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: citiesLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: citiesLists
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
    getCitiesById: async (req, res) => {
        try {
            let cityId = req.params.cityId;
            let params = [
                {
                    value: cityId,
                    type: "string",
                    title: __("cityId"),
                    required: true
                }
            ];
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }

            let cityDetails = await City.getCityById(cityId);
            if (cityDetails) {

                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: cityDetails
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: cityDetails
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
    removeCitiesById: async (req, res) => {
        try {
            let cityId = req.params.cityId;
            let params = [
                {
                    value: cityId,
                    type: "string",
                    title: __("cityId"),
                    required: true
                }
            ];
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }

            let cityDetails = await City.getCityById(cityId);
            if (!cityDetails) {
                return res.status(400).json({
                    status: "failure",
                    message: __("NO_RECORD_FOUND"),
                    data: cityDetails
                });
            }

            //checking country is used in regions or not when DELETEING country
            let isUsed = await Region.getRegionByCityId(cityId);
            if (isUsed) {
                return res.status(400).json({ status: "failure", message: __("CITY_IS_USED_IN_REGIONS") });
            }

            let removeCity = await City.removeCity(cityId);
            if (removeCity) {
                return res.status(200).json({
                    status: "success",
                    message: __("CITY_REMOVED"),
                    data: ""
                });
            } else {
                await District.removeDistrictByCity(cityId);
                return res.status(400).json({
                    status: "failure",
                    message: __("INTERNAL_DB_ERROR")
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
    getCitiesByGovernateIdList: async (req, res) => {
        try {
            let data = req.body
            const cities = await City.citiesByGovernateList(data?.governateId);

            return res.status(200).json({
                status: "success",
                message: "",
                data: cities
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
