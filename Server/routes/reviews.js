const router = require('express').Router();
const reviewController = require('../app/controllers/ReviewController');


router.get('/', reviewController.getAll);

router.get('/id/:_id', reviewController.getById);

router.post('/create', reviewController.create);

router.put('/update/:_id', reviewController.update);

router.delete('/delete/:_id', reviewController.detele);

router.post('/upvote/:_id', reviewController.upvote);

router.post('/downvote/:_id', reviewController.downvote);
module.exports = router;
