let express = require("express");
let router = express.Router();
const TaskController = require("../../adminController/taskController");
const authMiddleware = require("../../middleware/authMiddleware");

router.post("/addTask", authMiddleware, TaskController.addTask);
router.post("/editTaskStatus/:taskId", authMiddleware, TaskController.editTaskStatus);
router.post(
    "/getTasksWithFilter",
    authMiddleware,
    TaskController.getTasksWithFilter
);
router.get(
    "/getTasks",
    authMiddleware,
    TaskController.getTasks
);
router.get("/getTaskById/:taskId", authMiddleware, TaskController.getTaskById);
router.delete("/deleteTask/:taskId", authMiddleware, TaskController.deleteTask);
router.delete(
    "/deleteTaskCondition/:objId",
    authMiddleware,
    TaskController.deleteTaskCondition
);
router.delete(
    "/deleteTaskField/:objId",
    authMiddleware,
    TaskController.deleteTaskField
);
router.patch("/editTask", authMiddleware, TaskController.editTask);
router.patch("/editTaskField", authMiddleware, TaskController.editTaskField);
router.patch(
    "/editTaskCondition",
    authMiddleware,
    TaskController.editTaskCondition
);

router.post(
    "/getFieldValueByFieldId",
    authMiddleware,
    TaskController.getFieldValueByFieldId
);

router.post(
    "/getFieldByFieldType",
    authMiddleware,
    TaskController.getFieldByFieldType
);
router.post("/getTasksByServiceIdList", authMiddleware, TaskController.getTasksByServiceIdList);
module.exports = router;
