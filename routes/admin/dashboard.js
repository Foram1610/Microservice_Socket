var express = require("express");
var router = express.Router();

const DashboardController = require("../../adminController/dashboardController");
const authMiddleware = require("../../middleware/authMiddleware");

router.get("/dashboardDataCount", DashboardController.dashboardDataCount);
 




module.exports = router;
