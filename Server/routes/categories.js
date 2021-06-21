const router = require('express').Router();
const categoryController = require('../app/controllers/CategoryController');
const authMiddleWare = require('../app/middleware/auth');
const multer = require('multer');

router.use(multer().none());

router.get('/', categoryController.getAll);

router.get('/:id', categoryController.getById);


//router.get('/:id/comments', postController.getCommentsByIdReview);
//router.use(authMiddleWare);

router.post('/', categoryController.create);
router.delete('/:id', categoryController.delete);

// router.post('/auth', threadController.createAuth);

router.put('/:id', categoryController.update);

// router.patch('/:id/upvote', reviewController.upvote);

// router.patch('/:id/downvote', reviewController.downvote);

// router.delete('/:id', reviewController.delete);

module.exports = router;
