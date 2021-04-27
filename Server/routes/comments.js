const router = require('express').Router();
const commentController = require('../app/controllers/CommentController');
const authMiddleWare = require('../app/middleware/auth');

const multer = require('multer');

router.use(multer().none());

router.get('/', commentController.getAll);

router.get('/:_id', commentController.getById);

router.post('/', commentController.create);

router.get('/reviews/:_id', commentController.getCommentsByReviewId);

router.use(authMiddleWare);

router.put('/:_id', commentController.update);

router.delete('/:_id', commentController.detele);

module.exports = router;
