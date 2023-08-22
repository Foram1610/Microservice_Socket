 
const mongoose = require("mongoose");
const Category = require('../models/categorySchema');
const Country = require('../models/countrySchema');
const Governate = require('../models/governateSchema');
const City = require('../models/citySchema');
const District = require('../models/districtSchema');
const BlockCategory = require('../models/blockedCategorySchema');
const validation = require("../helper/validator.js");
const { __ } = require("i18n");
const { CognitoIdentityServiceProvider } = require("aws-sdk");

module.exports = {
    addCategory: async (req, res) => {
        try {
            let data = req.body;
            let params = [
                { value: data.name, type: "object", title: __("name"), required: true },
                { value: data.status, type: "string", title: __("status"), required: true },
                { value: data.blockedCategory, type: "object", title: __("blockedCategory"), required: false }
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }
            let checkCategory = await Category.countCategory({
                $or: [
                    {
                        "name.en": data.name.en
                    },
                    {
                        "name.ar": data.name.ar
                    }
                ]
            });
            if (checkCategory) {
                return res.status(400).json({ status: "failure", message: __("CATEGORY_ALREADY_EXIST") });
            }
            let categoryData = {
                name: data.name,
                status: data.status,
                addedBy: req.user.userType,
                userRefId: req.user._id,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            //Creating category
            Category.addCategory(categoryData, async (err, catResp) => {
                if (err) {

                    return res.status(400).json({ status: "failure", message: __("INTERNAL_DB_ERROR") });
                } else {
                    if (data.blockedCategory) {
                        req.body.blockedCategory.type = 'add'
                        req.body.blockedCategory.categoryId = catResp._id
                        module.exports.blockCategory(req, res, catResp);
                    } else {
                        return res.status(200).json({ status: "success", message: __("CATEGORY_ADDED"), data: catResp });
                    }
                }
            });
        } catch (error) {

            res.status(500).json({ status: "failure", message: __("INTERNAL_SERVER_ERROR") });
            throw new Error(error)
        }
    },
    blockCategory: async (req, res, categoryData) => {
        try {
            let data = req.body.blockedCategory
            let params = [
                { value: data.categoryId, type: "string", title: __("categoryId"), required: true },
                { value: data.countryId, type: "object", title: __("countryId"), required: false },
                { value: data.governateId, type: "object", title: __("governateId"), required: false },
                { value: data.cityId, type: "object", title: __("cityId"), required: false },
                { value: data.districtId, type: "object", title: __("districtId"), required: false },
                { value: data.type, type: "string", title: __("type"), required: true }, //add , edit
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            let categoryParams = {
                categoryId: data.categoryId,
                countryId: data.countryId,
                governateId: data.governateId,
                districtId: data.districtId,
                cityId: data.cityId,
                status: "active",
                addedBy: req.user.userType,
                userId: req.user._id,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            let message = __("CATEGORY_ADDED")
            if (data.type == 'edit') message = __("CATEGORY_UPDATED")

            //Creating category
            BlockCategory.addBlockCategoryLocation(categoryParams, async (err, resp) => {
                if (err) {

                    return res.status(400).json({ status: "failure", message: __("INTERNAL_DB_ERROR") });
                } else {
                    categoryData.blockedCategory = resp
                    res.status(200).json({ status: "success", message: message, data: categoryData });
                }
            });
        } catch (error) {

            res.status(500).json({ status: "failure", message: __("INTERNAL_SERVER_ERROR") });
            throw new Error(error)
        }
    },
    editCategory: async (req, res) => {
        try {
            let data = req.body;


            let params = [
                { value: data.categoryId, type: "string", title: __("categoryId"), required: true },
                { value: data.name, type: "object", title: __("name"), required: true },
                { value: data.status, type: "string", title: __("status"), required: true },
                { value: data.blockedCategory, type: "object", title: __("blockedCategory"), required: false }
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }

            //checking validation
            let checkCategory = await Category.countCategory({
                _id: { $ne: data.categoryId },
                $or: [
                    {
                        "name.en": data.name.en
                    },
                    {
                        "name.ar": data.name.ar
                    }
                ]
            });
            if (checkCategory) {
                return res.status(400).json({ status: "failure", message: __("CATEGORY_ALREADY_EXIST") });
            }

            let categoryData = {
                name: data.name,
                categoryId: data.categoryId,
                status: data.status,

                updatedAt: new Date()

            };

            //Creating category
            Category.editCategory(categoryData, async (err, catResp) => {
                if (err) {

                    return res.status(400).json({ status: "failure", message: __("INTERNAL_DB_ERROR") });
                } else {
                    if (data.blockedCategory) {
                        req.body.blockedCategory.type = 'edit'
                        req.body.blockedCategory.categoryId = data.categoryId
                        module.exports.blockCategory(req, res, catResp);
                    } else {
                        return res.status(200).json({ status: "success", message: __("CATEGORY_UPDATED"), data: catResp });
                    }
                }
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: "failure", message: __("INTERNAL_SERVER_ERROR") });
            throw new Error(error)
        }
    },
    getCategories: async (req, res) => {
        try {
            let categoryLists = await Category.getCategories();
            if (categoryLists.length > 0) {
                return res.status(200).json({ status: "success", message: "", data: categoryLists });
            } else {
                return res.status(200).json({ status: "success", message: __("NO_RECORD_FOUND"), data: categoryLists });
            }
        } catch (error) {

            res.status(500).json({ status: "failure", message: __("INTERNAL_SERVER_ERROR") });
            throw new Error(error)
        }
    },
    getCategoriesByFilter: async (req, res) => {
        try {
            let data = req.body;

            let params = [
                { value: data.language, type: "string", title: __("language"), required: true },
                { value: data.category, type: "string", title: __("category"), required: false },
                { value: data.page, type: "number", title: __("page"), required: true },
                { value: data.limit, type: "number", title: __("limit"), required: true },
                { value: data.sortField, type: "string", title: __("sortField"), required: true },
                { value: data.sortOrder, type: "number", title: __("sortOrder"), required: true }
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            const languageCode = `name.${data.language}`;
            let criteria = {
                [languageCode]: { $regex: data.category, $options: "i" }
            };
            data.criteria = data.category ? criteria : "";
            const categoryLists = await Category.getCategoriesWithFilter(data);
            if (categoryLists.data.length > 0) {
                return res.status(200).json({ status: "success", message: "", data: categoryLists });
            } else {
                return res.status(200).json({ status: "success", message: __("NO_RECORD_FOUND"), data: categoryLists });
            }
        } catch (error) {

            res.status(500).json({ status: "failure", message: __("INTERNAL_SERVER_ERROR") });
            throw new Error(error)
        }
    },
    getActiveCategories: async (req, res) => {
        try {
            let categoryLists = await Category.getActiveCategories();
            if (categoryLists.length > 0) {
                return res.status(200).json({ status: "success", message: "", data: categoryLists });
            } else {
                return res.status(200).json({ status: "success", message: __("NO_RECORD_FOUND"), data: categoryLists });
            }
        } catch (error) {

            res.status(500).json({ status: "failure", message: __("INTERNAL_SERVER_ERROR") });
            throw new Error(error)
        }
    },
    getCategoryById: async (req, res) => {
        try {
            let categoryId = req.params.categoryId;
            let params = [
                { value: categoryId, type: "string", title: __("categoryId"), required: true }
            ];
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res
                    .status(400)
                    .json({ status: "failure", message: checkErr.message });
            }

            let categoryDetails = await Category.getCategoryById(categoryId);
            if (categoryDetails) {
                return res.status(200).json({ status: "success", message: "", data: categoryDetails });
            } else {
                return res.status(200).json({ status: "success", message: __("NO_RECORD_FOUND"), data: categoryDetails });
            }
        } catch (error) {

            res.status(500).json({ status: "failure", message: __("INTERNAL_SERVER_ERROR") });
            throw new Error(error)
        }
    },
    getCategoryByIdWithBlockedLocation: async (req, res) => {
        try {
            let categoryId = req.params.categoryId;
            let params = [
                { value: categoryId, type: "string", title: __("categoryId"), required: true }
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            let categoryDetails = await Category.getCategoryById(categoryId);

            let blockedCategories = await BlockCategory.getBlockedCategoryLocationByCategoryIdAsync({ categoryId: categoryId });
            if (categoryDetails) {
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: {
                        category: categoryDetails,
                        blockedCategory: blockedCategories
                    }
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: {}
                });
            }
        } catch (error) {

            res.status(500).json({ status: "failure", message: __("INTERNAL_SERVER_ERROR") });
            throw new Error(error)
        }
    },
    removeCategoryById: async (req, res) => {
        try {
            let categoryId = req.params.categoryId;
            let params = [
                { value: categoryId, type: "string", title: __("categoryId"), required: true }
            ];
            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            let categoryDetails = await Category.getCategoryById(categoryId);
            if (!categoryDetails) {
                return res.status(400).json({ status: "failure", message: __("NO_RECORD_FOUND"), data: categoryDetails });
            }

            categoryDetails = await Category.removeCategory(categoryId);
            if (categoryDetails) {
                //remove blocked category when delete category
                await BlockCategory.removeBlockedCategoryLocation(categoryId);
                return res.status(200).json({ status: "success", message: __("CATEGORY_REMOVED"), data: "" });
            } else {
                return res.status(400).json({ status: "failure", message: __("INTERNAL_DB_ERROR") });
            }
        } catch (error) {

            res.status(500).json({ status: "failure", message: __("INTERNAL_SERVER_ERROR") });
            throw new Error(error)
        }
    },
    blockCategoryLocation: async (req, res) => {
        try {
            let data = req.body;
            let params = [
                { value: data.categoryId, type: "string", title: __("categoryId"), required: true },
                { value: data.countryId, type: "object", title: __("countryId"), required: false },
                { value: data.governateId, type: "object", title: __("governateId"), required: false },
                { value: data.cityId, type: "object", title: __("cityId"), required: false },
                { value: data.districtId, type: "object", title: __("districtId"), required: false },
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            let checkCategory = await Category.countCategory({ _id: data.categoryId });
            if (checkCategory <= 0) {
                return res.status(400).json({ status: "failure", message: __("INVALID_CATEGORY_ID") });
            }

            let categoryData = {
                categoryId: data.categoryId,
                countryId: data.countryId,
                governateId: data.governateId,
                districtId: data.districtId,
                cityId: data.cityId,
                status: "active",
                addedBy: req.user.userType,
                userId: req.user._id,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            //Creating category
            BlockCategory.addBlockCategoryLocation(categoryData, async (err, resp) => {
                if (err) {

                    return res.status(400).json({ status: "failure", message: __("INTERNAL_DB_ERROR") });
                } else {
                    return res.status(200).json({ status: "success", message: __("CATEGORY_BLOCKED_SUCCESSFULLY"), data: resp });
                }
            });
        } catch (error) {

            res.status(500).json({ status: "failure", message: __("INTERNAL_SERVER_ERROR") });
            throw new Error(error)
        }
    },
    getCountryForBlockCategory: async (req, res) => {
        try {
            let data = req.body;

            let params = [
                { value: data.searchValue, type: "string", title: __("searchValue"), required: false },
                { value: data.page, type: "number", title: __("page"), required: true },
                { value: data.limit, type: "number", title: __("limit"), required: true },
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }
            let limit = data.limit || 20
            let skip = parseInt(limit) * (data.page - 1)

            let query = {
                status: 'active'
            }

            if (data.searchValue) {
                query.$or = [{
                    "name.en": { $regex: data.searchValue, $options: 'i' }
                },
                {
                    "name.ar": { $regex: data.searchValue }
                }
                ]
            }

            let countryLists = await Country.findCountries(query, skip, limit);
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
    getGovernateForBlockCategory: async (req, res) => {
        try {
            let data = req.body;

            let params = [
                { value: data.searchValue, type: "string", title: __("searchValue"), required: false },
                { value: data.countryId, type: "object", title: __("countryId"), required: false },
                { value: data.page, type: "number", title: __("page"), required: true },
                { value: data.limit, type: "number", title: __("limit"), required: true },
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }
            let limit = data.limit || 20
            let skip = parseInt(limit) * (data.page - 1)

            let query = {
                status: 'active',
                countryId: {
                    $nin: data.countryId
                }
            }

            if (data.searchValue) {
                query.$or = [{
                    "name.en": { $regex: data.searchValue, $options: 'i' }
                },
                {
                    "name.ar": { $regex: data.searchValue }
                }
                ]
            }

            //skip all blocked governates which country has been blocked
            let governateLists = await Governate.findGovernates(query, skip, limit);

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
    getCityForBlockCategory: async (req, res) => {
        try {
            let data = req.body;
            let params = [
                { value: data.searchValue, type: "string", title: __("searchValue"), required: false },
                { value: data.countryId, type: "object", title: __("countryId"), required: false },
                { value: data.governateId, type: "object", title: __("governateId"), required: false },
                { value: data.page, type: "number", title: __("page"), required: true },
                { value: data.limit, type: "number", title: __("limit"), required: true },
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            let limit = data.limit || 20
            let skip = parseInt(limit) * (data.page - 1)

            let query = {
                status: 'active',
                countryId: {
                    $nin: data.countryId
                },
                governateId: {
                    $nin: data.governateId
                },
            }

            if (data.searchValue) {
                query.$or = [{
                    "name.en": { $regex: data.searchValue, $options: 'i' }
                },
                {
                    "name.ar": { $regex: data.searchValue }
                }
                ]
            }

            //Skip all city which Governate or country has been blocked
            let cityLists = await City.findCities(query, skip, limit);

            if (cityLists.length > 0) {
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
            console.log("check reporpr", error);
            return res.status(500).json({
                status: "failure",
                message: __("INTERNAL_SERVER_ERROR")
            });
        }
    },
    getDistrictForBlockCategory: async (req, res) => {
        try {
            let data = req.body;
            let params = [
                { value: data.searchValue, type: "string", title: __("searchValue"), required: false },
                { value: data.countryId, type: "object", title: __("countryId"), required: false },
                { value: data.governateId, type: "object", title: __("governateId"), required: false },
                { value: data.cityId, type: "object", title: __("cityId"), required: false },
                { value: data.page, type: "number", title: __("page"), required: true },
                { value: data.limit, type: "number", title: __("limit"), required: true },
            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }

            let limit = data.limit || 20
            let skip = parseInt(limit) * (data.page - 1)

            let query = {
                status: 'active',
                countryId: {
                    $nin: data.countryId
                },
                governateId: {
                    $nin: data.governateId
                },
                cityId: {
                    $nin: data.cityId
                },
            }

            if (data.searchValue) {
                query.$or = [{
                    "name.en": { $regex: data.searchValue, $options: 'i' }
                },
                {
                    "name.ar": { $regex: data.searchValue }
                }
                ]
            }


            //Skip all city which city or Governate or country has been blocked
            let districtLists = await District.findDistricts(query, skip, limit);

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
    getCategoryByLocationList: async (req, res) => {
        try {
            let data = req.body
            let params = [

                { value: data.districtId, type: "object", title: __("districtId"), required: true },
                { value: data.governateId, type: "object", title: __("governateId"), required: true },
                { value: data.cityId, type: "object", title: __("cityId"), required: true },
                { value: data.countryId, type: "object", title: __("countryId"), required: true },

            ];

            let checkErr = await validation(params);
            if (!checkErr.status) {
                return res.status(400).json({ status: "failure", message: checkErr.message });
            }
            let categoryList = await BlockCategory.findCategoryByDistrict(data.districtId, data.governateId, data.cityId, data.countryId);
            let categories = categoryList?.map(cat => cat.categoryId)

            let categ = await Category.getCategoriesByDistrict(categories);
            if (categoryList?.length > 0) {

                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: categ
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: __("NO_RECORD_FOUND"),
                    data: categoryList
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