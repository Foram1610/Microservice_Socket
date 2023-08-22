 
const mongoose = require("mongoose");
const Coupon = require('../models/couponSchema');
const { __ } = require("i18n");

const validator = require("../validations/validator");
const {
    couponCreateValidation,
    couponFilterValidation,
    couponUpdateValidation, statusUpdateValidation,
} = require("../validations/couponValidation");
const CouponFilterService = require("../services/coupon/couponFilterService");
const CouponUpdateService = require("../services/coupon/couponUpdateService");
const CouponCreateService = require("../services/coupon/couponCreateService");

module.exports = {
    addCoupon: async (req, res) => {
        try {
            let data = req.body;
            data.createdBy = req.user._id;

            const { error, value } = validator(couponCreateValidation, data);
            if (error) {
                return res.status(400).json({
                    status: "failure",
                    message: __(error.message),
                });
            }
            value.updatedBy=req.user._id;
            value.modifiedBy=req.user.userType;

            let couponCreateService = new CouponCreateService(value);
            let { status, message } = await couponCreateService.createCoupon();

            if (!status) {
                return res.status(400).json({
                    status: "failure",
                    message: __(message),
                });
            }


            return res.status(200).json({
                status: "success",
                message: __("Coupon created successfully"),
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "failure",
                message: error.message,
            });
        }
    },

    filterCoupons: async (req, res) => {
        try {
            let data = req.body;
            const { error, value } = validator(couponFilterValidation, data);
            if (error) {
                return res.status(400).json({
                    status: "failure",
                    message: __(error.message),
                });
            }

            let couponFilterService = new CouponFilterService(value);

            let result = await couponFilterService.filterCoupon();

            return res.status(200).json({
                status: "success",
                message: __("Coupon list"),
                data: result,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "failure",
                message: error.message,
            });
        }
    },

    couponDetails: async (req, res) => {
        try {
            let couponId = req.params.couponId;
            console.log(couponId);
            let coupon = await Coupon.getCouponAllDetails(couponId);

            if (!coupon) {
                return res.status(400).json({
                    status: "failure",
                    message: __("Coupon not found"),
                });
            }

            return res.status(200).json({
                status: "success",
                message: __("Coupon details"),
                data: coupon,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "failure",
                message: error.message,
            });
        }
    },

    updateCoupon: async (req, res) => {
        try {
            let couponId = req.params.couponId;
            let data = req.body;

            const { error, value } = validator(couponCreateValidation, data);
            if (error) {
                return res.status(400).json({
                    status: "failure",
                    message: __(error.message),
                });
            }


            value.updatedBy=req.user._id;
            value.modifiedBy=req.user.userType;
            let couponUpdateService = new CouponUpdateService(couponId, value);

            let {status, message}=await couponUpdateService.updateCoupon();

            if(!status){
                return res.status(400).json({
                    status: "failure",
                    message: __(message),
                });
            }

            return res.status(200).json({
                status: "success",
                message: __("Coupon updated successfully"),
                data: value,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "failure",
                message: error.message,
            });
        }
    },
    //coupon coupon status
    updateCouponStatus: async (req, res) => {
        try {

            const { error, value } = validator(statusUpdateValidation, req.body);
            if (error) {
                return res.status(400).json({
                    status: "failure",
                    message: __(error.message),
                });
            }

            let {status,couponId} = value;




            await Coupon.updateStatus(couponId, status);

            if(!status){
                return res.status(400).json({
                    status: "failure",
                    message: __(message),
                });
            }

            return res.status(200).json({
                status: "success",
                message: __("Coupon status updated successfully"),
                data: value,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "failure",
                message: error.message,
            });
        }
    },


    //delete coupon
    deleteCoupon: async (req, res) => {
        try {
            let couponId = req.params.couponId;
            let coupon = await Coupon.findCouponById(couponId);
            if (!coupon) {
                return res.status(400).json({
                    status: "failure",
                    message: __("Coupon not found"),
                });
            }

            await Coupon.deleteCoupon(couponId);

            return res.status(200).json({
                status: "success",
                message: __("Coupon deleted successfully"),
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "failure",
                message: error.message,
            });
        }
    },
};
