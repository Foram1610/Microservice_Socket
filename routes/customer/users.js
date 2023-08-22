const express = require('express');
const router = express.Router();
const passport = require('passport');

const Usercontroller = require('../../controller/userController.js');
const LocationController = require('../../controller/locationController.js');
const authMiddleware = require('../../middleware/authMiddleware');
const languageMiddleware = require('../../middleware/languageMiddleware');
const verifyFirebaseAuthToken = require("../../middleware/verifyFirebaseAuthToken");
const PagesController = require('../../controller/pagesController.js');



//Routes
router.post('/register',languageMiddleware, verifyFirebaseAuthToken, Usercontroller.userRegister);
router.post('/login', languageMiddleware, verifyFirebaseAuthToken, function (req, res, next) {
    passport.authenticate('userLocal', function (err, user, info) {
        if (err) {

            return next(err)
        }

        if (!user) {
            return res.status(info.statusCode).json({ status: "failure", statusCode: info.statusCode, message: info.message })
        }

        //signin to passport
        req.login(user, { session: true }, (error) => {
            if (error) {

                return res.status(400).json({ status: "failure", statusCode: 400, message: __("SOMETHING_WENT_WRONG") });
            }
            return next()
        });

    })(req, res, next)
}, Usercontroller.userLogin);


router.get('/verifyEmail/:userId/:email/:userType', Usercontroller.verifyEmail);

router.post('/validateParams', languageMiddleware, Usercontroller.validateParams);

router.post('/forgotPassword', languageMiddleware, Usercontroller.forgotPassword);

router.post('/resetPassword', languageMiddleware, Usercontroller.resetPassword);

router.post('/changePassword', languageMiddleware, authMiddleware, Usercontroller.changePassword)

router.get('/getUserProfile', languageMiddleware, authMiddleware, Usercontroller.getUserProfile);

router.get('/getUserDetails/:userId', languageMiddleware, authMiddleware, Usercontroller.getUserDetails);

router.post('/editprofile', languageMiddleware, authMiddleware, Usercontroller.editprofile);

router.post('/updateProfileImage', languageMiddleware, authMiddleware, Usercontroller.updateProfileImage);

//add Location
router.post('/addLocation', languageMiddleware, authMiddleware, LocationController.addLocation);
router.post('/editLocation', languageMiddleware, authMiddleware, LocationController.editLocation);
router.get('/getLocation', languageMiddleware, authMiddleware, LocationController.getLocation);
router.post('/removeLocation', languageMiddleware, authMiddleware, LocationController.removeLocation);
router.post('/changeDefaultLocation', languageMiddleware, authMiddleware, LocationController.changeDefaultLocation);

//Get Country
router.get("/country/getActiveCountries", languageMiddleware, authMiddleware, Usercontroller.getActiveCountries);
// //Get Governate
router.get("/governate/getActiveGovernates/:countryId", languageMiddleware, authMiddleware, Usercontroller.getActiveGovernates);
// //Get District
router.get("/district/getActiveDistricts/:cityId", languageMiddleware, authMiddleware, Usercontroller.getActiveDistricts)
// //Get City
router.get("/city/getActiveCities/:governateId", languageMiddleware, authMiddleware, Usercontroller.getActiveCities);

router.post('/logout', languageMiddleware, verifyFirebaseAuthToken, authMiddleware, Usercontroller.logout);

router.post('/revokeFirebaseRefreshTokens', languageMiddleware, verifyFirebaseAuthToken, authMiddleware, Usercontroller.revokeFirebaseRefreshTokens);

router.post('/userContactUs', languageMiddleware, authMiddleware, PagesController.userContactUs);
router.post('/contactUs', languageMiddleware, PagesController.contactUs);


// check if user inside district bound (not needed)
router.post('/checkIfUserInsideAnyBound', Usercontroller.checkIfUserInsideAnyBound);
router.post('/showActiveServiceToCustomerByLocation', languageMiddleware, authMiddleware, Usercontroller.showServiceToCustomerByLocation);
module.exports = router;
