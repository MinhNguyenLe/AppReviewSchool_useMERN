const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const School = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
            default: 'logo.svg',
        },
        location: {
            type: String,
            required: true,
        },
        website: {
            type: String,
            trim: true,
        },
        typeOfSchool: {
            // 0. Khac | 1. Cong lap | 2. Dan lap | 3. Ban cong
            type: Number,
            required: true,
        },
        level: {
            // 0. Khac | 1. Dai hoc | 2. Cao dang | 3. Trung cap
            type: Number,
            required: true,
        },
        // 0. Khac | 1. Khoa hoc - Ky thuat | 2. Xa hoi - Nhan van | 3. Y duoc | 4. Kinh te - Quan ly | 5. Chinh tri - Quan su | 6. Su pham | 7. Nang khieu
        typeOfMajor: [Number],
        description: {
            type: String,
        },
        images: [String],
    },
    { timestamps: true, collection: 'schools' }
);

module.exports = mongoose.model('School', School);
