var express = require('express');
var router = express.Router();
const faqController = require('../../../../adminController/faqController');
const authentication = require('../../../../middleware/authentication')

router.post('/addFaq',authentication,faqController.addFaq);
router.post('/editFaq',authentication,faqController.editFaq);
router.post('/deleteFaq',authentication,faqController.deleteFaq);
router.get('/getAllFaqs',faqController.getAllFaqs);
router.get('/getAllFaqs',faqController.getAllFaqs);
router.post('/getAllFaqsWithFilter',faqController.getAllFaqsWithFilter);
router.get('/getFaqsById/:id',authentication,faqController.getFaqsById);


module.exports = router;
