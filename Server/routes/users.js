const router = require('express').Router();
const upload = require('../app/middleware/uploadMiddleware');
const userController = require('../app/controllers/UserController');

router.post('/register', upload.single('avatar'), userController.register);

router.post('/login', userController.login);

router.get('/logout', userController.logout);

router.get('/refresh_token', userController.refreshToken);

router.get('/username/:username', userController.getByUsername);

router.get('/email/:email', userController.getByEmail);

router.get('/permission/:permission', userController.getByPermission);

router.get('/:id', userController.getById);

router.get('/', userController.getAll);

module.exports = router;
