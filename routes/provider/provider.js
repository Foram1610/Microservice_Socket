const express = require('express');
const router = express.Router();
const ProviderController = require('../../controller/providerController.js');
const EmployeeController = require('../../controller/employeeController.js');
const RegionController = require('../../controller/regionController.js');
const PagesController = require('../../controller/pagesController.js');
const passport = require('passport');
const authMiddleware = require('../../middleware/authMiddleware');
const languageMiddleware = require('../../middleware/languageMiddleware');
const verifyFirebaseAuthToken = require("../../middleware/verifyFirebaseAuthToken");
const CategoryController = require("../../controller/categoryController");

// register the provider
router.get('/testTemlate', ProviderController.testTemlate);
router.get('/verifyEmail/:userId/:email/:userType', ProviderController.verifyEmail);

router.post('/register', languageMiddleware, verifyFirebaseAuthToken, ProviderController.providerRegister);

//Auth Api's
router.post('/login', languageMiddleware, verifyFirebaseAuthToken, function (req, res, next) {
    passport.authenticate('providerLocal', function (err, user, info) {

        if (err) {

            return next(err)
        }

        if (!user) {
            return res.status(info.statusCode).json({ status: "failure", statusCode: info.statusCode, message: info.message })
        }

        //signin to passport
        req.login(user, { session: true }, (error) => {
            if (error) {

                return res.status(400).json({ status: "failure", statusCode: 400, message: "Someting went wrong!" })
            }
            return next()
        });

    })(req, res, next)
}, ProviderController.providerLogin);

router.post('/validateParams', languageMiddleware, ProviderController.validateParams);

router.post('/forgotPassword', languageMiddleware, ProviderController.forgotPassword);

router.post('/resetPassword', languageMiddleware, ProviderController.resetPassword);

router.get('/getProviderProfile', languageMiddleware, authMiddleware, ProviderController.getProviderProfile);

router.get('/getProviderDetails/:providerId', languageMiddleware, authMiddleware, ProviderController.getProviderProfile);

router.post('/editprofile', languageMiddleware, authMiddleware, ProviderController.editprofile);

router.post('/updateProfileImage', languageMiddleware, authMiddleware, ProviderController.updateProfileImage);

router.post('/logout', languageMiddleware, verifyFirebaseAuthToken, authMiddleware, ProviderController.logout);

//Get List
router.post('/listService', languageMiddleware, ProviderController.listservice)

router.get('/getMyServices', languageMiddleware, authMiddleware, ProviderController.getMyServices)
router.post('/getMyServicesByCategory', languageMiddleware, authMiddleware, ProviderController.getMyServicesByCategory)

//Get Categories
router.post('/getCategories', languageMiddleware, ProviderController.getCategories)

router.post('/deleteDocument', languageMiddleware, authMiddleware, ProviderController.deleteDocument)
router.post('/changePassword', languageMiddleware, authMiddleware, ProviderController.changePassword)

//Regions
router.post("/region/addRegion", languageMiddleware, authMiddleware, RegionController.addRegion);
router.post("/region/editRegion", languageMiddleware, authMiddleware, RegionController.editRegion);
router.get("/region/getRegions", languageMiddleware, authMiddleware, RegionController.getAllRegions);
router.post("/region/changeDefaultRegion", languageMiddleware, authMiddleware, RegionController.changeDefaultRegion);
router.post("/region/getAllRegionsWithFilter", languageMiddleware, authMiddleware, RegionController.getAllRegionsByFilter);
router.get("/region/getActiveRegions", languageMiddleware, authMiddleware, RegionController.getActiveRegions);
router.get("/region/getRegionById/:regionId", languageMiddleware, authMiddleware, RegionController.getRegionById);
router.post("/region/deleteRegion", languageMiddleware, authMiddleware, RegionController.removeRegionById);


//Get Country
router.get("/country/getActiveCountries", languageMiddleware, authMiddleware, ProviderController.getActiveCountries);
//Get Governate
router.get("/governate/getActiveGovernates/:countryId", languageMiddleware, authMiddleware, ProviderController.getActiveGovernates);
//Get District
router.get("/district/getActiveDistricts/:cityId", languageMiddleware, authMiddleware, ProviderController.getActiveDistricts)
//Get City
router.get("/city/getActiveCities/:governateId", languageMiddleware, authMiddleware, ProviderController.getActiveCities);


router.post('/getCompanyByUniqueId', languageMiddleware, EmployeeController.getCompanyByUniqueId);
router.post('/getIndividualByUniqueId', languageMiddleware, authMiddleware, EmployeeController.getIndividualByUniqueId);

//get employee joining request
router.post("/getCompanyPendingRequest", languageMiddleware, authMiddleware, EmployeeController.getCompanyPendingRequest);
router.post("/getIndividualPendingRequest", languageMiddleware, authMiddleware, EmployeeController.getIndividualPendingRequest);
router.post("/getCompanyAcceptedRequest", languageMiddleware, authMiddleware, EmployeeController.getCompanyAcceptedRequest);
router.post("/getIndividualAcceptedRequest", languageMiddleware, authMiddleware, EmployeeController.getIndividualAcceptedRequest);

router.post("/joinToCompany", languageMiddleware, authMiddleware, EmployeeController.joinToCompany);

router.post("/addEmployeeToCompany", languageMiddleware, authMiddleware, EmployeeController.addEmployeeToCompany);

router.post("/activeInactiveEmployee", languageMiddleware, authMiddleware, EmployeeController.activeInactiveEmployee);

router.post("/searchCompanyById", languageMiddleware, authMiddleware, EmployeeController.searchCompanyById);

router.post("/joinEmployeeToCompany", languageMiddleware, authMiddleware, EmployeeController.joinEmployeeToCompany);

router.post("/acceptRejectIndividualRequest", languageMiddleware, authMiddleware, EmployeeController.acceptRejectIndividualRequest);
router.post("/acceptRejectCompanyRequest", languageMiddleware, authMiddleware, EmployeeController.acceptRejectCompanyRequest);
router.post("/exitSpFromCompany", languageMiddleware, authMiddleware, EmployeeController.exitSpFromCompany);
router.post("/removeSpFromCompany", languageMiddleware, authMiddleware, EmployeeController.removeSpFromCompany);

router.get("/getServiceProviderDetails/:providerId", languageMiddleware, EmployeeController.getProviderDetails);

//contact Us
router.post('/providerContactUs', languageMiddleware, authMiddleware, PagesController.providerContactUs);

// timeslot
router.get('/timeslot/timeslotByServiceProvider/:serviceProviderId', languageMiddleware, authMiddleware, ProviderController.timeslotByServiceProvider);
router.post('/addTimeslotToProvider/:serviceProviderId', languageMiddleware, authMiddleware, ProviderController.addTimeslotToProvider);

router.post("/all-category-with-services", languageMiddleware, CategoryController.allCategoryWithServices);


module.exports = router;
