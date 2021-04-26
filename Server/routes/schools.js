const router = require('express').Router();
const schoolController = require('../app/controllers/SchoolController');

router.post('/', schoolController.create);
router.get('/', schoolController.getAll);

module.exports = router;
