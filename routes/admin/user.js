const express = require("express");
const router = express.Router();

const UserController = require("../../adminController/userController.js");
const authMiddleware = require("../../middleware/authMiddleware");

router.post("/getUsersWithFilter", authMiddleware, UserController.getUsersWithFilter);
router.post("/blockUser", authMiddleware, UserController.blockUser);
router.post("/removeUser", authMiddleware, UserController.removeUser);
router.post("/getUserByServiceLocation", authMiddleware, UserController.getUserByServiceLocation);
router.post("/getServiceProviderByServiceIdList", authMiddleware, UserController.getServiceProviderByServiceIdList);
router.get("/getAdminsAndProviders", authMiddleware, UserController.getAdminsAndProviders);
module.exports = router;