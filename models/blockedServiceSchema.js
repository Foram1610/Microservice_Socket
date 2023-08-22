var mongoose = require("mongoose");
const { data } = require("../logger");
var BlockedServiceLocation = mongoose.Schema({
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "services", required: true },
    countryId: [{ type: mongoose.Schema.Types.ObjectId, ref: "services" }],
    governateId: [{ type: mongoose.Schema.Types.ObjectId, ref: "services" }],
    cityId: [{ type: mongoose.Schema.Types.ObjectId, ref: "services" }],
    districtId: [{ type: mongoose.Schema.Types.ObjectId, ref: "services" }],
    status: { type: String, enum: ["active", "inactive", "suspended"], default: "active" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }, // admin user id of who blocked location
    addedBy: { type: String, enum: ["ADMIN", "SUBADMIN", "SUPERADMIN", "PROVIDER"] },
    createdAt: { type: Date },
    updatedAt: { type: Date },
});



module.exports = mongoose.model("BlockedServiceLocation", BlockedServiceLocation);