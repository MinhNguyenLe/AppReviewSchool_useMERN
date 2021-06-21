const School = require('../models/School');
const Review = require('../models/Review');
const path = require('path');
const { json } = require('express');

const schoolController = {
    getAll(req, res) {
        School.find({})
            .then((schools) => {
                return res.json(schools);
            })
            .catch((err) => {
                return res.status(500).json({ msg: err.message });
            });
    },
    searchByName(req, res) {
        let q = req.query.q;
        q = removeVietnameseTones(q);
        School.find({})
            .then((schools) => {
                schools = schools.filter((item) => {
                    return removeVietnameseTones(item.name).includes(q);
                });
                return res.json(schools);
            })
            .catch((err) => {
                return res.status(500).json({ msg: err.message });
            });
    },
    getById(req, res) {
        const id = req.params.id;
        School.findById(id)
            .then((school) => {
                return res.json(school);
            })
            .catch((err) => {
                return res.status(500).json({ msg: err.message });
            });
    },
    getReviewsByIdSchool(req, res) {
        const id = req.params.id;
        Review.find({ idSchool: id })
            .then((reviews) => {
                return res.json(reviews);
            })
            .catch((err) => {
                return res.status(500).json({ msg: err.message });
            });
    },
    create: async (req, res) => {
        try {
            const {
                code,
                name,
                location,
                website,
                typeOfSchool,
                level,
                typeOfMajor,
                description,
            } = req.body; // FrontEnd submit object to BackEnd
            let school = await School.findOne({ code });

            if (school)
                return res.status(400).json({ msg: 'This school is exist' });

            const logoPath = req.files['logo'][0].path;
            const galleryPaths = req.files['gallery'].map((item) => {
                return item.path;
            });

            const newSchool = new School({
                code: code,
                name: name,
                location: location,
                website: website,
                typeOfSchool: typeOfSchool,
                level: level,
                typeOfMajor: JSON.parse(typeOfMajor),
                description: description,
                logo: logoPath,
                images: galleryPaths,
            });
            await newSchool.save();

            return res.json({ newSchool });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    countReviewsByIdSchool: async (req, res)  => {
        try {
            const id = req.params.id;
            let reviews = await  Review.find({ idSchool: id });
            if (reviews === null || reviews.length === 0 || reviews === undefined) {
                return res.status(200).json({ msg: 0 });
            }
            return res.json({msg: reviews.length})
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }  
    }
};

function removeVietnameseTones(str) {
    str.trim();
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
        /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        ' '
    );
    return str;
}

module.exports = schoolController;
