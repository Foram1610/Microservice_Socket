const mongoose = require('mongoose');
const Offer = require('../models/offerSchema');
const upload = require('../lib/Imageupload.js');
const singleImageUpload = upload.single('offerImage');
const { __ } = require('i18n');

module.exports = {
    addOffer: async (req, res) => {
        try {
            let { userId, serviceProvider, status, reason, offers, offerProvided, offerPeriod, location } = req.body;

            let offerData = new Offer({ userId, serviceProvider, status, reason, offers, offerProvided, offerPeriod, location });

            let offer = await offerData.save();
            return res.status(200).json({
                status: "success",
                message: "",
                data: offer
            });
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }
    },
    editBanner: async (req, res) => {
        try {
            singleImageUpload(req, res, async function (err, resp) {
                let data = req.body;
                let file = req.file;
                if (file) {
                    if (err) {

                        return res.status(400).json({ status: "failure", message: __("IMAGE_UPLOAD_ERROR") })
                    }
                    data.offerImage = req.file.location
                } else {
                    data.offerImage = ''
                }
                let offer = await Offer.findByIdAndUpdate(
                    { _id: req.params.offerId },
                    { $set: { 'offers.offerImage': data.offerImage } },
                    { new: true }
                )
                await offer.save();
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: offer
                });
            })
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }
    },
    editTermAndCondition: async (req, res) => {
        try {
            let data = req.body;
            let offer = await Offer.findByIdAndUpdate(
                { _id: req.params.offerId },
                { $set: { 'location.offerTermAndCondition': data.body } },
                { new: true }
            )
            return res.status(200).json({
                status: "success",
                message: "",
                data: offer
            });
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }
    },
    updateStatus: async (req, res) => {
        try {

            let data = req.body;

            let offer;

            if (data.status === "Cancelled") {
                offer = await Offer.findByIdAndUpdate(
                    { _id: req.params.offerId },
                    {
                        $set: {
                            status: data.status,
                            reason: data.reason
                        }
                    },
                    { new: true }
                )
                if (!offer) {
                    return res.status(401).json({
                        status: "failure",
                        message: "No Offer Found",
                        data: ""
                    });
                }

            } else {
                offer = await Offer.findByIdAndUpdate(
                    { _id: req.params.offerId },
                    {
                        $set: {
                            status: data.status
                        }
                    },
                    { new: true }
                )
            }

            return res.status(200).json({
                status: "success",
                message: "",
                data: offer
            });


        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }
    },
    getOfferById: async (req, res) => {
        try {
            let offers = await Offer.findOne({ _id: req.params.offerId });
            return res.status(200).json({
                status: "success",
                message: "",
                data: offers
            });
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }
    },
    getOffersWithFilter: async (req, res) => {
        try {
            let data = req.body;
            let limit = data.limit;
            let sortField = data.sortField;
            let sortOrder = parseInt(data.sortOrder);

            let page = 0;
            if (data.page >= 0) {
                if (data.page > 0) {
                    page = data.page - 1;

                }

                let offers = await Offer.find()
                    .limit(parseInt(limit))
                    .skip(limit * page)
                    .sort({ [sortField]: sortOrder });
                if (!offers) {
                    return res.status(400).json({
                        status: "failure",
                        message: "Not found",
                        data: ""
                    });
                }
                return res.status(200).json({
                    status: "success",
                    message: "",
                    data: offers
                });
            } else {
                return res.status(400).json({
                    status: "failure",
                    message: "Page number must be greater then zero",
                    data: ""
                });
            }

        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }
    },
    getOffers: async (req, res) => {
        try {
            let offers = await Offer.find();
            return res.status(200).json({
                status: "success",
                message: "",
                data: offers
            });
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }
    },

    deleteOffer: async (req, res) => {
        try {
            let data = req.params;
            await Offer.deleteOne({ _id: data.offerId });
            let newOffers = await Offer.find();

            return res.status(200).json({
                status: "success",
                message: "The offer has been deleted!",
                data: newOffers
            });
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }

    },
    editOffer: async (req, res) => {
        try {

            let data = req.body;
            let offer = await Offer.findByIdAndUpdate(
                { _id: data.offerId },
                {
                    $set: {
                        userId: req.user._id,
                        name: data.name,
                        addedBy: req.user.userType,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
                },
                { new: true }
            );


            if (offer) {
                await offer.save();
            } else {
                return res.status(404).json({
                    status: "faliure",
                    message: "No record found",
                    data: offer
                });
            }

            return res.status(200).json({
                status: "success",
                message: "",
                data: offer
            });
        } catch (error) {

            return res.status(500).json({
                status: "failure",
                message: __(error.message)
            });
        }
    }
}