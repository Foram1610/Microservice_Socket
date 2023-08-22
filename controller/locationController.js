 
const mongoose = require('mongoose');
const User = require('../models/userSchema')
const Country = require('../models/countrySchema')
const Governate = require('../models/governateSchema')
const District = require('../models/governateSchema')
const City = require('../models/citySchema')
const validation = require('../helper/validator.js');
const { __ } = require('i18n');

module.exports = {
    addLocation: async (req, res) => {
        try {
            let userId = req.user._id

            let data = req.body;


            //validation
            let params = [
                { value: data.countryId, type: "string", title: __("countryId"), required: true },
                { value: data.governateId, type: "string", title: __("governateId"), required: true },
                { value: data.cityId, type: "string", title: __("cityId"), required: true },
                { value: data.districtId, type: "string", title: __("districtId"), required: true },

                { value: data.addressLine1, type: "string", title: __("addressLine1"), required: true },
                { value: data.street, type: "string", title: __("street"), required: true },
                { value: data.houseNumber, type: "string", title: __("houseNumber"), required: false },
                { value: data.appartment, type: "string", title: __("appartment"), required: false },
                { value: data.floor, type: "string", title: __("floor"), required: false },
                { value: data.landmark, type: "string", title: __("landmark"), required: false },
                { value: data.tag, type: "string", title: __("tag"), required: true },
                { value: data.latitude, type: "string", title: __("latitude"), required: true },
                { value: data.longitude, type: "string", title: __("longitude"), required: true }

            ];

            // locationCordinate
            let checkErr = await validation(params);

            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message })
            }

            //getting country information
            let countryName = await Country.findCountry({ _id: data.countryId, status: "active" })
            if (!countryName) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: __("INVALID_COUNTRY") })
            }
            data.countryName = countryName.name

            //getting Governate information
            let governateName = await Governate.findGovernate({ _id: data.governateId, status: "active", countryId: data.countryId })
            if (!governateName) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: __("INVALID_GOVERNATE") })
            }
            data.governateName = governateName.name

            //getting city information
            let cityName = await City.findCity({ _id: data.cityId, status: "active", governateId: data.governateId })
            if (!cityName) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: __("INVALID_CITY") })
            }
            data.cityName = cityName.name

            //getting district information
            let districtName = await District.findDistrict({ _id: data.districtId, status: "active", cityId: data.cityId })
            if (!districtName) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: __("INVALID_DISTRICT") })
            }
            data.districtName = districtName.name
            let locationCordinate = {}
            if (data.latitude && data.longitude) {
                locationCordinate = {
                    type: "Point",
                    coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)]
                }
            }

            let locationData = {
                userId: userId,
                countryId: data.countryId,
                governateId: data.governateId,
                cityId: data.cityId,
                districtId: data.districtId,
                countryName: data.countryName,
                governateName: data.governateName,
                cityName: data.cityName,
                districtName: data.districtName,
                addressLine1: data.addressLine1,
                street: data.street,
                houseNumber: data.houseNumber,
                appartment: data.appartment,
                floor: data.floor,
                landmark: data.landmark,
                locationCordinate: locationCordinate,
                tag: data.tag,

                status: 'active'
            }

            //first added will be default location
            let locationCount = await User.count({ "locations.userId": userId });
            if (locationCount < 1) {
                locationData.isDefault = true
            } else {
                locationData.isDefault = false
            }

            //Add Location
            User.addLocation(locationData, function (err, resp) {
                if (err) {

                    res.status(400).json({ status: "failure", statusCode: 400, message: __('INTERNAL_DB_ERROR') })
                    throw new Error(err)
                } else {

                    return res.status(200).json({ status: "success", statusCode: 200, data: resp, message: __('LOCATION_ADDED') })
                }
            })
        } catch (err) {

            res.status(500).json({ status: "failure", statusCode: 500, message: __('INTERNAL_SERVER_ERROR') })
            throw new Error(err)
        }
    },
    editLocation: async (req, res) => {
        try {
            let userId = req.user._id

            let data = req.body;


            //Validation
            let params = [
                { value: data.locationId, type: "string", title: __("locationId"), required: true },
                { value: data.countryId, type: "string", title: __("countryId"), required: true },
                { value: data.governateId, type: "string", title: __("governateId"), required: true },
                { value: data.cityId, type: "string", title: __("cityId"), required: true },
                { value: data.districtId, type: "string", title: __("districtId"), required: true },

                { value: data.addressLine1, type: "string", title: __("addressLine1"), required: true },
                { value: data.street, type: "string", title: __("street"), required: true },
                { value: data.houseNumber, type: "string", title: __("houseNumber"), required: false },
                { value: data.appartment, type: "string", title: __("appartment"), required: false },
                { value: data.floor, type: "string", title: __("floor"), required: false },
                { value: data.landmark, type: "string", title: __("landmark"), required: false },
                { value: data.tag, type: "string", title: __("tag"), required: true },
                { value: data.latitude, type: "string", title: __("latitude"), required: true },
                { value: data.longitude, type: "string", title: __("longitude"), required: true }
            ];

            let checkErr = await validation(params);

            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message })
            }

            //getting country information
            let countryName = await Country.findCountry({ _id: data.countryId, status: "active" })
            if (!countryName) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: __("INVALID_COUNTRY") })
            }
            data.countryName = countryName.name

            //getting Governate information
            let governateName = await Governate.findGovernate({ _id: data.governateId, status: "active", countryId: data.countryId })
            if (!governateName) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: __("INVALID_GOVERNATE") })
            }
            data.governateName = governateName.name

            //getting City information
            let cityName = await City.findCity({ _id: data.cityId, status: "active", governateId: data.governateId })
            if (!cityName) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: __("INVALID_CITY") })
            }
            data.cityName = cityName.name

            //getting District information
            let districtName = await District.findDistrict({ _id: data.districtId, status: "active", cityId: data.cityId })
            if (!districtName) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: __("INVALID_DISTRICT") })
            }
            data.districtName = districtName.name

            let locationCordinate = {}
            if (data.latitude && data.longitude) {
                locationCordinate = {
                    type: "Point",
                    coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)]
                }
            }

            let locationData = {
                locationId: data.locationId,
                userId: userId,
                countryId: data.countryId,
                governateId: data.governateId,
                cityId: data.cityId,
                districtId: data.districtId,
                countryName: data.countryName,
                governateName: data.governateName,
                cityName: data.cityName,
                districtName: data.districtName,
                addressLine1: data.addressLine1,
                street: data.street,
                houseNumber: data.houseNumber,
                appartment: data.appartment,
                floor: data.floor,
                landmark: data.landmark,
                tag: data.tag,
                locationCordinate: locationCordinate
            }

            //first added will be default location
            let locationCount = await User.count({ userId: userId });
            if (locationCount < 1) {
                locationData.isDefault = true
            }

            //Update locations
            User.editLocation(locationData, function (err, resp) {
                if (err) {

                    res.status(400).json({ status: "failure", statusCode: 400, message: __('INTERNAL_DB_ERROR') })
                    throw new Error(err)
                } else {
                    return res.status(200).json({ status: "success", statusCode: 200, data: resp, message: __('LOCATION_UPDATED') })
                }
            })
        } catch (err) {

            res.status(500).json({ status: "failure", statusCode: 500, message: __('INTERNAL_SERVER_ERROR') })
            throw new Error(err)
        }
    },
    changeDefaultLocation: async (req, res) => {
        try {
            let userId = req.user._id
            let data = req.body;


            //Validations
            let params = [
                { value: data.locationId, type: "string", title: __("locationId"), required: true }
            ];

            let checkErr = await validation(params);

            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message })
            }

            let setDefaultLocationData = {
                locationId: data.locationId,
                userId: userId,
                isDefault: true
            }

            let unsetDefaultLocationData = {
                userId: userId,
                isDefault: false
            }

            //set false all location
            User.unsetDefaultLocationWithUserId(unsetDefaultLocationData, function (err, resp) {
                if (err) {

                    res.status(400).json({ status: "failure", statusCode: 400, message: __('INTERNAL_DB_ERROR') })
                    throw new Error(err)
                } else {
                    //set true selected location
                    User.setDefaultLocation(setDefaultLocationData, function (error, response) {
                        if (error) {

                            res.status(400).json({ status: "failure", statusCode: 400, message: __('INTERNAL_DB_ERROR') })
                            throw new Error(error)
                        } else {
                            return res.status(200).json({ status: "success", statusCode: 200, data: response, message: __('DEFAULT_LOCATION_UPDATED') })
                        }
                    })
                }
            })
        } catch (err) {

            res.status(500).json({ status: "failure", statusCode: 500, message: __('INTERNAL_SERVER_ERROR') })
            throw new Error(err)
        }
    },
    getLocation: async (req, res) => {
        try {
            let userId = req.user._id

            let query = {
                userId: userId,
                languageCode: req.languageCode
            }
            let location = await User.getActiveUserLocations(query)
            if (location) {
                return res.status(200).json({ status: "success", statusCode: 200, data: location.locations, message: "" })
            } else {
                return res.status(200).json({ status: "success", statusCode: 200, data: [], message: __("NO_RECORD_FOUND") })
            }
        } catch (err) {

            res.status(500).json({ status: "failure", statusCode: 500, message: __('INTERNAL_SERVER_ERROR') })
            throw new Error(err)
        }
    },
    removeLocation: async (req, res) => {
        try {
            let userId = req.user._id
            let data = req.body
            let params = [
                { value: data.locationId, type: "string", title: __("locationId"), required: true }
            ];

            let checkErr = await validation(params);

            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", statusCode: 400, message: checkErr.message })
            }

            //remove location
            let location = await User.removeLocation({ userId: userId, locationId: data.locationId })

            if (location) {
                return res.status(200).json({ status: "success", statusCode: 200, data: location, message: __("LOCATION_DELETED") })
            } else {
                return res.status(400).json({ status: "failure", statusCode: 400, data: "", message: __("INTERNAL_DB_ERROR") })
            }
        } catch (err) {

            res.status(500).json({ status: "failure", statusCode: 500, message: __('INTERNAL_SERVER_ERROR') })
            throw new Error(err)
        }
    }
}
