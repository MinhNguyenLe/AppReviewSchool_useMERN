const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Thread = new Schema(
    {
        byUser: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        title: {
            type: String,
            require: true,
        },
        tags: {
            type: [String],
        },
        category: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Category'
        },
        isOpen:{
            type: Boolean,
            default: true
        },
        posts: {
           type: [Schema.Types.ObjectId],
           ref: 'Post'
        },
        lastedPostBy: {
            type: String,
            required: true
        },
        lastedPostAt: {
            type:String,
            required: true
        },
        isDeleted : {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true, collection: 'threads' }
);

module.exports = mongoose.model('Thread', Thread);
