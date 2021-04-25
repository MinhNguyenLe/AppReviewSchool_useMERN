const Review = require('../models/Review');
const User = require('../models/User');

const reviewCtrl = {
    getAll: async (req, res) => {
        try {
            let reviews = await Review.find({});

            return res.json(reviews);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    getById: async (req, res) => {
        try {
            let id = req.params;
            const review = await Review.findById(id);

            if (review === null) {
                return res.status(404).json({ msg: "Can't find review" });
            }
            return res.json(review);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    createAuth: async (req, res) => {
        try {
            const { idSchool, name, ratePoint, positive, negative } = req.body;

            const newReview = new Review({
                idSchool: idSchool,
                idUser: req.user.id,
                name: name,
                ratePoint: ratePoint,
                positive: positive,
                negative: negative,
            });
            await newReview.save();

            res.status(201).json({ review: newReview });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    createAnonymous: async (req, res) => {
        try {
            const { idSchool, name, ratePoint, positive, negative } = req.body;
            const newReview = new Review({
                idSchool: idSchool,
                name: name,
                ratePoint: ratePoint,
                positive: positive,
                negative: negative,
            });
            await newReview.save();

            res.status(201).json({ review: newReview });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    update: async (req, res) => {
        try {
            let id = req.params;
            console.log(id);
            const { idSchool, idUser, name, positive, negative } = req.body;
            const review = await Review.findById(id);
            console.log(review);
            if (review === null) {
                return res.status(404).json({ msg: "Can't find review" });
            }
            review.name = name;
            review.positive = positive;
            review.negative = negative;
            await review.save();
            return res.status(200).json({ msg: 'Updated review' });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    detele: async (req, res) => {
        try {
            let id = req.params;
            const review = await Review.findById(id);

            if (review === null) {
                return res.status(404).json({ msg: "Can't find review" });
            }
            await Review.deleteOne(id);
            return res.json({ msg: 'Deleted review' });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    upvote: async (req, res) => {
        try {
            let id = req.params;
            let idUser = req.user.id;
            const review = await Review.findById(id);

            if (review === null) {
                return res.status(404).json({ msg: "Can't find review" });
            }
            let up = review.rateValue.up.idUser.includes(idUser);
            let down = review.rateValue.down.idUser.includes(idUser);

            if (up) {
                review.rateValue.up.count -= 1;
                let index = review.rateValue.up.idUser.indexOf(idUser);
                review.rateValue.up.idUser.splice(index, 1);
            } else if (down) {
                review.rateValue.down.count -= 1;
                let index = review.rateValue.down.idUser.indexOf(idUser);
                review.rateValue.down.idUser.splice(index, 1);
                review.rateValue.up.count += 1;
                review.rateValue.up.idUser.push(idUser);
            } else if (!up && !down) {
                review.rateValue.up.count += 1;
                review.rateValue.up.idUser.push(idUser);
            }

            await review.save();
            return res.json({ review });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    downvote: async (req, res) => {
        try {
            let id = req.params;
            let idUser = req.user.id;
            const review = await Review.findById(id);

            if (review === null) {
                return res.status(404).json({ msg: "Can't find review" });
            }

            let up = review.rateValue.up.idUser.includes(idUser);
            let down = review.rateValue.down.idUser.includes(idUser);

            if (down) {
                review.rateValue.down.count -= 1;
                let index = review.rateValue.down.idUser.indexOf(idUser);
                review.rateValue.down.idUser.splice(index, 1);
            } else if (up) {
                review.rateValue.up.count -= 1;
                let index = review.rateValue.up.idUser.indexOf(idUser);
                review.rateValue.up.idUser.splice(index, 1);
                review.rateValue.down.count += 1;
                review.rateValue.down.idUser.push(idUser);
            } else if (!up && !down) {
                review.rateValue.down.count += 1;
                review.rateValue.down.idUser.push(idUser);
            }

            await review.save();
            return res.json({ review });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    getByIdSchool: async (req, res) => {
        try {
            let id = req.params;
            const reviews = await Review.find({idSchool : id});
            if(reviews === null || reviews === undefined || reviews.length === 0){
               return res.status(404).json({msg: "Can't find reviews"});
            } 
            return res.json(reviews); 
           
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = reviewCtrl;
