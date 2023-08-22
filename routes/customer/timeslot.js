let express = require("express");
let router = express.Router();
const TimeSlotController = require("../../controller/timeslotController");
const authMiddleware = require("../../middleware/authMiddleware");
const languageMiddleware = require('../../middleware/languageMiddleware');

router.get("/getTimeSlotByServiceId/:serviceId", languageMiddleware, authMiddleware, TimeSlotController.getTimeSlotByServiceId);

module.exports = router;