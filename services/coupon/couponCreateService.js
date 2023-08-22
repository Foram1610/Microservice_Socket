
const mongoose = require("mongoose");
const Coupon = require('../../models/couponSchema');
class CouponCreateService {
    constructor(data) {
        this.data = data;
    }

    async createCoupon() {
        let result = {
            status: true,
            message: "",
        };

        let existedCoupon = await this.checkExistedCouponWithCodeAndName();

        if (existedCoupon && this.couponExistedForCode(existedCoupon)) {
            result.status = false;
            result.message = "Coupon code already existed";
        }

        if (existedCoupon && this.couponExistedForName(existedCoupon)) {
            result.status = false;
            result.message = "Coupon name already existed";
        }

        if (!result.status) {
            return result;
        }

        await Coupon.createCoupon(this.data);

        return result;
    }

    async checkExistedCouponWithCodeAndName() {
        let query = {
            $or: [{ name: this.data.name }, { code: this.data.code }],
        };

        return Coupon.findCouponByQuery(query);
    }

    couponExistedForCode(existedCoupon) {
        return existedCoupon.code == this.data.code;
    }

    couponExistedForName(existedCoupon) {
        return existedCoupon.name == this.data.name;
    }
}

module.exports = CouponCreateService;
