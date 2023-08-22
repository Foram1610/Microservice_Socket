const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contentSchema = new Schema({
	name: { type: Object },
	type: { type: String, enum: ["ABOUT_US", "PRIVACY_POLICY", "PAYMENT_AND_REFUND_POLICY", "TERMS_CONDITIONS"] },
	content: { type: Object },
	status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
	addedBy: { type: String, enum: ['ADMIN', 'SUBADMIN', 'SUPERADMIN', 'PROVIDER'], required: true },
	createdAt: { type: Date },
	updatedAt: { type: Date },
});

// Pre-remove hook
contentSchema.pre('remove', function (next) {
	next();
});

// Pre-save hook
contentSchema.pre('save', function (next) {
	next();
});

// Methods
contentSchema.methods = {};

// Statics Methods
contentSchema.statics = {
	getContents: function (callback) {
		this.find({}, callback).sort({ createdAt: -1 });
	},
	addContent: function (data, callback) {
		var query = { type: data.type };
		this.findOneAndUpdate(query, data, { upsert: true, new: true }, callback);
	},
	getContentData: function (data, callback) {
		return this.findOne({ type: data.type }, callback);
	},
	getAboutUsText: function () {
		return this.findOne();
	},
	getPrivacyText: function () {
		return this.findOne({ type: "PRIVACY_POLICY" });
	},
	getPrivacyPolicy: function (data) {

		return this.findOne({ type: data.type, status: 'active' }).select(data.attributes);
	},
	getRefundText: function () {
		return this.findOne({ type: "REFUND_POLICY" });
	},
	//get contact us
	getContactUsText: function () {
		return this.findOne({ type: "Contact_Us" });
	},
	//get term and condition for app
	getTermAndCondition: function (data) {
		return this.findOne({ type: data.type, status: 'active' }).select(data.attributes);
	},
	//get Payment And Refund Policies for app
	getPaymentAndRefundPolicies: function (data) {
		return this.findOne({ type: data.type, status: 'active' }).select(data.attributes);
	},
	getContentById: function (id, callback) {
		this.findById(id, callback);
	},
	updateContent: function (data, callback) {
		var query = { _id: data.contentId };
		data.updatedAt = new Date();
		this.findOneAndUpdate(query, data, { upsert: true }, callback);
	},
	removeContent: function (id, callback) {
		var query = { _id: id };
		this.remove(query, callback);
	},
	updateStatus: function (query, status, callback) {

		this.findOneAndUpdate(query, status, callback);
	}
}

module.exports = mongoose.model('ContentPages', contentSchema);