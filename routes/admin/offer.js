const express = require('express');
const router = express.Router();
const offerController = require('../../adminController/offerController');
const authMiddleware = require("../../middleware/authMiddleware");

router.post("/addOffer", authMiddleware,offerController.addOffer);
router.post("/getOffersWithFilter", authMiddleware,offerController.getOffersWithFilter);
router.get("/getOffers", authMiddleware,offerController.getOffers);
router.delete("/deleteOffer/:offerId", authMiddleware,offerController.deleteOffer);
router.patch("/editOffer", authMiddleware, offerController.editOffer);
router.patch("/editBanner/:offerId", authMiddleware,offerController.editBanner)
router.patch("/editTermAndCondition/:offerId", authMiddleware,offerController.editTermAndCondition)
router.patch("/updateStatus/:offerId", authMiddleware,offerController.updateStatus)
router.get("/getOfferById/:offerId", authMiddleware,offerController.getOfferById);

module.exports = router;
