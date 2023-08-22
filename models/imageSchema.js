const mongoose = require('mongoose');
const Schema = mongoose.Schema
var imageSchema = Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    imageUrl: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date }
});

module.exports = mongoose.model('Image', imageSchema);
