const router = require('express').Router();
const userController = require('../app/controllers/UserController');
const multer = require('multer');
const fileUploader = require('../app/middleware/uploadMiddleware');
const auth = require('../app/middleware/auth');

router.post(
    '/register',
    fileUploader.single('avatar'),
    userController.register
);

router.use(multer().none());

router.post('/login', userController.login);

router.get('/logout', userController.logout);

router.get('/refresh_token', userController.refreshToken);

router.get('/me', auth, userController.getMe);

router.get('/username/:username', userController.getByUsername);

router.get('/email/:email', userController.getByEmail);

router.get('/permission/:permission', userController.getByPermission);

router.get('/:id', userController.getById);

router.get('/', userController.getAll);

module.exports = router;
