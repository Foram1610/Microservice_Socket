const express = require('express');
const router = express.Router();

const LanguageController = require('../../adminController/languageController.js');
const authMiddleware = require('../../middleware/authMiddleware');

router.post('/addLanguage',authMiddleware, LanguageController.addLanguage);
router.post('/editLanguage',authMiddleware, LanguageController.editLanguage);
router.get('/getLanguageList',authMiddleware, LanguageController.getLanguageList);
router.get('/getEnabledLanguageList',authMiddleware, LanguageController.getEnabledLanguageList);
router.get('/getLanguageDetailsById/:languageId',authMiddleware, LanguageController.getLanguageDetailsById);
router.post('/removeLanguageData',authMiddleware, LanguageController.removeLanguageData);


module.exports = router;