const express = require("express");
const router = express.Router();
const passport = require("passport");

const AdminController = require("../../adminController/adminController.js");
const CountryController = require("../../adminController/countryController.js");
const GovernateController = require("../../adminController/governateController.js");
const CityController = require("../../adminController/cityController.js");
const DistrictController = require("../../adminController/districtController.js");
const ContactUsController = require("../../adminController/contactUsController");
const ActivityController = require("../../adminController/activities.rdbms")
const userModel = require('mongoose').model('Users')

const authMiddleware = require("../../middleware/authMiddleware");
const googleMiddleware = require("../../middleware/googleMiddleware");

//Auth Routes
router.post("/addActivity", ActivityController.addActivities);

router.post("/addAdmin", AdminController.addAdmin); // NOSONER

//admin login with passport
router.post("/adminLogin", function (req, res, next) {
    passport.authenticate("adminLocal", function (err, user, info) {

        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(400).json({ status: "failure", message: "User not found" });
        }

        //signin to passport
        req.login(user, { session: true }, (loginErr) => {
            if (loginErr) {
                return res.status(400).json({
                    status: "failure",
                    message: "Someting went wrong!"
                });
            }
            return next();
        });
    })(req, res, next);
}, AdminController.adminLogin);

router.get("/auth/adminSocialLogin", function (req, res, next) {
    passport.authenticate("google", { scope: ['email', 'profile'] }, function (err, user, info) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(400).json({ status: "failure", message: info.message });
        }

        return res.status(400).json({ status: "failure", message: "" });
    })(req, res);
}, AdminController.adminSocialLogin);

router.post("/adminLogout", authMiddleware, AdminController.adminLogout);
router.get("/getAdmins", authMiddleware, AdminController.getAdmins);
//Edit Admin profile
router.post("/editProfile", authMiddleware, AdminController.editProfile);
router.post("/changePassword", authMiddleware, AdminController.changePassword);

//Add Countries
router.post("/addCountry", authMiddleware, CountryController.addCountry);
router.post("/editCountry", authMiddleware, CountryController.editCountry);
router.get("/getCountries", authMiddleware, CountryController.getCountries);
router.post("/getCountriesWithFilter", authMiddleware, CountryController.getCountriesByFilter);
router.get("/getActiveCountries", authMiddleware, CountryController.getActiveCountries);
router.get("/getCountryById/:countryId", authMiddleware, CountryController.getCountryById);
router.delete("/removeCountryById/:countryId", authMiddleware, CountryController.removeCountryById);

//Add Governate
router.post("/addGovernate", authMiddleware, GovernateController.addGovernate);
router.post("/editGovernate", authMiddleware, GovernateController.editGovernate);
router.get("/getGovernatesByCountryId/:countryId", authMiddleware, GovernateController.getGovernatesByCountryId);
router.get("/getActivaeGovernatesByCountryId/:countryId", authMiddleware, GovernateController.getActiveGovernatesByCountryId);
router.get("/getGovernates", authMiddleware, GovernateController.getGovernates);
router.post("/getGovernateWithFilter", authMiddleware, GovernateController.getGovernatesByFilter);
router.get("/getActiveGovernates", authMiddleware, GovernateController.getActiveGovernates);
router.get("/getGovernateById/:governateId", authMiddleware, GovernateController.getGovernateById);
router.delete("/removeGovernateById/:governateId", authMiddleware, GovernateController.removeGovernateById);
router.post("/getGovernatesByCountryIdList", authMiddleware, GovernateController.getGovernatesByCountryIdList);
//Add District
router.post("/addDistrict", authMiddleware, DistrictController.addDistrict);
router.post("/editDistrict", authMiddleware, DistrictController.editDistrict);
router.get("/getDistricts", authMiddleware, DistrictController.getDistricts);
router.post("/getDistrictWithFilter", authMiddleware, DistrictController.getDistrictsByFilter);
router.get("/getDistrictsByCity/:cityId", authMiddleware, DistrictController.getDistrictsByCity);
router.get("/getActiveDistrictsByCity/:cityId", authMiddleware, DistrictController.getActiveDistrictsByCity);
router.get("/getActiveDistricts", authMiddleware, DistrictController.getActiveDistricts);
router.get("/getDistrictById/:districtId", authMiddleware, DistrictController.getDistrictById);
router.delete("/removeDistrictById/:districtId", authMiddleware, DistrictController.removeDistrictById);
router.post("/getGeolocationDetails", authMiddleware, DistrictController.validateGoogleMapDistrict);
router.post("/getDistrictsByCityIdList", authMiddleware, DistrictController.getDistrictsByCityIdList);
//Add City
router.post("/addCity", authMiddleware, CityController.addCity);
router.post("/editCity", authMiddleware, CityController.editCity);
router.get("/getCities", authMiddleware, CityController.getCities);
router.post("/getCitiesWithFilter", authMiddleware, CityController.getCitiesByFilter);
router.get("/getCitiesByGovernate/:governateId", authMiddleware, CityController.getCitiesByGovernate);
router.get("/getActiveCitiesByGovernate/:governateId", authMiddleware, CityController.getActiveCitiesByGovernate);
router.get("/getActiveCities", authMiddleware, CityController.getActiveCities);
router.get("/getCityById/:cityId", authMiddleware, CityController.getCitiesById);
router.delete("/removeCityById/:cityId", authMiddleware, CityController.removeCitiesById);
router.post("/getCitiesByGovernateIdList", authMiddleware, CityController.getCitiesByGovernateIdList);
//reset admin password
router.post("/resetPassword", AdminController.resetPassword);

//Get Contact Us
router.post("/getContactUsWithFilter", authMiddleware, ContactUsController.getContactUsByFilter);
router.post("/getContactUsContactedWithFilter", authMiddleware, ContactUsController.getContactUsContactedByFilter);
router.post("/replyToQuery", authMiddleware, ContactUsController.replyToQuery);
router.get("/getCustomerQueryById/:queryId", ContactUsController.queryDetails);





module.exports = router;
