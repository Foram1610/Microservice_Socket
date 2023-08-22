var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LanguageSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    languageName: { type: String, trim: true },
    languageNativeName: { type: String },
    localeCode: { type: String, trim: true },
    languageCode: { type: String, unique: true, trim: true, lowercase: true },
    flagUrl: { type: String, default: "none" },
    countryCode: { type: String },
    countryName: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    createdAt: { type: Date },
    updatedAt: { type: Date }
});


// Methods
LanguageSchema.methods = {};

//static methods
LanguageSchema.statics = {
    getAllLanguages: function (callback) {
        this.find({}, callback);
    },
    getAllLanguageCode: function (callback) {
        return this.find({}, callback).select('languageName localeCode languageCode countryCode');
    },
    getAllActiveLanguageCode: function (callback) {
        return this.find({ status: "active" }, callback).select('languageName localeCode languageCode countryCode');
    },
    getEnabledLanguages: function (callback) {
        this.find({ status: "active" }, callback).sort({ createdAt: 1 });
    },
    getLanguageByLocaleCode: function (localeCode) {
        return this.findOne({ localeCode: localeCode }).exec();
    },
    getLanguageByLanguageCode: function (languageCode) {
        return this.findOne({ languageCode: languageCode });
    },
    addLanguage: function (data, callback) {
        let newLanguage = this(data);
        newLanguage.save(callback);
    },
    editLanguage: function (data, callback) {
        this.findOneAndUpdate({ _id: data.languageId }, data, { upsert: true }, callback);
    },
    getLanguageById: function (id, callback) {
        this.findById(id, callback);
    },
    getLanguageByIdAsync: function (id, callback) {
        return this.findById(id, callback);
    },
    updateLanguage: function (data, callback) {
        var query = { _id: data.languageId };
        this.findOneAndUpdate(query, data, { new: true }, callback);
    },
    removeLanguage: function (id, callback) {
        var query = { _id: id };
        this.remove(query, callback);
    },
    findLanguage: function (data) {
        return this.findOne(data)
    }
};

module.exports = mongoose.model('Languages', LanguageSchema);