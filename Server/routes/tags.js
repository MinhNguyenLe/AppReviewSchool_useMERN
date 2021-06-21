const router = require('express').Router();
const tagController = require('../app/controllers/TagController');
const authMiddleWare = require('../app/middleware/auth');
const multer = require('multer');

router.use(multer().none());

router.get('/', tagController.getAll);

router.get('/:id', tagController.getById);

//router.get('/:id/comments', postController.getCommentsByIdReview);
//router.use(authMiddleWare);

router.post('/', tagController.create);
router.delete('/:id', tagController.delete);

// router.post('/auth', threadController.createAuth);

router.put('/:id', tagController.update);

// router.patch('/:id/upvote', reviewController.upvote);

// router.patch('/:id/downvote', reviewController.downvote);

// router.delete('/:id', reviewController.delete);

module.exports = router;
