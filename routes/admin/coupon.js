var express = require("express");
var router = express.Router();

const CouponController = require("../../adminController/couponController");
const adminMiddleware = require("../../middleware/adminMiddleware");

router.post("/addCoupon", adminMiddleware, CouponController.addCoupon);
router.post("/filterCoupon", adminMiddleware, CouponController.filterCoupons);
router.get(
    "/couponDetails/:couponId",
    adminMiddleware,
    CouponController.couponDetails
);
router.post(
    "/updateCoupon/:couponId",
    adminMiddleware,
    CouponController.updateCoupon
);
router.post(
    "/updateCouponStatus",
    adminMiddleware,
    CouponController.updateCouponStatus
);
router.delete(
    "/deleteCoupon/:couponId",
    adminMiddleware,
    CouponController.deleteCoupon
);

module.exports = router;
