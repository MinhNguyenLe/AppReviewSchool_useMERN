const router = require('express').Router();
const userController = require('../app/controllers/UserController');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

router.post('/register', upload.single('avatar'), userController.register);

router.use(multer().none());

router.post('/login', userController.login);

router.get('/logout', userController.logout);

router.get('/refresh_token', userController.refreshToken);

router.get('/username/:username', userController.getByUsername);

router.get('/email/:email', userController.getByEmail);

router.get('/permission/:permission', userController.getByPermission);

router.get('/:id', userController.getById);

router.get('/', userController.getAll);

module.exports = router;
