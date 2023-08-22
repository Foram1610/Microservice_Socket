
const mongoose = require("mongoose");
const Country = require('../models/countrySchema');
const Region = require('../models/regionSchema');
const Governate = require('../models/governateSchema');
const City = require('../models/citySchema');
const District = require('../models/districtSchema');
const Language = require('../models/languageSchema');
const validation = require("../helper/validator.js");
const { __ } = require("i18n");

module.exports = {
    addCountry: async (req, res) => {
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
                    value: data.status,
                    type: "string",
                    title: __("status"),
                    required: true
                }
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
                let counryName = data.name[element.languageCode];
                let title = element.languageName + " name";
                params.push({
                    value: counryName,
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
            let checkCountry = await Country.countCountry(queryData);
            if (checkCountry) {
                return res.status(400).json({
                    status: "failure",
                    message: __("COUNTRY_ALREADY_EXIST")
                });
            }

            //Getting country details
            let lookup = require("country-data").lookup;
            let country = lookup.countries({ name: data.name.en })[0];
            let currency = country.currencies;
            data.currencyCode = currency[0];
            data.countryName = country.name;
            data.countryCode = country.alpha2; //two digit country code
            data.alpha3 = country.alpha3; //three digit country code
            data.countryPhoneCode = country.countryCallingCodes[0];
            data.flagUrl =
                "https://countryflag.s3.us-east-2.amazonaws.com/" +
                data.countryCode.toLowerCase() +
                ".png";

            //Getting country currency
            let getSymbolFromCurrency = require("currency-symbol-map");
            data.currencySign = getSymbolFromCurrency(data.alpha3);

            //getting time zone
            let ct = require("countries-and-timezones");
            let timezones = ct.getTimezonesForCountry(country.alpha2);
            data.countryTimezones = timezones;



            let countryData = {
                name: data.name,
                currencyCode: data.currencyCode,
                alpha3: data.alpha3,
                countryCode: data.countryCode,
                countryPhoneCode: data.countryPhoneCode,
                currencySign: data.currencySign,
                status: data.status,
                timezones: data.timezones,
                countryTimezones: data.countryTimezones,
                flagUrl: data.flagUrl,
                addedBy: req.user.userType,
                userId: req.user._id,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            //Creating country
            Country.addCountry(countryData, async (err, resp) => {
                if (err) {

                    return res.status(400).json({
                        status: "failure",
                        message: __("INTERNAL_DB_ERROR")
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: __("COUNTRY_ADDED"),
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

    editCountry: async (req, res) => {
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
                    value: data.name,
                    type: "object",
                    title: __("name"),
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

            getAllLanguage.forEach((elemen) => {
                let counryName = data.name[elemen.languageCode];
                let title = elemen.languageName + " name";
                params.push({
                    value: counryName,
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
                _id: { $ne: data.countryId },
                $or: [
                    {
                        "name.en": data.name.en
                    },
                    {
                        "name.ar": data.name.ar
                    }
                ]
            }
            let checkCountry = await Country.countCountry(queryData);
            if (checkCountry) {
                return res.status(400).json({
                    status: "failure",
                    message: __("COUNTRY_ALREADY_EXIST")
                });
            }

            //Getting country details
            let lookup = require("country-data").lookup;
            let country = lookup.countries({ name: data.name.en })[0];
            let currency = country.currencies;
            data.currencyCode = currency[0];
            data.countryName = country.name;
            data.countryCode = country.alpha2; //two digit country code
            data.alpha3 = country.alpha3; //three digit country code
            data.countryPhoneCode = country.countryCallingCodes[0];
            data.flagUrl =
                "https://countryflag.s3.us-east-2.amazonaws.com/" +
                data.countryCode.toLowerCase() +
                ".png";

            //Getting country currency
            let getSymbolFromCurrency = require("currency-symbol-map");
            data.currencySign = getSymbolFromCurrency(data.alpha3);

            //getting time zone
            let ct = require("countries-and-timezones");
            let timezones = ct.getTimezonesForCountry(country.alpha2);
            data.countryTimezones = timezones[0]; //saving first timezone of country

            let countryData = {
                name: data.name,
                countryId: data.countryId,
                currencyCode: data.currencyCode,
                alpha3: data.alpha3,
                countryCode: data.countryCode,
                countryPhoneCode: data.countryPhoneCode,
                currencySign: data.currencySign,
                status: data.status,
                timezones: data.timezones,
                countryTimezones: data.countryTimezones,
                flagUrl: data.flagUrl,

                updatedAt: new Date()

            };

            //checking country is used in regions or not when deactivate country
            if (data.status.toLowerCase() == 'inactive') {
                let isUsed = await Region.getRegionByCountryId(data.countryId);

                if (isUsed) {
                    return res.status(400).json({ status: "failure", message: __("COUNTRY_CAN_NOT_DEACTIVATE") });
                }
            }

            //Creating country
            Country.editCountry(countryData, async (err, resp) => {
                if (err) {

                    return res.status(400).json({
                        status: "failure",
                        message: __("INTERNAL_DB_ERROR")
                    });
                } else {
                    if (data.status.toLowerCase() == 'inactive') {
                        //making all governate,city,district inactive
                        await Governate.updateGovernateByCountry(data.countryId, data.status); // NOSONER
                        await City.updateCityByCountry(data.countryId, data.status); // NOSONER
                        await District.updateDistrictByCountry(data.countryId, data.status);
                    }

                    return res.status(200).json({
                        status: "success",
                        message: __("COUNTRY_UPDATED"),
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
    getCountries: async (req, res) => {
        try {
            let countryLists = await Country.getCountries();
            if (countryLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: countryLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: countryLists
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getCountriesByFilter: async (req, res) => {
        try {
            let data = req.body;

            let params = [
                {
                    value: data.language,
                    type: "string",
                    title: __("language"),
                    required: false
                },
                {
                    value: data.country,
                    type: "string",
                    title: __("country"),
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
            let criteria = {
                [languageCode]: { $regex: data.country, $options: "i" }
            };
            data.criteria = data.country ? criteria : "";
            const countryLists = await Country.filterCountries(data);
            if (countryLists.data.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: countryLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: countryLists
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getActiveCountries: async (req, res) => {
        try {
            let countryLists = await Country.getActiveCountries();
            if (countryLists.length > 0) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: countryLists
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: countryLists
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getCountryById: async (req, res) => {
        try {
            let countryId = req.params.countryId;
            let params = [
                {
                    value: countryId,
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

            let countryDetails = await Country.getCountryById(countryId);
            if (countryDetails) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: countryDetails
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: countryDetails
                });
            }
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    removeCountryById: async (req, res) => {
        try {
            let countryId = req.params.countryId;
            let params = [
                {
                    value: countryId,
                    type: "string",
                    title: __("countryId"),
                    required: true
                }
            ];
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            let countryDetails = await Country.getCountryById(countryId);
            if (!countryDetails) {
                return res.status(400).json({
                    status: "failure",
                    message: __("NO_RECORD_FOUND"),
                    data: countryDetails
                });
            }

            //chrcking country is used in regions or not
            let isUsed = await Region.getRegionByCountryId(countryId);
            if (isUsed) {
                return res.status(400).json({ status: "failure", message: __("COUNTRY_IS_USED_IN_REGIONS") });
            }

            let removeCountry = await Country.removeCountry(countryId);
            if (removeCountry) {
                await Governate.removeGovernateByCountry(countryId);
                await City.removeCityByCountry(countryId);
                await District.removeDistrictByCountry(countryId);

                return res.status(200).json({
                    status: "success",
                    message: __("COUNTRY_REMOVED"),
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
