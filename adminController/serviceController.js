 
const mongoose = require("mongoose");
const Service = require('../models/serviceSchema');
const Language = require('../models/languageSchema');
const Countries = require('../models/countrySchema');
const Governates = require('../models/governateSchema');
const Cities = require('../models/citySchema');
const Districts = require('../models/districtSchema');
const validation = require("../helper/validator.js");
const { __ } = require("i18n");
const upload = require('../lib/Imageupload.js');
const singleImageUpload = upload.single('image');
const DeleteImage = require('../lib/fileDelete.js');

module.exports = {
    addService: async (req, res) => {
        // console.log(req)
        singleImageUpload(req, res, async function (err, resp) {
            try {
                let data = req.body;
                let parsingFields = ["name", "blockCountryId", "blockGovernateId", "blockCityId", "blockDistrictId"];
                parsingFields.forEach(field => {
                    if (data[field]) data[field] = JSON.parse(data[field]);
                });

                let file = req.file;

                if (file) {
                    if (err) {

                        return res.status(400).json({ status: "failure", message: __("IMAGE_UPLOAD_ERROR") })
                    }

                    data.image = req.file.location
                } else {
                    data.image = ''
                }

                let params = [
                    { value: data.categoryId, type: "string", title: __("categoryId"), required: true },
                    { value: data.name, type: "object", title: __("name"), required: true },
                    { value: data.image, type: "string", title: __("image"), required: true },
                    { value: data.status, type: "string", title: __("status"), required: true },


                    { value: data.blockCountryId, type: "object", title: __("blockCountryId"), required: false },
                    { value: data.blockGovernateId, type: "object", title: __("blockGovernateId"), required: false },
                    { value: data.blockCityId, type: "object", title: __("blockCityId"), required: false },
                    { value: data.blockDistrictId, type: "object", title: __("blockDistrictId"), required: false },
                ];




                //checking validation
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

                let userc = await Service.count({
                    categoryId: data.categoryId,
                    $or: [
                        {
                            "name.en": data.name.en
                        },
                        {
                            "name.ar": data.name.ar
                        }
                    ]
                });

                if (userc) {
                    return res.status(400).json({
                        status: "failure",
                        message: __("SERVICE_ALREADY_EXIST")
                    });
                }

                let serviceData = {
                    userId: req.user._id,
                    categoryId: data.categoryId,
                    name: data.name,
                    image: data.image,
                    addedBy: req.user.userType,
                    status: data.status,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                    blockCountryId: data.blockCountryId,
                    blockGovernateId: data.blockGovernateId,
                    blockCityId: data.blockCityId,
                    blockDistrictId: data.blockDistrictId,
                };

                //Creating Provider if not registered before
                Service.addService(serviceData, async (error, response) => {
                    if (error) {

                        return res.status(400).json({
                            status: "failure",
                            message: __("INTERNAL_DB_ERROR")
                        });
                    } else {
                        return res.status(200).json({
                            status: "success",
                            message: __("SERVICE_ADDED"),
                            data: response
                        });
                    }
                });

            } catch (error) {

                return res.status(500).json({
                    status: "success",
                    message: __("INTERNAL_SERVER_ERROR")
                });
            }
        })
    },
    editService: async (req, res) => {
        singleImageUpload(req, res, async function (err, resp) {
            try {
                let data = req.body;

                let parsingFields = ["name", "blockCountryId", "blockGovernateId", "blockCityId", "blockDistrictId"];
                parsingFields.forEach(field => {
                    if (data[field]) data[field] = JSON.parse(data[field]);
                });


                let file = req.file;

                if (file) {
                    if (err) {

                        return res.status(400).json({ status: "failure", message: __("IMAGE_UPLOAD_ERROR") })
                    }

                    data.image = req.file.location
                }

                let params = [
                    { value: data.serviceId, type: "string", title: __("serviceId"), required: true },
                    { value: data.categoryId, type: "string", title: __("countryId"), required: true },
                    { value: data.name, type: "object", title: __("name"), required: true },
                    { value: data.status, type: "string", title: __("status"), required: true },

                    { value: data.blockCountryId, type: "object", title: __("blockCountryId"), required: false },
                    { value: data.blockGovernateId, type: "object", title: __("blockGovernateId"), required: false },
                    { value: data.blockCityId, type: "object", title: __("blockCityId"), required: false },
                    { value: data.blockDistrictId, type: "object", title: __("blockDistrictId"), required: false },
                ];

                //checking validation
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
                    return res.status(400).json({ status: "failure", message: checkErr.message });
                }

                let userc = await Service.count({
                    _id: { $ne: data.serviceId },
                    categoryId: data.categoryId,
                    $or: [
                        {
                            "name.en": data.name.en
                        },
                        {
                            "name.ar": data.name.ar
                        }
                    ]
                });

                if (userc) {
                    return res.status(400).json({
                        status: "failure",
                        message: __("SERVICE_ALREADY_EXIST")
                    });
                }

                let serviceData = {
                    userId: req.user._id,
                    categoryId: data.categoryId,
                    name: data.name,
                    serviceId: data.serviceId,
                    status: data.status,
                    blockCountryId: data.blockCountryId,
                    blockGovernateId: data.blockGovernateId,
                    blockCityId: data.blockCityId,
                    blockDistrictId: data.blockDistrictId,

                    updatedAt: new Date()
                };

                if (data.image) {
                    serviceData.image = data.image
                }

                //Creating Provider if not registered before
                Service.editService(serviceData, async (error, response) => {
                    if (error) {

                        return res.status(400).json({
                            status: "failure",
                            message: __("INTERNAL_DB_ERROR")
                        });
                    } else {
                        return res.status(200).json({
                            status: "success",
                            message: __("SERVICE_UPDATED"),
                            data: response
                        });
                    }
                });
            } catch (error) {

                return res.status(500).json({
                    status: "failure",
                    message: __("INTERNAL_SERVER_ERROR")
                });
            }
        })
    },
    getServices: async (req, res) => {
        try {
            let serviceLists = await Service.getServices();
            if (serviceLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: serviceLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: serviceLists
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getServicesWithFilter: async (req, res) => {
        try {
            let data = req.body;

            let params = [
                { value: data.language, type: "string", title: __("language"), required: true },
                { value: data.category, type: "string", title: __("category"), required: false },
                { value: data.service, type: "string", title: __("service"), required: false },
                { value: data.page, type: "number", title: __("page"), required: false },
                { value: data.limit, type: "number", title: __("limit"), required: false }
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            const languageCode = `name.${data.language}`;

            if (data.category) {
                data.category_criteria = data.category;
            }

            if (data.service) {
                const service_criteria = {
                    [languageCode]: { $regex: data.service.trim(), $options: 'i' }
                };
                data.service_criteria = service_criteria;
            }

            const serviceLists = await Service.filterServices(data);
            if (serviceLists.data.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: serviceLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: serviceLists
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getActiveServices: async (req, res) => {
        try {
            let ServiceLists = await Service.getActiveServices();
            if (ServiceLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: ServiceLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: ServiceLists
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getServiceById: async (req, res) => {
        try {
            let serviceId = req.params.ServiceId;
            let params = [
                {
                    value: serviceId,
                    type: "string",
                    title: __("serviceId"),
                    required: true
                }
            ];
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            let serviceDetails = await Service.getServiceById(serviceId);
            if (serviceDetails) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: serviceDetails
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: serviceDetails
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    removeServiceById: async (req, res) => {

        try {
            let serviceId = req.params.ServiceId;
            let params = [
                {
                    value: serviceId,
                    type: "string",
                    title: __("serviceId"),
                    required: true
                }
            ];
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }

            var serviceDetails = await Service.getServiceById(serviceId);
            if (!serviceDetails) {
                return res.status(400).json({
                    status: "failure",
                    message: __("NO_RECORD_FOUND"),
                    data: serviceDetails
                });
            }

            var serviceRemoved = await Service.removeService({ _id: serviceId });
            if (serviceRemoved) {
                return res.status(200).json({
                    status: "success",
                    message: __("SERVICE_REMOVED"),
                    data: ""
                });
            } else {
                return res.status(400).json({
                    status: "failure",
                    message: __("INTERNAL_DB_ERROR")
                });
            }
        }
        catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },

    getAllServiceInLication: async (req, res) => {
        let districtId = "602cf6c61a998fa202983a05";
        let governateId = "602cf6c61a998fa202983a05";
        let countryId = "602cf6c61a998fa202983a05";
        let cityId = "602cf6c61a998fa202983a05";

        Service.find({
            //use or
            $or: [
                {
                    districtId: {
                        $in: [districtId]
                    }
                },
                {
                    governateId: {
                        $in: [governateId]
                    }
                },
                {
                    cityId: {
                        $in: [cityId]
                    }
                },
                {
                    countryId: {
                        $in: [countryId]
                    }
                }

            ]
        })
            .populate("categoryId")

            .exec((err, service) => {
                if (err) {

                    return res.status(400).json({
                        status: "failure",
                        message: __("INTERNAL_SERVER_ERROR")
                    });
                }
                if (service.length > 0) {
                    return res.status(200).json({
                        status: "success",
                        message: "",
                        data: service
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: __("NO_RECORD_FOUND"),
                        data: service
                    });
                }
            });
    },
    getServiceByIdWithBlockedLocation: async (req, res) => {
        try {
            let serviceId = req.params.ServiceId;

            let params = [
                { value: serviceId, type: "string", title: __("serviceId"), required: true }
            ];
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            let service = await Service.gerServiceByIdWithBlockedLocation(serviceId);

            if (service) {
                service.blockedCategory = {
                    countryId: service.blockCountryId,
                    governateId: service.blockGovernateId,
                    districtId: service.blockDistrictId,
                    cityId: service.blockCityId
                }
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: service
                });
            } else {
                return res.status(400).json({
                    status: "failure",
                    message: __("NO_RECORD_FOUND"),
                    data: service
                });
            }

        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getUnblockedCountriesByServiceId: async (req, res) => {
        try {
            let data = req.body;
            let params = [

                { value: data.serviceId, type: "string", title: __("serviceId"), required: true }

            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            const blockedCountryIds = await Service.findBlockedIds(data.serviceId, 'blockCountryId')
            const unblockedCountries = await Countries.findUnblockedCountries(blockedCountryIds?.blockCountryId)

            if (unblockedCountries.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: unblockedCountries
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: unblockedCountries
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }

    },
    getUnblockedGovernatesByService: async (req, res) => {
        try {
            let data = req.body;
            let params = [

                { value: data.serviceId, type: "string", title: __("serviceId"), required: true },
                { value: data.countryId, type: "string", title: __("countryId"), required: true }

            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            const blockedGovernateIds = await Service.findBlockedIds(data.serviceId, 'blockGovernateId')
            const unblockedGovernates = await Governates.findUnblockedGovernates(
                blockedGovernateIds?.blockGovernateId, data.countryId
            )
            if (unblockedGovernates.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: unblockedGovernates
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: unblockedGovernates
                });
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }

    },
    getUnblockedCitiesByService: async (req, res) => {
        try {
            let data = req.body;
            let params = [

                { value: data.serviceId, type: "string", title: __("serviceId"), required: true },
                { value: data.governateId, type: "string", title: __("governateId"), required: true }

            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            const blockedCityIds = await Service.findBlockedIds(data.serviceId, 'blockCityId')
            const unblockedCities = await Cities.findUnblockedCities(
                blockedCityIds?.blockCityId, data.governateId
            )
            if (unblockedCities.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: unblockedCities
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: unblockedCities
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }

    },
    getUnblockedDistrictsByService: async (req, res) => {
        try {
            let data = req.body;
            let params = [

                { value: data.serviceId, type: "string", title: __("serviceId"), required: true },
                { value: data.cityId, type: "string", title: __("cityId"), required: true }

            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            const blockedDistrictIds = await Service.findBlockedIds(data.serviceId, 'blockDistrictId')
            const unblockedDistricts = await Districts.findUnblockedDistricts(
                blockedDistrictIds?.blockDistrictId, data.cityId
            )
            if (unblockedDistricts.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: unblockedDistricts
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: unblockedDistricts
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }

    },
    getServiceByCategoryId: async (req, res) => {
        try {
            if (!req.body?.categoryId) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: []

                });

            }

            let services = await Service.servicesByCategory(req.body?.categoryId);

            if (!services) {
                return res.status(400).json({
                    status: "failure",
                    message: "Not found",
                    data: "",
                    total: 0
                });
            }
            return res.status(200).json({
                status: "success",
                message: "",
                data: services


            });

        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }
    },

    getServicesByCategoryIdList: async (req, res) => {
        try {
            let data = req.body
            let params = [{ value: data.categoryId, type: "object", title: __("categoryId"), required: true }]
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }
            const services = await Service.servicesByCategoryList(data.categoryId);

            return res.status(200).json({
                status: "success",
                message: "",
                data: services
            });
        } catch (error) {

            res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
            throw new Error(error)
        }
    },
    getServicesByCategoryAndLocationList: async (req, res) => {
        let data = req.body
        try {

            let params = [

                { value: data.districtId, type: "object", title: __("districtId"), required: true },
                { value: data.governateId, type: "object", title: __("governateId"), required: true },
                { value: data.cityId, type: "object", title: __("cityId"), required: true },
                { value: data.countryId, type: "object", title: __("countryId"), required: true },
                { value: data.categoryId, type: "object", title: __("categoryId"), required: true },

            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }
            let query = {
                'categoryId': { $in: data.categoryId },
                'blockDistrictId': { $nin: data.districtId },
                'blockGovernateId': { $nin: data.governateId },
                'blockCityId': { $nin: data.cityId },
                'blockCountryId': { $nin: data.countryId }
            }
            const services = await Service.servicesByCategoryAndDistrictList(query);
            return res.status(200).json({
                status: "success",
                message: "",
                data: services
            });
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }
    }
};
