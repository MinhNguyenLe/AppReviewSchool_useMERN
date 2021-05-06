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
    getListName(req, res) {
        School.find({})
            .then((schools) => {
                return res.json(schools.map((item) => item.name));
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
};

module.exports = schoolController;
