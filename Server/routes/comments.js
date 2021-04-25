const router = require('express').Router();
const commentController = require('../app/controllers/CommentController');

const authMiddleWare = require('../app/middleware/auth');

router.get('/', commentController.getAll);

router.get('/id/:_id', commentController.getById);

router.post('/create', commentController.create);

router.get('/reviews/:_id', commentController.getCommentsByReviewId);

router.use(authMiddleWare);

router.put('/update/:_id', commentController.update);

router.delete('/delete/:_id', commentController.detele);

module.exports = router;
