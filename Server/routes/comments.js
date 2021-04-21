const router = require('express').Router();
const commentController = require('../app/controllers/CommentController');

router.get('/', commentController.getAll);

router.get('/id/:_id', commentController.getById);

router.post('/create', commentController.create);

router.put('/update/:_id', commentController.update);

router.delete('/delete/:_id', commentController.detele);

module.exports = router;
