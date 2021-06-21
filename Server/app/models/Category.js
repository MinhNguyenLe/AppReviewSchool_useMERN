const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Category = new Schema(
    {
        category: {
            type: String,
            required: true
        },
        color:{
            type:String,
            require: true
        },
        isDeleted : {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true, collection: 'categories' }
);

module.exports = mongoose.model('Category', Category);
