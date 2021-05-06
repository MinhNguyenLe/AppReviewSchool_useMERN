const router = require('express').Router();
const schoolController = require('../app/controllers/SchoolController');
const multer = require('multer');
const fileUploader = require('../app/middleware/uploadMiddleware');

router.post(
    '/',
    fileUploader.fields([
        { name: 'logo', maxCount: 1 },
        { name: 'gallery', maxCount: 10 },
    ]),
    schoolController.create
);

router.use(multer().none());
router.get('/names', schoolController.getListName);
router.get('/:id', schoolController.getById);
router.get('/:id/reviews', schoolController.getReviewsByIdSchool);
router.get('/', schoolController.getAll);

module.exports = router;
