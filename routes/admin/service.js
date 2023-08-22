var express = require("express");
var router = express.Router();

const ServiceController = require("../../adminController/serviceController");
const authMiddleware = require("../../middleware/authMiddleware");

router.post("/addService", authMiddleware, ServiceController.addService);
router.post("/editService", authMiddleware, ServiceController.editService);
router.get("/getServices", authMiddleware, ServiceController.getServices);
router.post("/getServicesWithFilter", authMiddleware, ServiceController.getServicesWithFilter);
router.get("/getActiveServices", authMiddleware, ServiceController.getActiveServices);
router.get("/getServiceById/:ServiceId", authMiddleware, ServiceController.getServiceById);
router.delete("/deleteService/:ServiceId", authMiddleware, ServiceController.removeServiceById);
router.get("/getServiceByLocation", ServiceController.getAllServiceInLication);
router.get("/ServiceByIdWithBlockedLocation/:ServiceId", ServiceController.getServiceByIdWithBlockedLocation);
router.post("/getUnblockedCountriesByServiceId", authMiddleware, ServiceController.getUnblockedCountriesByServiceId);
router.post("/getUnblockedGovernatesByService", authMiddleware, ServiceController.getUnblockedGovernatesByService);
router.post("/getUnblockedCitiesByService", authMiddleware, ServiceController.getUnblockedCitiesByService);
router.post("/getUnblockedDistrictsByService", authMiddleware, ServiceController.getUnblockedDistrictsByService);
router.post(
    "/getServiceByCategoryId",
    authMiddleware,
    ServiceController.getServiceByCategoryId
);

router.post("/getServicesByCategoryIdList", authMiddleware, ServiceController.getServicesByCategoryIdList);
router.post("/getServicesByCategoryAndLocationList", authMiddleware, ServiceController.getServicesByCategoryAndLocationList);
module.exports = router;
