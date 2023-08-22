const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
        serviceProvider: {
            type: String
        },
        status: {
            type: String,
            enum: ["Pending", "Approved", "Cancelled"],
            default: "Pending"
        },
        reason: {
            type: String
        },
        offers: {
            offerName: { type: String },
            offerCreatedBy: { type: String },
            offerImage: { type: String },
            offerCreatedOn: { type: Date, default: Date.now }
        },
        offerProvided: {
            offer: { type: String },
            offerApplyArea: { type: String }
        },
        offerPeriod: {
            offerMode: {
                offerType: { type: String },
                from: { type: String },
                to: { type: String }
            },
            offerRepeat: {
                offerRepeatType: { type: String },
                weekday: { type: String },
                order: { type: String },
                from: { type: String },
                to: { type: String }
            }
        },
        location: {
            otherLocation: { type: String },
            offerTermAndCondition: { type: String }
        },
        // createdAt: { type: Date, default: Date.now },
        // UpdatedAt: { type: Date }
    },
    {
        timestamps :  true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        id: false
    }
);

// Statics Methods
offerSchema.statics = {};

module.exports = mongoose.model("Offers", offerSchema);