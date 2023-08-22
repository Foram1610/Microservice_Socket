var mongoose = require("mongoose");
const { data } = require("../logger");
var BlockedCategoryLocation = mongoose.Schema({
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Categories", required: true },
    countryId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Categories" }],
    governateId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Categories" }],
    cityId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Categories" }],
    districtId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Categories" }],
    status: { type: String, enum: ["active", "inactive", "suspended"], default: "active" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }, // admin user id of who blocked location
    addedBy: { type: String, enum: ["ADMIN", "SUBADMIN", "SUPERADMIN", "PROVIDER"] },
    createdAt: { type: Date },
    updatedAt: { type: Date },
});

// Statics Methods
BlockedCategoryLocation.statics = {
    getBlockedCategoryLocation: function (callback) {
        this.find({}, callback).sort({ createdAt: -1 });
    },
    getBlockedCategoryLocationByCategoryIdAsync: function (catData) {
        return this.findOne({ categoryId: catData.categoryId })
            .populate({
                path: "countryId",
                model: "Countries",
                select: '_id name',
            })
            .populate({
                path: "governateId",
                model: "Governates",
                select: '_id name',
            })
            .populate({
                path: "cityId",
                model: "Cities",
                select: '_id name',
            })
            .populate({
                path: "districtId",
                model: "Districts",
                select: '_id name',
            })
            .sort({ createdAt: -1 });
    },
    getBlockedCategoryLocationById: function (id) {
        return this.findById({ _id: id });
    },
    addBlockCategoryLocation: function (blockCatData, callback) {
        this.create(blockCatData, callback);
    },
    editBlockCategoryLocation: async function (blockCatData, callback) {
        this.findOneAndUpdate({ _id: blockCatData.blockCategoryId }, blockCatData, { new: true }, callback);
    },
    removeBlockedCategoryLocation: function (categoryId) {
        return this.remove({ categoryId: categoryId });
    },
    findCategoryByDistrict: function (districtId, governateId, cityId, countryId) {
        return this.find({ districtId: { $nin: districtId }, governateId: { $nin: governateId }, cityId: { $nin: cityId }, countryId: { $nin: countryId } }).select("categoryId")
    }
};

module.exports = mongoose.model("BlockedCategoryLocation", BlockedCategoryLocation);