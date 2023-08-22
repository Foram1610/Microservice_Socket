var express = require('express');
var router = express.Router();
const contentController = require('../../adminController/contentController');
const authMiddleware = require('../../middleware/authMiddleware');

router.post('/addContent',authMiddleware,contentController.addContent);
router.post('/editContent',authMiddleware,contentController.editContent);
router.get('/getAllContents',authMiddleware,contentController.getAllContents);
router.get('/getContentById/:id',authMiddleware,contentController.getContentById);
router.post('/deleteContent',authMiddleware,contentController.deleteContent);

//For mobile Applicatio return html content
router.get('/getPrivacyPolicyContent',contentController.getPrivacyPolicyContent);
router.get('/getPaymentAndRefundPolicies',contentController.getPaymentAndRefundPolicies);
router.get('/getTermsCondition',contentController.getTermsCondition);

module.exports = router;
