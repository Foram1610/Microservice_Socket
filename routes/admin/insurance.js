var express = require('express');
var router = express.Router();
const InsuranceController = require('../../adminController/insuranceController');
const authMiddleware = require("../../middleware/authMiddleware");

router.post("/addInsurance", authMiddleware, InsuranceController.addInsurance);
router.post("/getInsuranceWithFilter", authMiddleware, InsuranceController.getInsuranceWithFilter);
router.get("/getInsuranceById/:insuranceId", authMiddleware, InsuranceController.getInsuranceById);
router.get("/getInsurance", authMiddleware, InsuranceController.getInsurance);
router.delete("/deleteInsurance/:insuranceId", authMiddleware, InsuranceController.deleteInsurance);
router.patch("/editInsuranceStatus/:insuranceId", authMiddleware, InsuranceController.editInsuranceStatus);
router.patch("/editInsurance", authMiddleware, InsuranceController.editInsurance);

module.exports = router;