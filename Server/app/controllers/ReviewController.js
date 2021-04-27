const Review = require('../models/Review');
const Comment = require('../models/Comment');
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
            let id = req.params.id;
            const review = await Review.findById(id);

            if (review === null || review.length === 0 || review === undefined) {
                return res.status(404).json({ msg: "Can't find review" });
            }
            return res.json(review);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    getCommentsByIdReview: async (req, res) => {
        try {
            let id = req.params.id;
            const review = await Review.findById(id);

            if (review === null || review.length === 0 || review === undefined) {
                return res.status(404).json({ msg: "Can't find review" });
            }

            const comments = await Comment.find({ idReview: id });
            return res.json(comments);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    createAuth: async (req, res) => {
        try {
            const { idSchool, name, ratePoint, positive, negative, advice } = req.body;

            const newReview = new Review({
                idSchool: idSchool,
                idUser: req.user.id,
                name: name,
                ratePoint: ratePoint,
                positive: positive,
                negative: negative,
                advice: advice
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
            let id = req.params.id;
            console.log(id);
            const { idSchool, idUser, name, positive, negative, advice } = req.body;
            const review = await Review.findById(id);
            
            if (review === null || review.length === 0 || review === undefined) {
                return res.status(404).json({ msg: "Can't find review" });
            }
            review.name = name;
            review.positive = positive;
            review.negative = negative;
            review.advice = advice;
            await review.save();
            return res.status(200).json({ msg: 'Updated review' });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    delete: async (req, res) => {
        try {
            let id = req.params.id;
            const review = await Review.findById(id);

            if (review === null || review.length === 0 || review === undefined) {
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
            let id = req.params.id;
            let idUser = req.user.id;
            const review = await Review.findById(id);

            if (review === null || review.length === 0 || review === undefined) {
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
            let id = req.params.id;
            let idUser = req.user.id;
            const review = await Review.findById(id);

            if (review === null || review.length === 0 || review === undefined) {
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
};

module.exports = reviewCtrl;
