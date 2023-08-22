let express = require("express");
let router = express.Router();
const TaskController = require("../../controller/taskController");
const authMiddleware = require("../../middleware/authMiddleware");
const languageMiddleware = require('../../middleware/languageMiddleware');

router.get("/getTaskById/:taskId", languageMiddleware, authMiddleware, TaskController.getTaskById);

module.exports = router;