 
const mongoose = require("mongoose");
const City = require('../models/citySchema');
const District = require('../models/districtSchema');
const Region = require('../models/regionSchema');
const Language = require('../models/languageSchema');
const validation = require("../helper/validator.js");
const { __ } = require("i18n");
const helper = require("../helper/helper.js");

module.exports = {
    addDistrict: async (req, res) => {
        try {
            let data = req.body;
            let addedById = req.user._id;


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
                { value: data.cityId, type: "string", title: 'cityId', required: true },
                {
                    value: data.status,
                    type: "string",
                    title: __("status"),
                    required: true
                },
                {
                    value: data.googleMapDistrictName,
                    type: "string",
                    title: __("googleMapDistrictName"),
                    required: true
                },
                {
                    value: data.geometryBounds,
                    type: "object",
                    title: __("geometryBounds"),
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
            var checkErr2 = await validation(params);
            if (!checkErr2.status) {
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
            let checkDistrict = await District.countDistrict(queryData);
            if (checkDistrict) {
                return res.status(400).json({
                    status: "failure",
                    message: __("DISTRICT_ALREADY_EXIST")
                });
            }

            let districtData = {
                name: data.name,
                countryId: data.countryId,
                governateId: data.governateId,
                cityId: data.cityId,
                googleMapName: data.googleMapDistrictName,
                bounds: data.geometryBounds,
                status: data.status,
                addedBy: req.user.userType,
                addedById: addedById,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            //Creating governate
            District.addDistrict(districtData, async (err, resp) => {
                if (err) {

                    return res.status(400).json({
                        status: "failure",
                        message: __("INTERNAL_DB_ERROR")
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: __("DISTRICT_ADDED"),
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
    editDistrict: async (req, res) => {
        try {
            let data = req.body;


            let params = [
                { value: data.name, type: "object", title: __("name"), required: true },
                { value: data.countryId, type: "string", title: __("countryId"), required: true },
                { value: data.governateId, type: "string", title: __("governateId"), required: true },
                { value: data.cityId, type: "string", title: __('cityId'), required: true },
                { value: data.districtId, type: "string", title: __("districtId"), required: true },
                { value: data.status, type: "string", title: __("status"), required: true },
                { value: data.googleMapDistrictName, type: "string", title: __("googleMapDistrictName"), required: true }
            ];

            var checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
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
                let Title = element.languageName + " name";
                params.push({
                    value: name,
                    type: "string",
                    title: Title,
                    required: true
                });
            });

            //checking validation
            var checkErr2 = await validation(params);
            if (!checkErr2.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }

            let queryData = {
                _id: { $ne: data.districtId },
                $or: [
                    {
                        "name.en": data.name.en
                    },
                    {
                        "name.ar": data.name.ar
                    }
                ]
            }
            let checkDistrict = await District.countDistrict(queryData);

            if (checkDistrict) {
                return res.status(400).json({
                    status: "failure",
                    message: __("DISTRICT_ALREADY_EXIST")
                });
            }


            //------------------------------------------------------

            let locationBound = {};

            let geolocationBound = await helper.getGeoLocationBoundsFromAddress(data.googleMapDistrictName);

            if (geolocationBound.status) {
                locationBound = geolocationBound.data;
            } else {
                return res.status(400).json({
                    status: "failure",
                    message: __("INVALID_ADDRESS")
                });
            }


            //------------------------------------------------------

            let districtData = {
                name: data.name,
                countryId: data.countryId,
                governateId: data.governateId,
                cityId: data.cityId,
                districtId: data.districtId,
                status: data.status,
                googleMapName: data.googleMapDistrictName,
                bounds: locationBound,

                updatedAt: new Date()

            };

            //Creating District
            District.editDistrict(districtData, async (err, resp) => {
                if (err) {

                    return res.status(400).json({
                        status: "failure",
                        message: __("INTERNAL_DB_ERROR")
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: __("DISTRICT_UPDATED"),
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
    getDistricts: async (req, res) => {
        try {
            let districtLists = await District.getDistricts();
            if (districtLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: districtLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: districtLists
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getDistrictsByFilter: async (req, res) => {
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
                    value: data.city,
                    type: "string",
                    title: __("city"),
                    required: false
                },
                {
                    value: data.page,
                    type: "number",
                    title: __("page"),
                    required: true
                },
                {
                    value: data.limit,
                    type: "number",
                    title: __("limit"),
                    required: true
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

            if (data.city) {
                const city_criteria = {
                    [languageCode]: data.city
                };
                data.city_criteria = city_criteria;
            }
            if (data.district) {
                const district_criteria = {
                    [languageCode]: data.district

                };
                data.district_criteria = district_criteria;
            }

            const districtLists = await District.filterDistricts(data);
            if (districtLists.data.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: districtLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: districtLists
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getDistrictsByCity: async (req, res) => {
        try {
            let data = req.params;

            let params = [
                {
                    value: data.cityId,
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

            let districtLists = await District.getDistrictsByCity({
                cityId: data.cityId
            });

            if (districtLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: districtLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: districtLists
                });
            }

        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getActiveDistrictsByCity: async (req, res) => {
        try {
            let data = req.params;

            let params = [
                {
                    value: data.cityId,
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

            let districtLists = await District.getActiveDistrictsByCity({
                cityId: data.cityId
            });

            if (districtLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: districtLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: districtLists
                });
            }

        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getActiveDistricts: async (req, res) => {
        try {
            let districtsLists = await District.getActiveDistricts();
            if (districtsLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: districtsLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: districtsLists
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getDistrictById: async (req, res) => {
        try {
            let districtId = req.params.districtId;
            let params = [
                {
                    value: districtId,
                    type: "string",
                    title: __("districtId"),
                    required: true
                }
            ];
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }

            let districtDetails = await District.getDistrictById(districtId);
            if (districtDetails) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: districtDetails
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: districtDetails
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    removeDistrictById: async (req, res) => {
        try {
            let districtId = req.params.districtId;
            let params = [
                {
                    value: districtId,
                    type: "string",
                    title: __("districtId"),
                    required: true
                }
            ];
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }

            let districtDetails = await District.getDistrictById(districtId);
            if (!districtDetails) {
                return res.status(400).json({
                    status: "failure",
                    message: __("NO_RECORD_FOUND"),
                    data: districtDetails
                });
            }

            //checking country is used in regions or not when DELETEING country
            let isUsed = await Region.getRegionByDistrictId(districtId);



            if (isUsed) {
                return res.status(400).json({ status: "failure", message: __("DISTRICT_IS_USED_IN_REGIONS") });
            }

            let removeDistrict = await District.removeDistrict(districtId);
            if (removeDistrict) {
                return res.status(200).json({
                    status: "success",
                    message: __("DISTRICT_REMOVED"),
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
    validateGoogleMapDistrict: async (req, res) => {


        let data = req.body;


        let params = [
            {
                value: data.type,
                type: "string",
                title: __("type"),
                required: true
            }
        ];
        let checkErr = await validation(params);
        if (!checkErr.status) {
            return res
                .status(400)
                .json({ status: "failure", message: checkErr.message });
        }



        let geolocationBound = await helper.getGeoLocationInformationFromAddress(data.googleMapDistrictName);

        if (geolocationBound.status) {

            let locationData = {}

            if (!geolocationBound.data.geometry.bounds) {
                return res.status(400).json({ status: "failure", message: __("No Bound Available For This Location") });
            }

            if (geolocationBound.data.address_components.length < 3) {
                return res.status(400).json({ status: "failure", message: __("INVALID_ADDRESS") });
            }

            if (data.type == 'add') {
                let districts = await District.getDistrictByBound(geolocationBound.data.geometry.bounds);

                if (districts.length > 0) {
                    return res.status(200).json({
                        status: "failure",
                        message: "district with the same geometry bound already exists",
                        data: districts
                    });
                }
            } else if (data.type == 'edit') {

                // district id required
                if (!data.districtId) {
                    return res.status(400).json({ status: "failure", message: __("districtId") });
                }

                let districts = await District.getDistrictByBound(geolocationBound.data.geometry.bounds);

                if (districts.length > 0) {
                    for (let dist of districts) {
                        if (dist._id != data.districtId) {
                            return res.status(200).json({
                                status: "failure",
                                message: "district with the same geometry bound already exists",
                                data: dist
                            });
                        }
                    }
                }
            }


            locationData.district = geolocationBound.data.address_components[0].long_name;
            locationData.city = geolocationBound.data.address_components[1].long_name;
            locationData.state = geolocationBound.data.address_components[2].long_name;
            locationData.country = geolocationBound.data.address_components[3].long_name;
            locationData.formatted_address = geolocationBound.data.formatted_address;
            locationData.geometryBounds = geolocationBound.data.geometry.bounds;



            return res.status(200).json({
                status: "success",
                message: "",
                data: locationData
            });
        } else {
            return res.status(400).json({
                status: "failure",
                message: __("INVALID_ADDRESS")
            });
        }

    },
    getDistrictsByCityIdList: async (req, res) => {
        try {
            let data = req.body

            const districts = await District.districtsByCityList(data?.cityId);

            return res.status(200).json({
                status: "success",
                message: "",
                data: districts
            });
        } catch (error) {
            console.log("check reporpr", error);
            res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error)
        }
    }

};
