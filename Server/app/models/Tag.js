const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Tag = new Schema(
    {
        tagName: {
            type: String,
            required: true
        },
        inThread:{
            type: [Schema.Types.ObjectId],
            ref: "Thread"
        },
        isDeleted : {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true, collection: 'tags' }
);

module.exports = mongoose.model('Tag', Tag);
