const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CompanyEmployeeSchema = Schema(
    {
        individualId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        companyId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        requestStatus: {
            type: String,
            enum: ["pending", "accepted", "declined"],
        },
        requestedBy: { type: String, enum: ["INDIVIDUAL", "COMPANY"] },
        status: { type: String, enum: ["active", "inactive"] },
        isDeleted: { type: Boolean, default: false },
        createdAt: { type: Date },
        updatedAt: { type: Date },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        id: false,
    }
);

CompanyEmployeeSchema.virtual("individualDetails", {
    ref: "Users",
    localField: "individualId",
    foreignField: "_id",
    justOne: true,
});

CompanyEmployeeSchema.virtual("companyDetails", {
    ref: "Users",
    localField: "companyId",
    foreignField: "_id",
    justOne: true,
});

CompanyEmployeeSchema.statics = {
    addRequest: function (data, callback) {
        this.findOneAndUpdate(
            { individualId: data.individualId, companyId: data.companyId },
            data,
            { upsert: true, new: true },
            callback
        );
    },
    acceptRejectRequestByCompany: function (data, callback) {
        this.updateOne(
            { _id: data.requestId },
            { requestStatus: data.requestStatus },
            callback
        );
    },
    declineRequestByCompany: function (data, callback) {
        this.updateOne(
            { _id: data.requestId },
            { requestStatus: "declined" },
            callback
        );
    },
    acceptRequestByIndividual: function (data, callback) {
        this.updateOne(
            { _id: data.requestId },
            { requestStatus: "accepted" },
            callback
        );
    },
    declineRequestByIndividual: function (reqData, callback) {
        this.updateOne(
            { _id: reqData.requestId },
            { requestStatus: "declined" },
            callback
        );
    },
    activeInactiveRequest: function (data, callback) {
        let updateData = {
            status: data.status,
            updatedAt: new Date(),
        };
        this.updateOne({ _id: data.requestId }, updateData, callback);
    },
    removeJoinRequestByProviderId: async function (data) {
        const User = mongoose.model('Users');
        //remove assigned user which has joined to this company
        await User.updateMany({ assignedCompanyId: data.userId }, { $unset: { assignedCompanyId: "" } });
        return this.deleteMany({ $or: [{ individualId: data.userId }, { companyId: data.userId }] });
    },
    removeRequestById: function (data, callback) {
        this.remove({ _id: data.requestId }, callback);
    },
    getCompanyPendingRequest: function (data) {
        let limit = data.limit ? data.limit : 10;
        let page = data.page ? data.page : 1;
        let skip = limit * (page - 1);



        return this.find({ companyId: data.companyId, requestStatus: "pending" })
            .populate({
                path: "individualDetails",
                select: "_id name uniqueId email mobileNumber countryCode address profileImage"
            })
            .populate({
                path: "companyDetails",
                select: "_id name uniqueId email companyName commercialRegNo mobileNumber countryCode address profileImage"
            })
            .skip(skip)
            .limit(limit)
            .sort([['createdAt', -1]]);
    },
    getCompanyAcceptedRequest: function (data) {
        let limit = data.limit ? data.limit : 10;
        let page = data.page ? data.page : 1;
        let skip = limit * (page - 1);


        return this.find({ companyId: data.companyId, requestStatus: "accepted" })
            .populate({
                path: "individualDetails",
                select: "_id name uniqueId email mobileNumber countryCode address profileImage"
            })
            .populate({
                path: "companyDetails",
                select: "_id name uniqueId email companyName commercialRegNo mobileNumber countryCode address profileImage"
            })
            .skip(skip)
            .limit(limit)
            .sort([['createdAt', -1]]);
    },
    getIndividualPendingRequest: function (data) {
        let limit = data.limit ? data.limit : 10;
        let page = data.page ? data.page : 1;
        let skip = limit * (page - 1);



        return this.find({ individualId: data.individualId, requestStatus: "pending" })
            .populate({
                path: "individualDetails",
                select: "_id name uniqueId email mobileNumber countryCode address profileImage"
            })
            .populate({
                path: "companyDetails",
                select: "_id name uniqueId companyName commercialRegNo email mobileNumber countryCode address profileImage"
            })
            .skip(skip)
            .limit(limit)
            .sort([['createdAt', -1]]);
    },
    getIndividualAcceptedRequest: function (data) {
        let limit = data.limit ? data.limit : 10;
        let page = data.page ? data.page : 1;
        let skip = limit * (page - 1);


        return this.find({ individualId: data.individualId, requestStatus: "accepted" })
            .populate({
                path: "individualDetails",
                select: "_id name uniqueId email mobileNumber countryCode address profileImage"
            })
            .populate({
                path: "companyDetails",
                select: "_id name uniqueId companyName commercialRegNo email mobileNumber countryCode address profileImage"
            })
            .skip(skip)
            .limit(limit)
            .sort([['createdAt', -1]]);
    },
    findEmployee: function (data) {
        return this.findOne(data)
    }
};

module.exports = mongoose.model("CompanyEmployees", CompanyEmployeeSchema);
