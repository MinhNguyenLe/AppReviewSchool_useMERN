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
            console.log(logoPath);

            const newSchool = new School({
                code: code,
                name: name,
                location: location,
                website: website,
                typeOfSchool: typeOfSchool,
                level: level,
                typeOfMajor: typeOfMajor,
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
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'a');
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'e');
    str = str.replace(/??|??|???|???|??/g, 'i');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'o');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'u');
    str = str.replace(/???|??|???|???|???/g, 'y');
    str = str.replace(/??/g, 'd');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'A');
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'E');
    str = str.replace(/??|??|???|???|??/g, 'I');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'O');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'U');
    str = str.replace(/???|??|???|???|???/g, 'Y');
    str = str.replace(/??/g, 'D');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // M???t v??i b??? encode coi c??c d???u m??, d???u ch??? nh?? m???t k?? t??? ri??ng bi???t n??n th??m hai d??ng n??y
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ?? ?? ?? ?? ??  huy???n, s???c, ng??, h???i, n???ng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ?? ?? ??  ??, ??, ??, ??, ??
    // Remove extra spaces
    // B??? c??c kho???ng tr???ng li???n nhau
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    // Remove punctuations
    // B??? d???u c??u, k?? t??? ?????c bi???t
    str = str.replace(
        /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        ' '
    );
    return str;
}

module.exports = schoolController;
