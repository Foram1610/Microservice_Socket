var express = require("express");
var router = express.Router();

const CategoryController = require("../../adminController/categoryController");
const authMiddleware = require("../../middleware/authMiddleware");

router.post("/addCategory", authMiddleware, CategoryController.addCategory);
router.post("/editCategory", authMiddleware, CategoryController.editCategory);
router.get("/getCategories", authMiddleware, CategoryController.getCategories);
router.post("/getCategoriesWithFilter", authMiddleware, CategoryController.getCategoriesByFilter);
router.get("/getActiveCategories", authMiddleware, CategoryController.getActiveCategories);
router.get("/getCategoryById/:categoryId", authMiddleware, CategoryController.getCategoryById);
router.delete("/deleteCategory/:categoryId", authMiddleware, CategoryController.removeCategoryById);

//block category location
router.post("/blockCategoryLocation", authMiddleware, CategoryController.blockCategoryLocation);

router.post("/getCountryForBlockCategory", authMiddleware, CategoryController.getCountryForBlockCategory);
router.post("/getGovernateForBlockCategory", authMiddleware, CategoryController.getGovernateForBlockCategory);
router.post("/getCityForBlockCategory", authMiddleware, CategoryController.getCityForBlockCategory);
router.post("/getDistrictForBlockCategory", authMiddleware, CategoryController.getDistrictForBlockCategory);
router.get("/getCategoryByIdWithBlockedLocation/:categoryId", authMiddleware, CategoryController.getCategoryByIdWithBlockedLocation);
router.post("/getCategoryByLocationList", authMiddleware, CategoryController.getCategoryByLocationList);





module.exports = router;
