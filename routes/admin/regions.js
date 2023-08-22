var express = require("express");
var router = express.Router();
const RegionController = require("../../adminController/regionController");
const authMiddleware = require("../../middleware/authMiddleware");

router.post("/addRegion", authMiddleware, RegionController.addRegion);
router.post("/editRegion", authMiddleware, RegionController.editRegion);
router.get("/getRegions", authMiddleware, RegionController.getAllRegions);
router.post(
    "/getAllRegionsWithFilter",
    authMiddleware,
    RegionController.getAllRegionsByFilter
);
router.get(
    "/getActiveRegions",
    authMiddleware,
    RegionController.getActiveRegions
);
router.get(
    "/getRegionById/:regionId",
    authMiddleware,
    RegionController.getRegionById
);
router.delete("/deleteRegion/:regionId", authMiddleware, RegionController.removeRegionById);

module.exports = router;
