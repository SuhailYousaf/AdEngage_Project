const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
    title: String,
    description: String,
    price: String,
    name: String,
    Creator: String,
    tags: [String],
    imageFile: [String], // Store multiple image file paths in an array of strings
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const imageModel = mongoose.model('image', imageSchema);

module.exports = imageModel;
