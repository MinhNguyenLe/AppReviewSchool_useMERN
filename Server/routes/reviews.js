<<<<<<< HEAD

=======
const router = require('express').Router();
const reviewController = require('../app/controllers/ReviewController');
const authMiddleWare = require('../app/middleware/auth');

router.get('/', reviewController.getAll);

router.get('/id/:_id', reviewController.getById);

router.post('/create', reviewController.create);

router.post('/upvote/:_id', reviewController.upvote);

router.post('/downvote/:_id', reviewController.downvote);

router.use(authMiddleWare);

router.put('/update/:_id', reviewController.update);

router.delete('/delete/:_id', reviewController.detele);

module.exports = router;
>>>>>>> 376f68855b8e666bcc8bfe134434d6b56ab32d87
