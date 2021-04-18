const router = require('express').Router();
const userController = require('../app/controllers/UserController');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/logout', userController.logout);

router.get('/refresh_token', userController.refreshToken);

router.get('/username/:username', userController.getByUsername);

router.get('/email/:email', userController.getByEmail);

router.get('/id/:id', userController.getById);

router.get('/permission/:permission', userController.getByPermission);

router.get('/', userController.getAll);

module.exports = router;
