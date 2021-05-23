const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Review = new Schema(
    {
        idSchool: {
            type: String,
            required: true,
        },
        idUser: {
            type: String,
        },
        name: {
            type: String,
            default: 'Anonymous',
        },
        ratePoint: {
            type: Number,
            required: true,
        },
        positive: {
            type: String,
        },
        negative: {
            type: String,
        },
        advice: {
            type: String,
        },
        rateValue: {
            up: {
                count: { type: Number, default: 0 },
                idUser: [String],
            },
            down: {
                count: { type: Number, default: 0 },
                idUser: [String],
            },
        },
    },
    { timestamps: true, collection: 'reviews' }
);

module.exports = mongoose.model('Review', Review);
