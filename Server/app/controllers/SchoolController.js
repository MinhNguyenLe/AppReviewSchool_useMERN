const School = require('../models/School');
const path = require('path');
const { json } = require('express');

const schoolController = {
    getAll(req, res) {
        School.find({})
            .then((schools) => {
                schools = schools.map(function (school) {
                    school.logo =
                        req.protocol +
                        '://' +
                        req.get('host') +
                        '/images/schools/' +
                        school.logo;
                    return school;
                });

                return res.json(schools);
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
            console.log(req.body);
            let school = await School.findOne({ code });

            if (school)
                return res.status(400).json({ msg: 'This school is exist' });

            const newSchool = new School({
                code: code,
                name: name,
                location: location,
                website: website,
                typeOfSchool: typeOfSchool,
                level: level,
                typeOfMajor: typeOfMajor,
                description: description,
            });
            await newSchool.save();

            return res.json({ newSchool });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = schoolController;
