const router = require('express').Router();
const reviewController = require('../app/controllers/ReviewController');
const authMiddleWare = require('../app/middleware/auth');

router.get('/', reviewController.getAll);

router.get('/id/:_id', reviewController.getById);

router.post('/anonymous', reviewController.createAnonymous);

router.use(authMiddleWare);

router.post('/auth', reviewController.createAuth);

router.put('/update/:_id', reviewController.update);

router.put('/upvote/:_id', reviewController.upvote);

router.put('/downvote/:_id', reviewController.downvote);

router.delete('/delete/:_id', reviewController.detele);

module.exports = router;
