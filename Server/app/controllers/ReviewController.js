const Review = require('../models/Review');


const reviewCtrl = {
    getAll:  async (req, res) => {
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

            if(review === null){
               return res.status(404).json({msg: "Can't find review"});
            } 
            return res.json(review); 
           
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    create: async (req, res) => {
        try {
            const {
                idSchool,
                idUser,
                name,
                positive,
                negative
            } = req.body;

            const newReview = new Review({
                idSchool: idSchool,
                idUser: idUser,
                name: name,
                positive: positive,
                negative: negative
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
            console.log(id)
            const {
                idSchool,
                idUser,
                name,
                positive,
                negative
            } = req.body;
            const review = await Review.findById(id);
            console.log(review)
            if(review === null){
               return res.status(404).json({msg: "Can't find review"});
            }
            review.name = name;
            review.positive = positive;
            review.negative = negative;
            await review.save();
            return res.status(200).json({msg: "Updated review"}); 
           
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    detele: async (req, res) => {
        try {

            let id = req.params;
            const review = await Review.findById(id);

            if(review === null){
               return res.status(404).json({msg: "Can't find review"});
            } 
            await Review.deleteOne(id);
            return res.json({msg: "Deleted review"}); 
           
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    upvote: async (req, res) => {
        try {
            let id = req.params;

            const review = await Review.findById(id);

            if(review === null){
               return res.status(404).json({msg: "Can't find review"});
            } 
            ++review.rateValue.up.count;
            await review.save();
            return res.json({msg: "Updated upvote in rateValue."}); 
           
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    downvote: async (req, res) => {
        try {
            let id = req.params;

            const review = await Review.findById(id);

            if(review === null){
               return res.status(404).json({msg: "Can't find review"});
            } 
            ++review.rateValue.down.count;
            await review.save();
            return res.json({msg: "Updated downvote in rateValue."}); 
           
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
};


module.exports = reviewCtrl;
