var express = require('express');
var router = express.Router();
const TimeSlotController = require('../../adminController/timeSlotController');
const authMiddleware = require("../../middleware/authMiddleware");


router.post("/addTimeSlot", authMiddleware, TimeSlotController.addTimeSlot);
router.post("/getTimeSlotWithFilter", authMiddleware, TimeSlotController.getTimeSlotWithFilter);
router.get("/getTimeSlotById/:timeSlotId", authMiddleware, TimeSlotController.getTimeSlotById);
router.get("/getTimeSlot", authMiddleware, TimeSlotController.getTimeSlot);
router.delete("/deleteTimeSlot/:timeSlotId", authMiddleware, TimeSlotController.deleteTimeSlot);
router.patch("/editTimeSlotStatus/:timeSlotId", authMiddleware, TimeSlotController.editTimeSlotStatus);
router.patch("/editTimeSlot", authMiddleware, TimeSlotController.editTimeSlot);





module.exports = router;
