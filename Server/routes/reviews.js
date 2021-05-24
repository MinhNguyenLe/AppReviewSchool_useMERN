const router = require('express').Router();
const reviewController = require('../app/controllers/ReviewController');
const authMiddleWare = require('../app/middleware/auth');
const multer = require('multer');

router.use(multer().none());

router.get('/', reviewController.getAll);

router.get('/:id', reviewController.getById);

router.get('/:id/comments', reviewController.getCommentsByIdReview);

router.post('/anonymous', reviewController.createAnonymous);

// router.use(authMiddleWare);

router.post('/auth', reviewController.createAuth);

router.put('/:id', reviewController.update);

router.patch('/:id/upvote', reviewController.upvote);

router.patch('/:id/downvote', reviewController.downvote);

router.delete('/:id', reviewController.delete);

module.exports = router;
