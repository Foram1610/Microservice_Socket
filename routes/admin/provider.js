var express = require('express');
var router = express.Router();
const ProviderController = require('../../adminController/providerController');
const authMiddleware = require("../../middleware/authMiddleware");


router.post("/getProvidersWithFilter", authMiddleware, ProviderController.getProvidersWithFilter);
router.post("/approveProvider", authMiddleware, ProviderController.approveProvider);
router.post("/blockProvider", authMiddleware, ProviderController.blockProvider);
router.post("/removeProvider", authMiddleware, ProviderController.removeProvider);
router.get("/getApprovedServiceProvider", authMiddleware, ProviderController.getApprovedServiceProvider);


module.exports = router;
