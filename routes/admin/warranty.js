var express = require('express');
var router = express.Router();
const WarrantyController = require('../../adminController/warrantyController');
const authMiddleware = require("../../middleware/authMiddleware");

router.post("/addWarranty", authMiddleware, WarrantyController.addWarranty);
router.post("/getWarrantyWithFilter", authMiddleware, WarrantyController.getWarrantyWithFilter);
router.get("/getWarrantyById/:warrantyId", authMiddleware, WarrantyController.getWarrantyById);
router.get("/getWarranty", authMiddleware, WarrantyController.getWarranty);
router.delete("/deleteWarranty/:warrantyId", authMiddleware, WarrantyController.deleteWarranty);
router.patch("/editWarrantyStatus/:warrantyId", authMiddleware, WarrantyController.editWarrantyStatus);
router.patch("/editWarranty", authMiddleware, WarrantyController.editWarranty);

module.exports = router;