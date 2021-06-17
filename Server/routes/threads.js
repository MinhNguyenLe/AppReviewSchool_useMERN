const router = require('express').Router();
const threadController = require('../app/controllers/ThreadController');
const authMiddleWare = require('../app/middleware/auth');
const multer = require('multer');

router.use(multer().none());

router.get('/', threadController.getAll);

router.get('/:id', threadController.getById);

router.get('/:id/posts', threadController.getAllPostsByIdThread);

//router.get('/:id/comments', threadController.getCommentsByIdReview);
//router.use(authMiddleWare);

router.post('/', threadController.create);

// router.post('/auth', threadController.createAuth);

// router.put('/:id', threadController.update);

// router.patch('/:id/upvote', reviewController.upvote);

// router.patch('/:id/downvote', reviewController.downvote);

// router.delete('/:id', reviewController.delete);

module.exports = router;
