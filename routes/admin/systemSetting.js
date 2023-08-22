var express = require("express");
var router = express.Router();

const systemSettingController = require("../../adminController/systemSettingController");
const authMiddleware = require("../../middleware/authMiddleware");
const adminMiddleware = require("../../middleware/adminMiddleware");

router.post("/updateReferralSettings", adminMiddleware, systemSettingController.addReferralSetting);

router.get("/getReferralSettings", adminMiddleware, systemSettingController.getReferralSetting);

module.exports = router;
