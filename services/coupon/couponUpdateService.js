const mongoose = require("mongoose");
const Coupon = require('../../models/couponSchema');

class CouponUpdateService {
    constructor(couponId, updatedData) {
        this.data = updatedData;
        this.couponId = couponId;
    }

    async updateCoupon() {
        try {
            let result = {
                status: true,
                message: "",
            };

            let findCoupon = await Coupon.findCouponById(this.couponId);
            if (!findCoupon) {
                result.status = false;
                result.message = "Coupon not found";
            }

            let existedCoupon = await this.checkExistedCouponWithCodeAndName();

            if (existedCoupon && this.couponExistedForCode(existedCoupon)) {

                result.status = false;
                result.message = "Coupon code already existed";
            }

            if (existedCoupon && this.couponExistedForName(existedCoupon)) {


                result.status = false;
                result.message = "Coupon name already existed";
            }

            if (result.status === false) {
                return result;
            }

            await Coupon.updateCoupon(this.couponId, this.data);

            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async checkExistedCouponWithCodeAndName() {
        let query = {
            $or: [
                {
                    name: this.data.name,
                    _id: { $ne: this.couponId },
                },
                {
                    code: this.data.code,
                    _id: { $ne: this.couponId },
                },
            ],
        };
        console.log('query', query);


        let existed = await Coupon.findCouponByQuery(query);
        console.log('existed', existed);

        return existed;
    }

    couponExistedForCode(existedCoupon) {
        return existedCoupon.code == this.data.code;
    }

    couponExistedForName(existedCoupon) {
        return existedCoupon.name === this.data.name;
    }
}

module.exports = CouponUpdateService;
